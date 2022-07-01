import { createContext, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { authUser } from "../../utils/auth";

const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("there is not auth provider");
  }
  return context;
};

export function AuthProvider({ children }) {
  const [sessionUser, setSessionUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authUser(setSessionUser, setLoading);
  }, []);

  const data = useMemo(
    () => ({
      sessionUser,
      loading,
    }),
    [sessionUser, loading],
  );

  return <authContext.Provider value={data}>{children}</authContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
