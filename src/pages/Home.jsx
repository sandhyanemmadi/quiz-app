import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import questionnaireData from "../api/questionnaires.json";

function Home() {
  const [questionnaires, setQuestionnaires] = useState([]);

  useEffect(() => {
    // Set the questionnaires state using the data from the JSON file
    setQuestionnaires(questionnaireData);
  }, []);
  console.log("Home Page Called");
  return (
    <div className="home-container">
      <h1>Questionnaires</h1>
      <ul className="questions-container">
        {questionnaires.map((questionnaire) => (
          <li key={questionnaire.id} className="question-container">
            <h2 data-testid={`title-${questionnaire.title}`}>
              {questionnaire.title}
            </h2>
            <p data-testid="questionnaire-number">
              No. of Questions:-
              {questionnaire.questions}
            </p>
            <Link
              to={`/questionnaire/${questionnaire.id}`}
              data-testid="attempt"
            >
              Attempt Quiz
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
