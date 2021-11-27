import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Image } from "antd";
import defaultNewsImage from "../../../assets/defaultNewsImage.png";

const NewsImage = ({ src }) => {
    return <Image className="news-thumbnail" src={src} fallback={defaultNewsImage} preview={false} />;
};

function NewsPreview(props) {
    const data = props.data;

    return data ? (
        <div className="news-preview">
            <NewsImage src={data.thumbnail} />
            <div className="news-body">
                <div className="news-date">{new Date(data.modifiedDate).toLocaleDateString()}</div>
                <h2 className="news-title">
                    <Link to={`/news/${data.slug}`}>{data.title}</Link>
                </h2>
                <div className="news-description">{data.description}</div>
                <div className="news-footer">
                    <Link className="news-link-btn" to={`/news/${data.slug}`}>
                        Read more
                    </Link>
                </div>
            </div>
        </div>
    ) : null;
}

NewsPreview.propTypes = {
    data: PropTypes.shape({
        thumbnail: PropTypes.string,
        modifiedDate: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        slug: PropTypes.string
    })
};

export default NewsPreview;
