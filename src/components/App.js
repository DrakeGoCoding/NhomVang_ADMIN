import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";

import { store } from "../store";
import { APP_LOAD, REDIRECT } from "../store/actions";

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

import "../style/App.css";
import InvoiceEditor from "./Invoice/InvoiceEditor";
import NewsletterPage from "./Newsletter";
import NewsletterEditor from "./Newsletter/NewsletterEditor";
import Notification from "../api/notification.api";
import Dashboard from "./Dashboard";
import NotFound from "./NotFound";

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
    const payload = token
      ? Promise.all([Auth.current(), Notification.getAll()])
      : null;
    onLoad(payload, token);
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
          <Route index element={<Dashboard />} />
          <Route path="/users" element={<User />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/create" element={<NewsEditor />} />
          <Route path="/news/edit/:slug" element={<NewsEditor />} />
          <Route path="/products" element={<Product />} />
          <Route
            path="/products/create"
            element={<ProductEditor mode="create" />}
          />
          <Route
            path="/products/edit/:slug"
            element={<ProductEditor mode="edit" />}
          />
          <Route path="/invoices" element={<Invoice />} />
          <Route path="/invoices/:id" element={<InvoiceEditor />} />
          <Route path="/newsletters" element={<NewsletterPage />} />
          <Route path="/newsletters/create" element={<NewsletterEditor />} />
          <Route path="/newsletters/edit/:id" element={<NewsletterEditor />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      ) : (
        <Route path="/login" element={<Login />} />
      )}
    </Routes>
  );
}
