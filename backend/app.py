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
            comment_num = ai_post.get_comment_num_post(i[0])[0]
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
