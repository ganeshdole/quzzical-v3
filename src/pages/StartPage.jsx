import React from "react";

export default function StartPage(props) {
  return (
    <div className="start-page">
      <div>
        <h1>Quizzical</h1>
        <p>Some description if needed</p>
      </div>
      <button onClick={props.startQuiz}>Start Quiz</button>
    </div>
  );
}
