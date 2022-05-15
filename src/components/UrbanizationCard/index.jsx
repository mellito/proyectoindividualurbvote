import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { RESIDENCE } from "../Constans/Routes";

function UrbanizationCard({ urbanizationData }) {
  const { photo, email, address, uniName, identification } = urbanizationData;

  return (
    <Link
      to={`${RESIDENCE}/${identification}`}
      className="border-2 border-black"
    >
      <div>
        <img src={photo} alt={uniName} className="w-full h-40 object-fill" />
        <section className="px-1">
          <p> {uniName}</p>
          <p> {email}</p>
          <p> {address}</p>
        </section>
      </div>
    </Link>
  );
}

UrbanizationCard.defaultProps = {
  photo: "",
  email: "",
  address: "",
  uniName: "",
};

UrbanizationCard.propTypes = {
  urbanizationData: PropTypes.objectOf(PropTypes.string).isRequired,
  photo: PropTypes.string,
  email: PropTypes.string,
  address: PropTypes.string,
  uniName: PropTypes.string,
};

export default UrbanizationCard;
