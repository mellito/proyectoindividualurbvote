import React from "react";
import PropTypes from "prop-types";

function ResultQuestion({ dataVote }) {
  const { houseVoteActive, questions } = dataVote;

  const housevoting = Object.values(houseVoteActive).filter(
    (vote) => vote.votacion === true,
  );
  const currentQuestion = questions[Object.keys(questions).length];
  return (
    <div className="text-xl ">
      <p className="uppercase  text-3xl font-bold">
        {currentQuestion && currentQuestion.questionToAdd}
      </p>
      <p className="uppercase ">Resultado</p>
      <p>Reguistrados para votar: {Object.values(houseVoteActive).length}</p>
      <p>por votar:{housevoting.length}</p>
      <p className="capitalize">
        a favor: <span>{currentQuestion && currentQuestion.yes.length}</span>
      </p>
      <p className="capitalize">
        encontra: <span> {currentQuestion && currentQuestion.not.length}</span>
      </p>
    </div>
  );
}

export default ResultQuestion;

ResultQuestion.propTypes = {
  dataVote: PropTypes.shape({
    houseVoteActive: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.object,
    ]),
    questions: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.object,
    ]),
  }).isRequired,
};
