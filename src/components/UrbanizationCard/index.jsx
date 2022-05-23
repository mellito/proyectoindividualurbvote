import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { RESIDENCE } from "../Constans/Routes";

function UrbanizationCard({ urbanizationData }) {
  const { photo, email, uniName, identification, phone } = urbanizationData;

  return (
    <Link to={`${RESIDENCE}/${identification}`}>
      <div className="text-center">
        <p className="font-bold capitalize"> {uniName}</p>
        <img src={photo} alt={uniName} className="w-96 h-80 object-fill" />
        <section className="px-1">
          <p>Correo: {email}</p>
          <p>Telefono: {phone}</p>
        </section>
      </div>
    </Link>
  );
}

UrbanizationCard.propTypes = {
  urbanizationData: PropTypes.shape({
    uniName: PropTypes.string,
    identification: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    photo: PropTypes.string,
  }).isRequired,
};

export default UrbanizationCard;
