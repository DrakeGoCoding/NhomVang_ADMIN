import { useEffect } from "react";
import "../../style/news.css";
import NewsList from "./NewsList";
import { Button, Pagination } from "antd";
import { Link } from "react-router-dom";
import News from "../../api/news.api";
import { store } from "../../store";
import { NEWS_PAGE_LOADED, NEWS_PAGE_UNLOADED, SET_NEWSLIST_PAGE } from "../../constants/actionTypes";
import { useSelector } from "react-redux";

export default function NewsPage() {
    const { newsList, currentPage, total, pager } = useSelector(state => state.newsList);
    const pageSize = 10;

    const changePage = pageNumber => {
        store.dispatch({
            type: SET_NEWSLIST_PAGE,
            page: pageNumber - 1,
            payload: pager(pageNumber - 1)
        });
    };

    const onLoad = (pager, payload) => {
        store.dispatch({
            type: NEWS_PAGE_LOADED,
            pager,
            payload
        });
    };

    const onUnload = () => {
        store.dispatch({ type: NEWS_PAGE_UNLOADED });
    };

    useEffect(() => {
        const pager = page => News.getAll(pageSize, page);
        onLoad(pager, News.getAll(pageSize));
        return () => {
            onUnload();
        };
    }, []);

    return (
        <div className="news-page flex flex-col">
            <div className="flex justify-between mb-8">
                <Button type="primary" size="large">
                    <Link to="/editor">New Post</Link>
                </Button>
                <Pagination
                    className="flex items-center"
                    defaultCurrent={1}
                    current={currentPage + 1}
                    pageSize={pageSize}
                    total={total}
                    onChange={changePage}
                />
            </div>
            <NewsList data={newsList} />
        </div>
    );
}
