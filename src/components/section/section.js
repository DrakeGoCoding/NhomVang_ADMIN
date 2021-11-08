import { BrowserRouter as Router, Routes, Switch, Route, Redirect } from "react-router-dom";
import Login from "../layout/login";
import Admin from "../admin/index";
const Section = () => {
    return (
        <>
            <Routes>
                <Route exact path="/auth/login" element={<Login />} />
                <Route path="/" element={<Admin />} />
            </Routes>
        </>
    );
};
export default Section;
