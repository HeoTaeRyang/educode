import openai
import os

openai_api_key = os.getenv('OPENAI_API_KEY')

def ask_chatgpt(question):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # 사용할 모델 지정 (예: gpt-4)
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": question}
        ]
    )

    answer = response['choices'][0]['message']['content']
    return answer

if __name__ == "__main__":
    user_question = input("질문을 입력하세요: ")
    answer = ask_chatgpt(user_question)
    print("ChatGPT의 답변:", answer)