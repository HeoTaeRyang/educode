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

app = Flask(__name__)
CORS(app)  # 모든 도메인에서 오는 요청을 허용

#ai질문게시판 작성
@app.route('/aiask', methods=['POST'])
def get_answer():
    try:
        data = request.get_json()
        title = data.get('title', '')
        content = data.get('content', '')
        id = data.get('id', '')
        res = ''
        if(user.check_point(id,100)):
            now = dt.now()
            datetime = now.strftime("%Y-%m-%d %H:%M:%S")
            answer = open_ai.create_chat_completion(content).choices[0].message.content
            ai_post.add_post(title, id, datetime, content, answer)
            user.sub_point(id,100)
            res = "질문 작성이 완료되었습니다."
        else:
            res = "포인트가 부족합니다."
        
        response = {
            'answer': res,
        }
        
        # 결과를 JSON 형식으로 반환
        return jsonify(response)
    except Exception as e:
        # 예외 처리: 에러 메시지를 클라이언트에 반환
        return jsonify({'error': str(e)}), 500

#ai질문게시판 페이지별 조회
@app.route('/aiaskPostPages', methods=['POST'])
def get_aiPostPages():
    try:
        data = request.get_json()
        number = data.get('pageNumber', '')
        sortMethod = data.get('sortMethod', '')
        
        totalPages = ai_post.get_max_page()
        pages = []
        if sortMethod == 0:
            tmp1 = ai_post.get_page_post_date(number)
            print("최신순")
        else:
            tmp1 = ai_post.get_page_post_views(number)
            print("조회순")
        
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
    now = dt.now()
    date = now.strftime("%Y-%m-%d")
    
    # 아이디 중복 확인
    check_id = user.get_user(userid)
    if check_id:
        return jsonify({'error': '이미 존재하는 아이디입니다.'}), 400
    
    # 비밀번호 해시 처리
    hashed_password = generate_password_hash(password)
    
    # 사용자 추가
    user.add_user(userid, hashed_password, username, date)
    
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
    
    db_password= ckeck_id[0][1]
    
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
    
    print(f"Successfully fetched quiz for language '{language}': {db_quiz}") # 테스트
    
    return jsonify({'quiz': db_quiz}), 200

#출석 기능
@app.route('/attendence', methods=['POST'])
def attendence():
    try:
        data = request.get_json()
        id = data.get('id', '')
        
        now = dt.now()
        date = now.strftime("%Y-%m-%d")

        if(user.get_last_login(id) != date):
            user.set_last_login(id,date)
            user.add_point(id,100)
            res = "출석! 100포인트 지급."
        else:
            res = "이미 출석했습니다"
        
        response = {
            'answer': res,
        }
        
        # 결과를 JSON 형식으로 반환
        return jsonify(response)
    except Exception as e:
        # 예외 처리: 에러 메시지를 클라이언트에 반환
        return jsonify({'error': str(e)}), 500

    
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
