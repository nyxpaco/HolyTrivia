"use client";

import React, { useState } from "react";
import Quiz from "./quiz.js"; 
import "./styles.css";  

const App = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const handleTopicSelection = (topic) => {
    setSelectedTopic(topic);
  };

  const handleGoBack = () => {
    setSelectedTopic(null); 
  };

  return (
    <div>
      <header className="header">
        <h1>HolyTrivia</h1>
      </header>
      <div className="app">
        {!selectedTopic ? (
          <div className="start-section">
            <h2>Welcome to HolyTrivia!</h2>
            <p>Choose a topic to start the quiz:</p>
            <div className="topic-selection">
              <button onClick={() => handleTopicSelection("intro")} className="button">
                Introductory
              </button>
              <button onClick={() => handleTopicSelection("old")} className="button">
                Old Testament
              </button>
              <button onClick={() => handleTopicSelection("new")} className="button">
                New Testament
              </button>
            </div>
          </div>
        ) : (
          <Quiz selectedTopic={selectedTopic} onGoBack={handleGoBack} />
        )}
      </div>
    </div>
  );
};

export default App;


