import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { RESIDENCE } from "../Constans/Routes";

function UrbanizationCard({ urbanizationData }) {
  const { photo, email, uniName, identification, phone } = urbanizationData;

  return (
    <Link to={`${RESIDENCE}/${identification}`}>
      <div className="text-center">
        <p> {uniName}</p>
        <img src={photo} alt={uniName} className="w-72 h-60 object-fill" />
        <section className="px-1">
          <p>Correo: {email}</p>
          <p>Telefono: {phone}</p>
        </section>
      </div>
    </Link>
  );
}

UrbanizationCard.defaultProps = {
  photo: "",
  email: "",
  uniName: "",
  phone: "",
};

UrbanizationCard.propTypes = {
  urbanizationData: PropTypes.objectOf(PropTypes.string).isRequired,
  photo: PropTypes.string,
  email: PropTypes.string,
  uniName: PropTypes.string,
  phone: PropTypes.string,
};

export default UrbanizationCard;
