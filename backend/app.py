from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS

app = Flask(__name__)
# CORS 설정: React 앱이 실행되는 포트 번호로 변경
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})  # Vite 기본 포트

# 임시 사용자 데이터베이스
users_db = {}

@app.route('/')
def home():
    return "서버가 정상적으로 실행 중입니다"

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    print(f"Received login data: {data}")  # 로그인 요청 데이터 출력
    
    user_id = request.json.get('id')
    password = request.json.get('password')

    # 사용자 존재 여부 확인
    user = users_db.get(user_id)
    if not user:
        return jsonify({'error': '아이디가 존재하지 않습니다.'}), 400

    # 비밀번호 확인
    if not check_password_hash(user['password'], password):
        return jsonify({'error': '비밀번호가 잘못되었습니다.'}), 400

    return jsonify({'message': '로그인 성공!'}), 200

@app.route('/register', methods=['POST'])
def register():
    user_id = request.json.get('id')
    username = request.json.get('username')
    email = request.json.get('email')
    password = request.json.get('password')

    print(f"Received data: user_id={user_id}, username={username}, email={email}, password={password}")

    # 사용자 중복 확인
    if user_id in users_db:
        return jsonify({'error': '이미 존재하는 아이디입니다.'}), 400

    # 비밀번호 해시 처리
    hashed_password = generate_password_hash(password)

    # 사용자 데이터 저장
    users_db[user_id] = {
        'username': username,
        'email': email,
        'password': hashed_password
    }

    return jsonify({'message': '회원가입 성공!'}), 200

if __name__ == '__main__':
    app.run(debug=True)
