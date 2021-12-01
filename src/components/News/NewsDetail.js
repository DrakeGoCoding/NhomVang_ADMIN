import { Image } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import newsApi from "../../api/news.api";
import defaultNewsImage from "../../../assets/defaultNewsImage.png";
import { htmlDecode } from "../../utils/decoder";

const NewsImage = ({ src }) => (
    <Image className="news-thumbnail" src={src} fallback={defaultNewsImage} preview={false} />
);

export default function NewsDetail() {
    const { slug } = useParams();

    const [news, setNews] = useState(null);

    const fetchNews = async slug => {
        try {
            const { news } = await newsApi.getBySlug(slug);
            setNews(news);
        } catch (error) {
            setNews(null);
            console.log(error);
        }
    };

    useEffect(() => {
        if (slug) {
            fetchNews(slug);
        }
    }, [slug]);

    return (
        <div>
            {news ? (
                <article className="news-detail">
                    <div className="news-thumbnail">
                        <NewsImage src={news.thumbnail || defaultNewsImage} />
                    </div>
                    <div className="news-content">{ReactHtmlParser(htmlDecode(news.content || "Empty"))}</div>
                </article>
            ) : (
                <span>This news does not exist.</span>
            )}
        </div>
    );
}
