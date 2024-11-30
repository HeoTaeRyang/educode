from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime as dt
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/..")

from backend.db import ai_post
from backend import open_ai
from backend.db import comment
from backend.db import user
from backend.db import recommend
from werkzeug.security import generate_password_hash, check_password_hash
from backend.db import quiz
from backend.db import post, offer_post

app = Flask(__name__)
CORS(app)  # 모든 도메인에서 오는 요청을 허용

@app.route('/aiask', methods=['POST'])
def get_answer():
    try:
        data = request.get_json()
        title = data.get('title', '')
        content = data.get('content', '')
        id = data.get('id', '')
        
        now = dt.now()
        datetime = now.strftime("%Y-%m-%d %H:%M:%S")
        answer = open_ai.create_chat_completion(content).choices[0].message.content
        
        ai_post.add_post(title, id, datetime, content, answer)
        
        response = {
            'title' : title,
            'answer': answer,
            'content': content,
        }
        
        # 결과를 JSON 형식으로 반환
        return jsonify(response)
    except Exception as e:
        # 예외 처리: 에러 메시지를 클라이언트에 반환
        return jsonify({'error': str(e)}), 500
    
@app.route('/aiaskPostPages', methods=['POST'])
def get_aiPostPages():
    try:
        data = request.get_json()
        number = data.get('pageNumber', '')
        
        totalPages = ai_post.get_max_page()
        pages = []
        
        tmp1 = ai_post.get_page_post(number)
        
        for i in tmp1:
            comment_num = comment.get_comment_num_post("AI_Post",i[0])
            tmp2 = {'id':i[0], 'title':i[1], 'user':i[2],'time':i[3],'views':i[4],'comments':comment_num}
            pages.append(tmp2)

        response = {
            'totalPages' : totalPages,
            'Pages' : pages
        }
        
        # 결과를 JSON 형식으로 반환
        return jsonify(response)        
    except Exception as e:
        # 예외 처리: 에러 메시지를 클라이언트에 반환
        return jsonify({'error': str(e)}), 500   
    
# 회원가입
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    userid = data.get('id')
    password = data.get('password')
    username = data.get('username')
    
    # 아이디 중복 확인
    check_id = user.get_user(userid)
    if check_id:
        return jsonify({'error': '이미 존재하는 아이디입니다.'}), 400
    
    # 비밀번호 해시 처리
    hashed_password = generate_password_hash(password)
    
    # 사용자 추가
    user.add_user(userid, hashed_password, username)
    
    return jsonify({'message': '회원가입 성공!'}), 200

# 로그인
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    userid = data.get("id")
    password = data.get("password")
    
    # 사용자 존재 여부 확인
    ckeck_id = user.get_user(userid)
    if not ckeck_id:
        return jsonify({'error': '아이디가 존재하지 않습니다.'}), 400
    
    db_userid, db_password, db_username, db_point = ckeck_id[0]
    
    if not check_password_hash(db_password, password):
        return jsonify({'error': '비밀번호가 잘못되었습니다.'}), 400
    
    return jsonify({'message': '로그인 성공!'}), 200
    
# 퀴즈
@app.route('/quiz', methods=['POST'])
def get_quiz():
    data = request.get_json()
    language = data.get("language")
    
    # 지원하지 않는 언어 일 경우
    if language not in ['java', 'python']:
        return jsonify({'error': 'Java 또는 Python 을 선택 하세요.'}), 400
    
    # 퀴즈를 db에서 가져옴
    db_quiz = quiz.get_random_quiz(language)
    
    # 해당 언어에 대한 퀴즈가 없는 경우
    if not db_quiz:
        return jsonify({'error': '해당 언어에 대한 퀴즈가 없습니다.'}), 400
    
    return jsonify({'quiz': db_quiz}), 200

# 포인트 랭킹
@app.route('/pointRanking', methods=['POST'])
def point_ranking():
    db_user = user.get_top_point_user()
    
    point_ranking = [
        {'rank': index+1, 'name': db_user[index][0], 'point': db_user[index][1]} for index in range(0,3) 
    ]
    
    return jsonify(point_ranking)

# ai 질문 랭킹
@app.route('/aiPostRanking', methods=['POST'])
def ai_post_ranking():
    db_ai_post = ai_post.get_top_ai_post()
    
    ai_post_ranking = [
        {'rank': index+1, 'name': db_ai_post[index][0]} for index in range(0,3)
    ]
    
    return jsonify(ai_post_ranking)

# 자유 게시판 랭킹
@app.route('/postRanking', methods=['POST'])
def post_ranking():
    db_post = post.get_top_post()
    
    post_ranking = [
        {'rank': index+1, 'name': db_post[index][0]} for index in range(0,3)
    ]
    
    return jsonify(post_ranking)

# 구인 게시판 랭킹
@app.route('/offerPostRanking', methods=['POST'])
def offer_post_ranking():
    db_offer_post = offer_post.get_top_offer_post()
    
    offer_post_ranking = [
        {'rank': index+1, 'name': db_offer_post[index][0]} for index in range(0,3)
    ]
    
    return jsonify(offer_post_ranking)

# 구인 게시판 최신글
@app.route('/offerPostRecent', methods=['POST'])
def offer_post_recent():
    db_offer_post = offer_post.get_recent_offer_post()
    
    offer_post_recent = [
        {'index': index+1, 'title': db_offer_post[index][0], 'name': db_offer_post[index][1], 'content': db_offer_post[index][2]} for index in range(0,3)
    ]
    
    return jsonify(offer_post_recent)

# 마이페이지
@app.route('/myPage', methods=['POST'])
def my_page():
    data = request.get_json()
    userid = data.get("id")
    
    db_user = user.get_user(userid)
    
    my_page = [
        {'id': db_user[0][0], 'name': db_user[0][2], 'point': db_user[0][3]}
    ]
    
    return jsonify(my_page)
    
if __name__ == '__main__':
    # 추천 기능 임시 테스트
    # print(recommend.get_recommend_num(2))
    # if(recommend.get_recommend('admin',2)):
    #     print("이미 추천하셨습니다")
    # else:
    #     recommend.add_recommend('admin',2)
    #     print("추천했습니다")
    # print(recommend.get_recommend_num(2))
    app.run(debug=True, host='0.0.0.0', port=5000)
