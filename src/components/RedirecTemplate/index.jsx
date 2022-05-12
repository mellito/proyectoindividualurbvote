import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function RedirecTemplate({ nameLink, nameContent, goLink }) {
  return (
    <div className="text-sm">
      <span className="font-semibold"> {nameContent} </span>
      <Link to={goLink} className="text-sm text-blue-900 font-semibold mb-4">
        {nameLink}
      </Link>
    </div>
  );
}

RedirecTemplate.propTypes = {
  nameLink: PropTypes.string.isRequired,
  nameContent: PropTypes.string.isRequired,
  goLink: PropTypes.string.isRequired,
};

export default RedirecTemplate;
