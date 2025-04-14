import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Home } from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/noteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState, useEffect } from "react";

function App() {
  const [alert, setAlert] = useState(null);
  const [mode, setMode] = useState("dark"); // Dark mode active by default

  useEffect(() => {
    document.body.style.backgroundColor = mode === "dark" ? "#212529" : "white";
  }, [mode]);

  const toggleMode = () => {
    setMode(mode === "dark" ? "light" : "dark");
    document.body.style.backgroundColor = mode === 'light' ? '#212529' : 'white';
    if (mode === 'light') {
      showAlert("Dark mode has been enabled", "success");
    } else {
      showAlert("Light mode has been enabled", "success");
    }
  };

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <>
      <NoteState>
        <Router>
          <Navbar mode={mode} toggleMode={toggleMode} />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} mode={mode} />} />
              <Route exact path="/about" element={<About mode={mode} />} />
              <Route exact path="/login" element={<Login showAlert={showAlert} mode={mode} />} />
<Route exact path="/signup" element={<Signup showAlert={showAlert} mode={mode} />} />

            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
