import MainRoute from "./components/MainRoute";
import { AuthProvider } from "./components/Context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <MainRoute />
    </AuthProvider>
  );
}

export default App;
