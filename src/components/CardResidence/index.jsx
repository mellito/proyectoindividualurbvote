/* eslint-disable no-unused-expressions */
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function CardResidence({ house }) {
  const { updateActiveHouse, useSweetAlert } = useAuth();
  const { housenumber, votacion, name, phone } = house;
  const id = useParams();

  return (
    <div className="flex items-center border-b-2 border-black mb-2 ">
      <p className="w-1/4 text-center capitalize">{name}</p>
      <p className="w-1/4 text-center">{housenumber}</p>
      <p className="w-1/4 text-center">{phone}</p>

      <input
        className="w-1/4 text-center"
        type="checkbox"
        id="votation"
        name="Paneer"
        checked={votacion}
        onChange={() => {
          localStorage.code
            ? useSweetAlert(
                "error",
                "no puedes modificar la lista de votantes cuando una votacion esta iniciada",
                "error",
              )
            : updateActiveHouse(id.id, housenumber);
        }}
      />
    </div>
  );
}

CardResidence.propTypes = {
  house: PropTypes.shape({
    housenumber: PropTypes.string,
    votacion: PropTypes.bool,
    name: PropTypes.string,
    phone: PropTypes.string,
  }).isRequired,
};

export default CardResidence;
