import { Routes, Route } from "react-router-dom";
import Login from "../layout/login";
import Admin from "../admin/index";
import Users from "../admin/content/usersList";
import News from "../news";
import NewsDetail from "../news/content/newsDetail";
import NewsEditor from "../news/content/newsEditor";
const Section = () => {
    return (
        <>
            <Routes>
                <Route exact path="/auth/login" element={<Login />} />
                <Route path="/" element={<Admin com={<Users />} />} />
                <Route path="/news" element={<News />} />
                <Route path="/news/:slug" element={<NewsDetail />} />
                <Route path="/editor" element={<NewsEditor />} />
                <Route path="/editor/:slug" element={<NewsEditor />} />
            </Routes>
        </>
    );
};
export default Section;
