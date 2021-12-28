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
import User from "./User";
import Product from "./Product";
import ProductEditor from "./Product/ProductEditor";
import Invoice from "./Invoice";

import "../App.css";
import InvoiceEditor from "./Invoice/InvoiceEditor";
import NewsletterPage from "./Newsletter";

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
        const token = localStorage.getItem("jwt");
        if (token) {
            setToken(token);
        }
        onLoad(token ? Auth.current() : null, token);
    }, []);

    useEffect(() => {
        if (common.redirectTo) {
            navigate(common.redirectTo);
            onRedirect();
        }
    }, [common.redirectTo, navigate]);

    return (
        <Routes>
            {common.token ? (
                <Route path="/" element={<Home />}>
                    <Route index element={<h2>Welcome to Voucher Hunter Management Website</h2>} />
                    <Route path="/user" element={<User />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/news/create" element={<NewsEditor />} />
                    <Route path="/news/edit/:slug" element={<NewsEditor />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="/product/create" element={<ProductEditor />} />
                    <Route path="/product/edit/:slug" element={<ProductEditor />} />
                    <Route path="/invoice" element={<Invoice />} />
                    <Route path="/invoice/:id" element={<InvoiceEditor />} />
                    <Route path="/newsletter" element={<NewsletterPage />} />
                </Route>
            ) : (
                <Route path="/login" element={<Login />} />
            )}
        </Routes>
    );
}
