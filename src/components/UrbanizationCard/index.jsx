import PropTypes from "prop-types";

function UrbanizationCard({ urbanizationData }) {
  const { photo, email, address, uniName } = urbanizationData;
  return (
    <div>
      <img src={photo} alt={uniName} />
      <section>
        <p>nombre {uniName}</p>
        <p>email {email}</p>
        <p>direccion {address}</p>
      </section>
    </div>
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
