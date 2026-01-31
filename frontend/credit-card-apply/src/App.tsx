
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import { UserProvider } from "./context/UserContext";
import "./App.css";


function App() {
  return (
    <UserProvider>
      <div>
        {/* <Home /> */}
        <Dashboard />
      </div>
    </UserProvider>
  );
}

export default App;
