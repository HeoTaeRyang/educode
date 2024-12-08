from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime as dt
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/..")

from backend.db import ai_post
from backend.db import post
from backend.db import offer_post
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
        else:
            tmp1 = ai_post.get_page_post_views(number)
        
        for i in tmp1:
            comment_num = comment.get_comment_num("AI_Post",i[0])
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
    
#ai질문게시판 게시글 조회
@app.route('/aiaskPostLook', methods=['POST'])
def get_aiPost():
    try:
        data = request.get_json()
        number = data.get('postNumber', '')
        
        ai_post.add_views_post(number)
        tmp_post = ai_post.get_content_post(number)
        tmp_comment = comment.get_comment("AI_Post", number)
        comments = []
        post = {'title':tmp_post[0], 'id':tmp_post[1], 'datetime':tmp_post[2], 'views':tmp_post[3], 'question':tmp_post[4], 'answer':tmp_post[5]}

        for i in tmp_comment:
            tmp = {'id':i[0], 'datetime':i[1], 'content':i[2]}
            comments.append(tmp)

        response = {
            'post' : post,
            'comments' : comments
        }
        
        # 결과를 JSON 형식으로 반환
        return jsonify(response)        
    except Exception as e:
        # 예외 처리: 에러 메시지를 클라이언트에 반환
        return jsonify({'error': str(e)}), 500   

#자유게시판 작성
@app.route('/post', methods=['POST'])
def add_post():
    try:
        data = request.get_json()
        title = data.get('title', '')
        content = data.get('content', '')
        id = data.get('id', '')
        now = dt.now()
        datetime = now.strftime("%Y-%m-%d %H:%M:%S")
        post.add_post(title,id,datetime,content)
        res = "글 작성이 완료되었습니다"
        
        response = {
            'answer': res,
        }
        
        # 결과를 JSON 형식으로 반환
        return jsonify(response)
    except Exception as e:
        # 예외 처리: 에러 메시지를 클라이언트에 반환
        return jsonify({'error': str(e)}), 500

#자유게시판 페이지별 조회
@app.route('/postPages', methods=['POST'])
def get_PostPages():
    try:
        data = request.get_json()
        number = data.get('pageNumber', '')
        sortMethod = data.get('sortMethod', '')
        
        totalPages = post.get_max_page()
        pages = []
        if sortMethod == 0:
            tmp1 = post.get_page_post_date(number)
        else:
            tmp1 = post.get_page_post_views(number)
        for i in tmp1:
            comment_num = comment.get_comment_num("Post",i[0])
            recommend_num = recommend.get_recommend_num(i[0])
            tmp2 = {'id':i[0], 'title':i[1], 'user':i[2],'time':i[3],'views':i[4],'comments':comment_num, 'recommends':recommend_num}
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
    
#자유게시판 게시글 조회
@app.route('/postLook', methods=['POST'])
def get_post():
    try:
        data = request.get_json()
        number = data.get('postNumber', '')
        
        post.add_views_post(number)
        tmp_post = post.get_content_post(number)
        tmp1 = comment.get_comment("Post", number)
        recommends = recommend.get_recommend_num(number)
        comments = []

        free_post = {'title':tmp_post[0], 'id':tmp_post[1], 'datetime':tmp_post[2], 'views':tmp_post[3],'recommends':recommends, 'content':tmp_post[4]}

        for i in tmp1:
            tmp2 = {'id':i[0], 'datetime':i[1], 'content':i[2]}
            comments.append(tmp2)

        response = {
            'post' : free_post,
            'comments' : comments,
        }
        
        # 결과를 JSON 형식으로 반환
        return jsonify(response)        
    except Exception as e:
        # 예외 처리: 에러 메시지를 클라이언트에 반환
        return jsonify({'error': str(e)}), 500 
    
#자유게시판 추천 기능
@app.route('/recommend', methods=['POST'])
def add_recommend():
    try:
        data = request.get_json()
        id = data.get('id','')
        number = data.get('postNumber', '')

        if(recommend.get_recommend(id,number)):
            res = "이미 추천했습니다."
        else:
            recommend.add_recommend(id,number)
            writer = post.get_id(number)
            user.add_point(writer,20)
            res = "추천했습니다"
        
        response = {
            'answer': res,
        }
        
        # 결과를 JSON 형식으로 반환
        return jsonify(response)
    except Exception as e:
        # 예외 처리: 에러 메시지를 클라이언트에 반환
        return jsonify({'error': str(e)}), 500

#구인구직게시판 작성
@app.route('/offerPost', methods=['POST'])
def add_offer_post():
    try:
        data = request.get_json()
        title = data.get('title', '')
        header = data.get('header', '')
        content = data.get('content', '')
        id = data.get('id', '')
        now = dt.now()
        datetime = now.strftime("%Y-%m-%d %H:%M:%S")
        offer_post.add_post(title,header,id,datetime,content)
        res = "글 작성이 완료되었습니다"
        
        response = {
            'answer': res,
        }
        
        # 결과를 JSON 형식으로 반환
        return jsonify(response)
    except Exception as e:
        # 예외 처리: 에러 메시지를 클라이언트에 반환
        return jsonify({'error': str(e)}), 500

#구인구직게시판 페이지별 조회
@app.route('/offerPostPages', methods=['POST'])
def get_offerPostPages():
    try:
        data = request.get_json()
        number = data.get('pageNumber', '')
        sortMethod = data.get('sortMethod', '')
        
        totalPages = offer_post.get_max_page()
        pages = []
        if sortMethod == 0:
            tmp1 = offer_post.get_page_post_date(number)
        else:
            tmp1 = offer_post.get_page_post_views(number)
        
        for i in tmp1:
            comment_num = comment.get_comment_num("Offer_Post",i[0])
            tmp2 = {'id':i[0], 'title':i[1], 'header':i[2], 'user':i[3],'time':i[4],'views':i[5],'comments':comment_num}
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
    
#구인구직게시판 게시글 조회
@app.route('/offerPostLook', methods=['POST'])
def get_offerPost():
    try:
        data = request.get_json()
        number = data.get('postNumber', '')
        
        offer_post.add_views_post(number)
        tmp_post = offer_post.get_content_post(number)
        tmp1 = comment.get_comment("Offer_Post", number)
        comments = []
        post = {'title':tmp_post[0], 'header':tmp_post[1], 'id':tmp_post[2], 'datetime':tmp_post[3], 'views':tmp_post[4], 'content':tmp_post[5]}

        for i in tmp1:
            tmp2 = {'id':i[0], 'datetime':i[1], 'content':i[2]}
            comments.append(tmp2)
        response = {
            'post' : post,
            'comments' : comments,
        }
        
        # 결과를 JSON 형식으로 반환
        return jsonify(response)        
    except Exception as e:
        # 예외 처리: 에러 메시지를 클라이언트에 반환
        return jsonify({'error': str(e)}), 500     
    
#댓글
@app.route('/comment', methods=['POST'])
def add_comment():
    try:
        data = request.get_json()
        post_type = data.get('postType','')
        number = data.get('postNumber','')
        content = data.get('content', '')
        id = data.get('id', '')
        now = dt.now()
        datetime = now.strftime("%Y-%m-%d %H:%M:%S")
        comment.add_comment(post_type,number,id,datetime,content)
        res = "댓글 작성이 완료되었습니다"
        
        response = {
            'answer': res,
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
    app.run(debug=True, host='0.0.0.0', port=5000)
