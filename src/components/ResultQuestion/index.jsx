import React from "react";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";

ChartJS.register(...registerables);

function ResultQuestion({ dataVote }) {
  const { houseVoteActive, questions } = dataVote;
  const housevoting = Object.values(houseVoteActive).filter(
    (vote) => vote.votacion === true,
  );
  const currentQuestion = questions[Object.keys(questions).length];

  const data = {
    labels: ["SI", "NO"],
    datasets: [
      {
        data: [
          currentQuestion && currentQuestion.yes.length,
          currentQuestion && currentQuestion.not.length,
        ],
        backgroundColor: ["rgba(15, 0, 252, 1)", "rgba(255, 0, 0, 1)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="text-lg capitalize ">
      <p>Registrados para votar: {Object.values(houseVoteActive).length}</p>
      <p>por votar: {housevoting.length}</p>
      <p>{currentQuestion && currentQuestion.questionToAdd}</p>
      <Bar data={data} options={options} />
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
