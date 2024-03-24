import React from "react";
import he from "he";

import { nanoid } from "nanoid";
export default function Question(props) {
  const [selectedAnswer, setSelectedAnswer] = React.useState(null);

  const handleAnswerChange = (event) => {
    if (!props.showResult) setSelectedAnswer(event.target.value);
  };

  const handleLabelClick = (event) => {
    if (event.target.htmlFor && !props.showResult)
      props.handleOptionSelect(props.question.questionId, event.target.htmlFor);
  };

  const answerOptions = props.question.options.map((options) => {
    let className = `option ${options.isSelected ? "selected" : ""}`;

    if (props.showResult) {
      if (options.isSelected && options.isCorrect) {
        className += " correct";
      } else if (options.isSelected && !options.isCorrect) {
        className += " incorrect";
      }
      if (options.isCorrect) {
        className += " correct";
      }
    }

    return (
      <div key={nanoid()} id={props.question.questionId}>
        <label
          htmlFor={options.optionId}
          onClick={handleLabelClick}
          className={className}
        >
          <input
            type="radio"
            id={options.optionId}
            name={options.optionId}
            value={options.option}
            checked={selectedAnswer === options.option}
            onChange={handleAnswerChange}
          />
          {he.decode(options.option)}
        </label>
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
