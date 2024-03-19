import React, { useState } from "react";
import { nanoid } from "nanoid";
import Question from "../components/Question";

export default function Quiz() {
  const [quizData, setQuizData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowAnswer, SetIsShowAnswer] = useState(false);
  let tempData = [];
  function shuffleOption(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useState(async () => {
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
    setIsLoading(false);
  }, []);

  function showAnswers() {
    SetIsShowAnswer((preValue) => !preValue);
  }

  const questionElement = quizData.map((question) => {
    return (
      <Question
        key={nanoid()}
        question={question}
        isShowAnswer={isShowAnswer}
      />
    );
  });

  return (
    <div>
      {!isShowAnswer && questionElement}
      <button onClick={showAnswers}>Show Answer</button>
    </div>
  );
}
