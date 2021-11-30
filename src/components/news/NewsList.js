import PropTypes from "prop-types";
import NewsPreview from "./NewsPreview";

function NewsList(props) {
    const newsList = props.data;
    const isRender = newsList && Array.isArray(newsList) && newsList.length > 0;

    return (
        <div className="flex flex-col justify-center">
            {isRender ? (
                newsList.map(news => <NewsPreview key={news.slug} data={news} />)
            ) : (
                <div className="news-preview">No news are here... yet</div>
            )}
        </div>
    );
}

NewsList.propTypes = {
    data: PropTypes.array
};

export default NewsList;
