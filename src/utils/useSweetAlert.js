import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const useSweetAlert = (title, message, tipeIcon) => {
  MySwal.fire(title, message, tipeIcon);
};

export default useSweetAlert;
