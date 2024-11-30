from db.connect import con
import json

# quiz 랜덤 선택 함수
def get_random_quiz(language):
    cursor = con.cursor()
    cursor.execute(f"SELECT quizid, question, choices1, choices2, choices3, choices4, answer FROM quiz WHERE language = '{language}' ORDER BY RANDOM() LIMIT 1")
    result = cursor.fetchone()
    
    if result:
        quiz = {
            "quizid": result[0],
            "question": result[1],
            "choices": result[2:6],
            "answer": result[6],
        }
        return quiz
    
    else:
        return None