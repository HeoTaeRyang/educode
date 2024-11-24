import React, { useState } from "react";
import "../styles/Quiz.css";

const Quiz: React.FC = () => {
  const [quiz, setQuiz] = useState<any>(null);
  const [language, setLanguage] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const fetchQuiz = async (language: string) => {
    try {
      const response = await fetch("http://localhost:5000/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language }),
      });
      const data = await response.json();
      if (response.ok) {
        setQuiz(data.quiz);
        setResult(null);
        setSelectedAnswer("");
      } else {
        alert(data.error || "퀴즈를 가져오는데 실패했습니다.");
      }
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  };

  const handleLanguageSelection = (language: string) => {
    setLanguage(language);
    fetchQuiz(language);
  };

  const handleSubmit = () => {
    if (selectedAnswer[0] === quiz.answer) {
      setResult("정답입니다!");
    } else {
      setResult("틀렸습니다. 다시 시도하세요.");
    }
  };

  if (!language) {
    // 언어 선택 화면
    return (
      <div className="quiz-container">
        <h2>Let’s play a Game!</h2>
        <div className="language-selection">
          <div
            className="language-card"
            onClick={() => handleLanguageSelection("java")}
          >
            Java
          </div>
          <div
            className="language-card"
            onClick={() => handleLanguageSelection("python")}
          >
            Python
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h2>{language.toUpperCase()} Quiz</h2>
      {quiz ? (
        <div className="quiz-box">
          <h3>{quiz.question}</h3>
          <ul>
            {quiz.choices.map((choice: string, index: number) => (
              <li key={index}>
                <label>
                  <input
                    type="radio"
                    name="answer"
                    value={choice}
                    checked={selectedAnswer === choice}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                  />
                  {choice}
                </label>
              </li>
            ))}
          </ul>
          <button onClick={handleSubmit}>Submit</button>
          {result && <p className="result">{result}</p>}
        </div>
      ) : (
        <p>Loading quiz...</p>
      )}
    </div>
  );
};

export default Quiz;
