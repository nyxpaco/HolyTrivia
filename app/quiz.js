"use client";

import React, { useState, useEffect, useCallback } from "react";
import QuizData from "./quiz-data.js"; 
import "./styles.css"; 

const Quiz = ({ selectedTopic, onGoBack }) => {
  const questions = QuizData[selectedTopic];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timer, setTimer] = useState(15);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setTimer(15);
  };

  const handleAnswerOptionClick = useCallback(
    (isCorrect, answerIndex) => {
      setSelectedAnswer(answerIndex);
      if (isCorrect) setScore((prevScore) => prevScore + 1);

      setTimeout(() => {
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
          setCurrentQuestion(nextQuestion);
          setTimer(15);
          setSelectedAnswer(null);
        } else {
          setShowScore(true);
        }
      }, 2000);
    },
    [currentQuestion, questions.length]
  );

  useEffect(() => {
    if (!quizStarted || showScore || selectedAnswer !== null) return;

    const timerId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(timerId);
          handleAnswerOptionClick(false, null);
          return 15;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [quizStarted, showScore, selectedAnswer, handleAnswerOptionClick]);

  const handleRetry = () => {
    setCurrentQuestion(0);
    setShowScore(false);
    setScore(0);
    setTimer(15);
    setSelectedAnswer(null);
  };

  const calculateTimerPercentage = () => {
    return (timer / 15) * 100;
  };

  return (
    <div className="app">
      {!quizStarted ? (
        <div className="start-section">
          <h1 className="welcome-text">Welcome to HolyTrivia!</h1>
          <p className="instructions">Lets see how well you know your Bible. Have fun!</p>
          <button className="start-button" onClick={handleStartQuiz}>
            Start Quiz
          </button>
        </div>
      ) : showScore ? (
        <div className="results-section">
          <h2 className="score-text">
            🎉 You scored {score} out of {questions.length}! 🎉
          </h2>
          <p>Keep the faith! Lets see if you can beat your last score!</p>
          <div className="results-buttons">
            <button className="reset-button" onClick={handleRetry}>
              Retry
            </button>
            <button className="back-button" onClick={onGoBack}>
              Go Back
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="timer-bar">
            <div
              className="timer-bar-fill"
              style={{ width: `${calculateTimerPercentage()}%` }}
            ></div>
          </div>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span> / {questions.length}
            </div>
            <div className="question-text">
              {questions[currentQuestion].questionText}
            </div>
          </div>
          <div className="answer-options">
            {questions[currentQuestion].answerOptions.map(
              (answerOption, index) => (
                <button
                  key={index}
                  className={`answer-button ${
                    selectedAnswer !== null &&
                    (answerOption.isCorrect
                      ? "correct"
                      : selectedAnswer === index
                      ? "wrong"
                      : "")
                  }`}
                  onClick={() =>
                    selectedAnswer === null &&
                    handleAnswerOptionClick(answerOption.isCorrect, index)
                  }
                  disabled={selectedAnswer !== null}
                >
                  {answerOption.answerText}
                  {selectedAnswer !== null &&
                    (answerOption.isCorrect
                      ? " ✔"
                      : selectedAnswer === index
                      ? " ✘"
                      : "")}
                </button>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;

