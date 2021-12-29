import { useEffect } from "react";
import "../../style/news.css";
import NewsList from "./NewsList";
import { BackTop, Button, Pagination, Space, Spin } from "antd";
import { Link } from "react-router-dom";
import News from "../../api/news.api";
import { store } from "../../store";
import { NEWS_PAGE_LOADED, NEWS_PAGE_UNLOADED, SET_NEWSLIST_PAGE } from "../../store/actions";
import { useSelector } from "react-redux";

export default function NewsPage() {
    const { newsList, page, total, pager, reload, inProgress } = useSelector(state => state.newsList);

    const changePage = pageNumber => {
        store.dispatch({
            type: SET_NEWSLIST_PAGE,
            page: pageNumber - 1,
            payload: pager(pageNumber - 1)
        });
    };

    const onLoad = () => {
        const pager = page => News.getAll(page);
        store.dispatch({
            type: NEWS_PAGE_LOADED,
            pager,
            payload: News.getAll()
        });
    };

    const onUnload = () => {
        store.dispatch({ type: NEWS_PAGE_UNLOADED });
    };

    useEffect(() => {
        onLoad();
        return () => {
            onUnload();
        };
    }, []);

    useEffect(() => {
        if (reload) {
            onLoad();
        }
    }, [reload]);

    return (
        <div className="news-page flex flex-col">
            <div className="flex justify-between mb-8">
                <Space size="large">
                    <Button type="primary" size="large">
                        <Link to="/news/create">New Post</Link>
                    </Button>
                    {inProgress ? <Spin /> : null}
                </Space>
                {inProgress || (Array.isArray(newsList) && newsList.length === 0) ? null : (
                    <Pagination
                        className="flex items-center"
                        defaultCurrent={1}
                        current={page + 1}
                        pageSize={News.pageSize}
                        total={total}
                        onChange={changePage}
                    />
                )}
            </div>
            <NewsList data={newsList} inProgress={inProgress} />
            <BackTop style={{ verticalAlign: "middle" }} />
        </div>
    );
}
