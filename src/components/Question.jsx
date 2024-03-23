import React from "react";
import he from "he";

import { nanoid } from "nanoid";
export default function Question(props) {
  const [selectedAnswer, setSelectedAnswer] = React.useState(null);

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const answerOptions = props.question.options.map((options) => {
    return (
      <div key={nanoid()} id={props.question.questionId}>
        <input
          type="radio"
          id={options.optionId}
          name={options.optionId}
          value={options.option}
          checked={selectedAnswer === options.option}
          onChange={handleAnswerChange}
        />
        <label htmlFor={options.optionId}>{he.decode(options.option)}</label>
      </div>
    );
  });

  return (
    <div className="question-card">
      <p>{he.decode(props.question.question)}</p>
      <form>{answerOptions}</form>
    </div>
  );
}
