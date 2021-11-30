import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";

import { store } from "../store";
import { APP_LOAD, REDIRECT } from "../constants/actionTypes";

import { setToken } from "../api/agent";
import Auth from "../api/auth.api";

import Home from "./Home";
import Login from "./Login";
import News from "./News";
import NewsEditor from "./News/NewsEditor";

export default function App() {
    const navigate = useNavigate();
    const common = useSelector(state => state.common);

    const onLoad = (payload, token) => {
        store.dispatch({ type: APP_LOAD, payload, token });
    };

    const onRedirect = () => {
        store.dispatch({ type: REDIRECT });
    };

    useEffect(() => {
        if (common.redirectTo) {
            navigate(common.redirectTo);
            onRedirect();
        }
    }, [common.redirectTo, navigate]);

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (token) {
            setToken(token);
        } else {
            navigate("/login");
        }
        onLoad(token ? Auth.current() : null, token);
    }, [navigate]);

    return (
        <Routes>
            <Route path="/" element={<Home />}>
                <Route path="/news" element={<News />} />
                <Route path="/editor" element={<NewsEditor />} />
                <Route path="/editor/:slug" element={<NewsEditor />} />
            </Route>
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}
