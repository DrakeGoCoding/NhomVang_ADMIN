import { useEffect } from "react";
import Newsletter from "../../api/newsletter.api";
import { NEWSLETTERLIST_PAGE_LOADED, NEWSLETTERLIST_PAGE_UNLOADED } from "../../store/actions";
import { store } from "../../store";
import { useSelector } from "react-redux";
import "../../style/newsletter.css";
import { BackTop, Button, Spin } from "antd";
import { Link } from "react-router-dom";
import NewsletterHistory from "./NewsletterHistory";

export default function NewsletterPage() {
    const { newsletterList, inProgress } = useSelector(state => state.newsletterList);
    const onLoad = payload => {
        const pager = page => Newsletter.getAll(page);
        store.dispatch({
            type: NEWSLETTERLIST_PAGE_LOADED,
            pager,
            payload: Newsletter.getAll()
        });
    };
    const onUnload = () => store.dispatch({ type: NEWSLETTERLIST_PAGE_UNLOADED });

    useEffect(() => {
        onLoad();
        return () => onUnload();
    }, []);

    return (
        <div className="newsletter-page flex flex-col">
            <div>
                <Button type="primary" size="large">
                    <Link to="/newsletter/create">New</Link>
                </Button>
                {inProgress ? <Spin /> : null}
            </div>
            <NewsletterHistory data={newsletterList} inProgress={inProgress} />
            <BackTop style={{ verticalAlign: "middle" }} />
        </div>
    );
}
