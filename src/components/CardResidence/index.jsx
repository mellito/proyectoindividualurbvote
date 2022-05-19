import PropTypes, { string } from "prop-types";
import { useParams } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function CardResidence({ house }) {
  const { updateActiveHouse } = useAuth();
  const { housenumber, votacion, name, phone } = house;
  const id = useParams();

  return (
    <div className="flex items-center gap-1 border-b-2 border-black">
      <section className="w-32 capitalize ">
        <p>{name}</p>
        <p>{housenumber}</p>
        <p>{phone}</p>
      </section>

      <input
        type="checkbox"
        id="votation"
        name="Paneer"
        checked={votacion}
        onChange={() => {
          updateActiveHouse(id.id, housenumber);
        }}
      />
    </div>
  );
}

CardResidence.propTypes = {
  house: PropTypes.arrayOf(string).isRequired,
  housenumber: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  votacion: PropTypes.bool.isRequired,
};

export default CardResidence;
