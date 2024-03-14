import React, { useState } from "react";
import StartPage from "./pages/StartPage";
import Quiz from "./pages/Quiz";

function App() {
  const [isGameStarted, setIsGameStarted] = useState(true);
  const startQuiz = () => {
    setIsGameStarted((preValue) => !preValue);
  };

  return (
    <main>
      {isGameStarted ? <StartPage startQuiz={startQuiz} /> : <Quiz />}
    </main>
  );
}

export default App;
