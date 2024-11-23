2024-11-23
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime as dt
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/..")

from backend.db import ai_post
from backend import open_ai
from werkzeug.security import generate_password_hash, check_password_hash
from backend.db import user

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
            tmp2 = {'id':i[0], 'title':i[1], 'user':i[2],'time':i[3],'views':i[4]}
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
    
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
