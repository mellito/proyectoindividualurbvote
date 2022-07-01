/* eslint-disable no-nested-ternary */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ResultQuestion from "../../components/ResultQuestion";
import { HOME_ROUTE } from "../../components/Constans/Routes";
import { realtimeCollectionVote, addVote } from "../../utils/fireStore";

function Vote() {
  const { code, house } = useParams();
  const [voteCollection, setVoteCollection] = useState();
  const navigate = useNavigate();

  const dataActive = async () => {
    await realtimeCollectionVote(setVoteCollection, code);
  };
  useEffect(() => {
    dataActive();
  }, []);
  return (
    <div className="grid place-content-center h-screen w-full text-center">
      {voteCollection && voteCollection.state ? (
        Object.keys(voteCollection.questions).length > 0 ? (
          <div>
            {voteCollection.questions[
              Object.keys(voteCollection.questions).length
            ].state ? (
              voteCollection.houseVoteActive[house].votacion ? (
                <div>
                  <p className="text-2xl capitalize mb-4">
                    {
                      voteCollection.questions[
                        Object.keys(voteCollection.questions).length
                      ].questionToAdd
                    }
                  </p>
                  <button
                    type="button"
                    className="text-center bg-blue-900  rounded-3xl p-1  mb-4 w-full text-white capitalize hover:bg-blue-700"
                    onClick={() => {
                      addVote("yes", house, code, voteCollection);
                    }}
                  >
                    si
                  </button>
                  <button
                    type="button"
                    className="text-center bg-red-900  rounded-3xl p-1 mb-4 w-full text-white capitalize hover:bg-red-700"
                    onClick={() => {
                      addVote("not", house, code, voteCollection);
                    }}
                  >
                    no
                  </button>
                </div>
              ) : (
                <ResultQuestion dataVote={voteCollection} />
              )
            ) : (
              <p className="text-2xl capitalize font-bold p-4">
                Pregunta finalizada esperando nueva pregunta
              </p>
            )}
          </div>
        ) : (
          <section className="text-2xl capitalize p-4">
            esperando nueva pregunta
          </section>
        )
      ) : (
        <div className="text-2xl capitalize mb-4">
          <p className="text-2xl capitalize font-bold p-4">
            Votacion finalizada
          </p>
          <button
            type="button"
            className="text-center bg-red-900  rounded-3xl  mb-4 w-full text-white capitalize hover:bg-red-700"
            onClick={() => {
              navigate(HOME_ROUTE);
            }}
          >
            Salir
          </button>
        </div>
      )}
    </div>
  );
}

export default Vote;
