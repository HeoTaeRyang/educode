from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# 메시지 수신을 위한 라우트 설정
@app.route('/receive-message', methods=['POST'])
def receive_message():
    data = request.json  # JSON 형식으로 데이터 수신
    message = data.get('message')  # 'message' 키의 값 가져오기
    print(f"Received message: {message}")
    
    # 응답
    return jsonify({"status": "success", "message": f"Message received: {message}"}), 200

if __name__ == '__main__':
    app.run(debug=True)
