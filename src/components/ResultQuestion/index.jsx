import React from "react";
import PropTypes from "prop-types";

function ResultQuestion({ dataVote }) {
  const { houseVoteActive, questions } = dataVote;
  return (
    <div>
      <p className="uppercase">Resultado</p>
      propietarios votando: {Object.keys(houseVoteActive).length}
      <p>
        a favor
        {questions[Object.keys(questions).length] &&
          questions[Object.keys(questions).length].yes.length}
      </p>
      <p>
        encontra
        {questions[Object.keys(questions).length] &&
          questions[Object.keys(questions).length].not.length}
      </p>
    </div>
  );
}

export default ResultQuestion;

ResultQuestion.propTypes = {
  dataVote: PropTypes.objectOf(PropTypes.string).isRequired,
};
