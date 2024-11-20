from openai import OpenAI
import os
from getpass import getpass

# API 키를 환경 변수에 저장
<<<<<<< HEAD:backend/ai/open_ai.py
os.environ['OPENAI_API_KEY'] = "API키 입력"
=======
os.environ['OPENAI_API_KEY'] = ""
>>>>>>> 65c4bc6f8f2cdc108a2dec0340f18842625bcce1:backend/open_ai.py

def create_chat_completion(user_input):
    system_input = "넌 프로그래밍 전문 강사아. 프로그래밍에 관련된 질문에만 친절하고 간략하게 답변해줘"
    model="gpt-4o-mini"
    temperature=1.15
    max_tokens=500
    
    try:
        messages = [
            {"role": "system", "content": system_input},
            {"role": "user", "content": user_input}
        ]

        response = OpenAI().chat.completions.create(
            model=model,
            messages=messages,
            temperature=temperature,
            max_tokens=max_tokens
        )
        
        return response
    except Exception as e:
        return f"Error: {str(e)}"