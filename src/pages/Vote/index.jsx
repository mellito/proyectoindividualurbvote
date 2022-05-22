/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../components/Context/AuthContext";

function Vote() {
  const { code, house } = useParams();
  console.log(house);
  const [voteCollection, setVoteCollection] = useState();

  const { realtimeCollectionVote } = useAuth();
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
          <>
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
            >
              si
            </button>
            <button
              type="button"
              className="text-center bg-red-900  rounded-3xl p-1 mb-4 w-full text-white capitalize hover:bg-red-700"
            >
              no
            </button>
          </>
        ) : (
          <section className="text-2xl capitalize mb-4">
            Esperando nueva pregunta
          </section>
        )
      ) : (
        <div className="text-2xl capitalize mb-4">Votacion finalizada</div>
      )}
    </div>
  );
}

export default Vote;
