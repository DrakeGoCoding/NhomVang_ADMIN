import PropTypes from "prop-types";
import { Space } from "antd";
import NewsPreview from "./newsPreview";

function NewsList(props) {
    const newsList = props.data;
    const isRender = newsList && Array.isArray(newsList) && newsList.length > 0;

    return (
        <Space direction="vertical">
            {isRender ? newsList.map(news => <NewsPreview key={news.slug} data={news} />) : null}
        </Space>
    );
}

NewsList.propTypes = {
    data: PropTypes.array
};

export default NewsList;
