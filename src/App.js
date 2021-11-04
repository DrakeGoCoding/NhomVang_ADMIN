import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Section from "./components/section/section";

function App() {
    return (
        <Router>
            <Section />
        </Router>
    );
}

export default App;
