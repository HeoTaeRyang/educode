from flask import Flask, request, jsonify
from flask_cors import CORS
from ai import open_ai

app = Flask(__name__)
CORS(app)  # 모든 도메인에서 오는 요청을 허용

@app.route('/process', methods=['POST'])
def process_data():
    try:
        data = request.get_json()
        title = data.get('title', '')
        content = data.get('content', '')
        date = data.get('date', '')
        
        answer = open_ai.create_chat_completion(content).choices[0].message.content
        
        print(title,date)
        print(content)
        print(answer)
        
        response = {
            'answer': answer,
            'content': content,
            'time': date
        }
        
        # 결과를 JSON 형식으로 반환
        return jsonify(response)
    except Exception as e:
        # 예외 처리: 에러 메시지를 클라이언트에 반환
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
