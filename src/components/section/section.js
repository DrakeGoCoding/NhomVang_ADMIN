import { BrowserRouter as Router, Routes, Switch, Route, Redirect } from "react-router-dom";
import Login from "../layout/login";
import Admin from "../admin/index";
import Users from "../admin/content/usersList";
const Section = () => {
    return (
        <>
            <Routes>
                <Route exact path="/auth/login" element={<Login />} />
                <Route path="/" element={<Admin com={<Users />} />} />
            </Routes>
        </>
    );
};
export default Section;
