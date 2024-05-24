// import { useState, useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import questionBank from "../api/questionBank.json";
// import Question from "../components/Question";
// import "./Quiz.css";
// const Quiz = () => {
//   const [questionIndex, setQuestionIndex] = useState(0);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [isAnswered, setIsAnswered] = useState(false);
//   const [isCorrect, setIsCorrect] = useState(false);
//   const [wrong, setWrong] = useState(0);
//   const [score, setScore] = useState(0);
//   const [isFinished, setIsFinished] = useState(false);
//   const [nxtBtnDisabled, setNxtBtnDisabled] = useState(true);

//   const { id } = useParams();

//   const currentQuestion = questionBank.find((qb) => qb.id === parseInt(id))
//     .questionbank[questionIndex];

//   const handleOptionChange = (event) => {
//     setSelectedOption(parseInt(event.target.value));
//   };

//   const handleOkClick = () => {
//     if (selectedOption !== null) {
//       setIsAnswered(true);
//       if (selectedOption === currentQuestion?.Answer) {
//         setIsCorrect(true);
//         setScore(score + 1);
//         setNxtBtnDisabled(false);
//       } else {
//         setIsCorrect(false);
//         setWrong(wrong + 1);
//         setNxtBtnDisabled(false);
//       }
//     }
//   };

//   const handleNextClick = () => {
//     if (isAnswered === false) {
//       setWrong(wrong + 1);
//     }
//     setQuestionIndex(questionIndex + 1);
//     setIsAnswered(false);
//     setIsCorrect(false);
//     setSelectedOption(null);
//     setNxtBtnDisabled(true);
//   };

//   useEffect(() => {
//     if (currentQuestion === undefined) {
//       setIsFinished(true);
//       return;
//     }
//     if (questionIndex >= currentQuestion.length - 1) {
//       setIsFinished(true);
//     }
//   }, [questionIndex, currentQuestion]);

//   const stateObj = {
//     questionIndex,
//     currentQuestion,
//     selectedOption,
//     handleOptionChange,
//     handleOkClick,
//     handleNextClick,
//     isAnswered,
//     isCorrect,
//     nxtBtnDisabled,
//   };
//   console.log("Quiz Page Called ");

//   return (
//     <div className="quiz-container">
//       {!isFinished ? (
//         <>
//           <Question {...stateObj} />
//         </>
//       ) : (
//         <div className="final-score-card">
//           <h2>Thanks For attempting the test</h2>
//           <h1 data-testid="score">Your Score is:- {score}</h1>
//           <p data-testid="correct-question">Total Correct:- {score}</p>
//           <p data-testid="incorrect-question">Total InCorrect:- {wrong}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Quiz;

import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import questionBank from "../api/questionBank.json";
import Question from "../components/Question";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import "./Quiz.css";

const Quiz = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [wrong, setWrong] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [nxtBtnDisabled, setNxtBtnDisabled] = useState(true);
  const [okBtnDisabled, setOkBtnDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);

  const { id } = useParams();
  const timerId = useRef(null);
  const currentQuestion = questionBank.find((qb) => qb.id === parseInt(id))
    .questionbank[questionIndex];

  const handleOptionChange = (event) => {
    setSelectedOption(parseInt(event.target.value));
    setOkBtnDisabled(false);
  };

  const handleOkClick = () => {
    if (selectedOption !== null) {
      setIsAnswered(true);
      clearInterval(timerId.current);
      if (selectedOption === currentQuestion?.Answer) {
        setIsCorrect(true);
        setScore(score + 1);
        setNxtBtnDisabled(false);
        setOkBtnDisabled(true);
      } else {
        setIsCorrect(false);
        setWrong(wrong + 1);
        setNxtBtnDisabled(false);
        setOkBtnDisabled(true);
      }
    }
  };

  const handleNextClick = () => {
    if (isAnswered === false) {
      setWrong(wrong + 1);
    }
    setQuestionIndex(questionIndex + 1);
    setIsAnswered(false);
    setIsCorrect(false);
    setSelectedOption(null);
    setNxtBtnDisabled(true);
    setTimeLeft(10);
    setOkBtnDisabled(false);
  };

  // let timerId;
  useEffect(() => {
    if (currentQuestion === undefined) {
      setIsFinished(true);
      return;
    }
    if (questionIndex >= currentQuestion.length - 1) {
      setIsFinished(true);
    }

    if (timeLeft === 0) {
      handleNextClick();
    }

    timerId.current = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    return () => {
      clearInterval(timerId.current);
    };
  }, [questionIndex, currentQuestion, timeLeft]);

  const stateObj = {
    questionIndex,
    currentQuestion,
    selectedOption,
    handleOptionChange,
    handleOkClick,
    handleNextClick,
    isAnswered,
    isCorrect,
    nxtBtnDisabled,
    timeLeft,
    okBtnDisabled,
  };
  // console.log("Quiz Page Called ");

  return (
    <div className="quiz-container">
      {!isFinished ? (
        <>
          <Question {...stateObj} />
          <div className="timer-container">
            <TimelapseIcon />
            <span className="timer"> {timeLeft}</span>
          </div>
        </>
      ) : (
        <div className="final-score-card">
          <h2>Thanks For attempting the test</h2>
          <h1 data-testid="score">Your Score is:- {score}</h1>
          <p data-testid="correct-question">Total Correct:- {score}</p>
          <p data-testid="incorrect-question">Total InCorrect:- {wrong}</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
