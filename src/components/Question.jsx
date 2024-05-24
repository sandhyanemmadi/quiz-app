import React from "react";
import "./Question.css";
const Question = (props) => {
  const {
    questionIndex,
    currentQuestion,
    selectedOption,
    handleOptionChange,
    handleOkClick,
    handleNextClick,
    isAnswered,
    isCorrect,
    nxtBtnDisabled,
    okBtnDisabled,
  } = props;
  return (
    <div className="question-container">
      <h3>{questionIndex + 1}</h3>
      <h3 data-testid="question" className="question-name">
        {currentQuestion?.Question}
      </h3>

      <form>
        <label>
          <input
            type="radio"
            value="1"
            checked={selectedOption === 1}
            onChange={handleOptionChange}
            data-testid="option-1"
          />
          <span>{currentQuestion?.Option1}</span>
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="2"
            checked={selectedOption === 2}
            onChange={handleOptionChange}
            data-testid="option-2"
          />
          <span>{currentQuestion?.Option2}</span>
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="3"
            checked={selectedOption === 3}
            onChange={handleOptionChange}
            data-testid="option-3"
          />
          <span>{currentQuestion?.Option3}</span>
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="4"
            checked={selectedOption === 4}
            onChange={handleOptionChange}
            data-testid="option-4"
          />
          <span>{currentQuestion?.Option4}</span>
        </label>
      </form>
      <div className="button-container">
        <button
          onClick={handleOkClick}
          data-testid="ok"
          disabled={okBtnDisabled}
        >
          Ok
        </button>
        <button
          onClick={handleNextClick}
          data-testid="next"
          disabled={nxtBtnDisabled}
        >
          Next
        </button>
      </div>

      {isAnswered && (
        <p
          data-testid="validate-answer"
          style={{ color: isCorrect ? "green" : "red" }}
        >
          {isCorrect
            ? "Your Answer is correct"
            : `Your Answer is wrong. Correct answer is ${currentQuestion?.Answer}`}
        </p>
      )}
    </div>
  );
};

export default Question;
