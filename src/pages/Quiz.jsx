import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Question from "../components/Question";
export default function Quiz() {
  const [quizData, setQuizData] = useState([]);
  const [countCorrectanswer, setCountCorrectanswer] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newGame, setNewGame] = useState(false);

  function shuffleOption(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function handleOptionSelect(questionId, optionId) {
    setQuizData((prevQuizData) => {
      return prevQuizData.map((question) => {
        if (question.questionId === questionId) {
          const updatedOptions = question.options.map((option) => {
            if (option.optionId === optionId) {
              if (option.isCorrect) {
                setCountCorrectanswer(
                  (prevCountCorrectanswer) => prevCountCorrectanswer + 1
                );
              }
              return {
                ...option,
                isSelected: true,
              };
            }
            return {
              ...option,
              isSelected: false,
            };
          });
          return {
            ...question,
            options: updatedOptions,
          };
        }
        return question;
      });
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setCountCorrectanswer(0);
      try {
        const data = await fetch(
          "https://opentdb.com/api.php?amount=5&type=multiple"
        );
        const questionsData = await data.json();
        setQuizData(() => {
          return questionsData.results.map((question) => {
            const options = question.incorrect_answers.map((option) => ({
              option: option,
              isCorrect: false,
              isSelected: false,
              optionId: nanoid(),
            }));
            options.push({
              option: question.correct_answer,
              isCorrect: true,
              isSelected: false,
              optionId: nanoid(),
            });
            return {
              questionId: nanoid(),
              question: question.question,
              options: shuffleOption(options),
            };
          });
        });
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [newGame]);

  const questionElement = quizData.map((question) => {
    return (
      <Question
        key={nanoid()}
        question={question}
        handleOptionSelect={handleOptionSelect}
        showResult={showResult}
      />
    );
  });

  return (
    <div>
      {!isLoading && questionElement}
      {isLoading && <h1>Loading...</h1>}
      {!isLoading && !showResult && (
        <div className="card-footer">
          <button onClick={() => setShowResult(true)}>check Answer</button>
        </div>
      )}
      {showResult && (
        <p className="score-card" style={{ margin: "5px" }}>
          You got {countCorrectanswer}/ {quizData.length} correct
        </p>
      )}
      {showResult && (
        <div className="card-footer">
          <button
            onClick={() =>
              setNewGame((preValue) => {
                setShowResult((preValue) => !preValue);
                return !preValue;
              })
            }
          >
            New Game
          </button>
        </div>
      )}
    </div>
  );
}
