import { Space } from "antd";
import PropTypes from "prop-types";
import NewsPreview from "./NewsPreview";

function NewsList(props) {
    const newsList = props.data;
    const isRender = newsList && Array.isArray(newsList) && newsList.length > 0;

    return (
        <Space direction="vertical">
            {isRender ? (
                newsList.map(news => <NewsPreview key={news.slug} data={news} inProgress={props.inProgress} />)
            ) : (
                <div className="news-preview">No news are here... yet</div>
            )}
        </Space>
    );
}

NewsList.propTypes = {
    data: PropTypes.array
};

export default NewsList;
