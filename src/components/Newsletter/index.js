import { useEffect } from "react";
import Newsletter from "../../api/newsletter.api";
import { FILTER_NEWSLETTERLIST, NEWSLETTERLIST_PAGE_LOADED, NEWSLETTERLIST_PAGE_UNLOADED } from "../../store/actions";
import { store } from "../../store";
import { Button, Space } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import NewsletterHistory from "./NewsletterHistory";
import "../../style/newsletter.css";
import { useSelector } from "react-redux";

export default function NewsletterPage() {
    const { newsletterList, total, pager, page, inProgress } = useSelector(state => state.newsletterList);
    const onLoad = payload => {
        const pager = page => Newsletter.getAll(page);
        store.dispatch({
            type: NEWSLETTERLIST_PAGE_LOADED,
            pager,
            payload: Newsletter.getAll()
        });
    };
    const onUnload = () => store.dispatch({ type: NEWSLETTERLIST_PAGE_UNLOADED });
    const onReload = () => store.dispatch({ type: FILTER_NEWSLETTERLIST, page, payload: pager(page) });

    useEffect(() => {
        onLoad();
        return () => onUnload();
    }, []);

    return (
        <Space className="newsletter-page max-w-full" direction="vertical" size="large">
            <div className="flex flex-col-reverse justify-between xl:flex-row">
                <Space></Space>
                <Space className="mb-6 xl:mb-0" size="middle">
                    <Button type="primary" size="large">
                        <Link to="/newsletters/create">New</Link>
                    </Button>
                    <Button size="large" icon={<ReloadOutlined />} onClick={onReload} />
                </Space>
            </div>
            <NewsletterHistory
                newsletterList={newsletterList}
                pageSize={Newsletter.pageSize}
                total={total}
                currentPage={page + 1}
                pager={pager}
                inProgress={inProgress}
                onReload={onReload}
            />
        </Space>
    );
}
