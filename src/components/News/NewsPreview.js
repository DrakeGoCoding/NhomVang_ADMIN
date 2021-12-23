import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, Image, Modal, Space, Tag } from "antd";
import defaultNewsImage from "../../assets/defaultNewsImage.png";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_NEWS } from "../../constants/actionTypes";
import News from "../../api/news.api";
import { useState } from "react";

const NewsImage = ({ className, src, hidden }) => {
    return (
        <div className={className} hidden={hidden}>
            <Image
                width={200}
                height={200}
                className="news-thumbnail max-w-xs max-h-80 mr-8"
                src={src || defaultNewsImage}
                fallback={defaultNewsImage}
                preview={false}
            />
        </div>
    );
};

function NewsPreview(props) {
    const dispatch = useDispatch();
    const isSiderCollapsed = useSelector(state => state.common.isSiderCollapsed);
    const data = props.data;

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

    const showDeleteModal = () => setIsDeleteModalVisible(true);
    const closeDeleteModal = () => setIsDeleteModalVisible(false);

    const handleDeleteNews = () => {
        closeDeleteModal();
        dispatch({
            type: DELETE_NEWS,
            slug: data.slug,
            payload: News.delete(data.slug)
        });
    };

    return data ? (
        <div className={`news-preview px-10 py-8 bg-white ${props.inProgress ? "pointer-events-none opacity-50" : ""}`}>
            <Space size={0}>
                <NewsImage className="mr-8" src={data.thumbnail} hidden={isSiderCollapsed} />
                <div className="news-body">
                    <div className="news-date mb-3 text-gray-500">
                        {new Date(data.modifiedDate).toLocaleDateString()}
                    </div>
                    <div className="news-author mb-4 italic">
                        By <span className="font-bold">{data.author}</span>
                    </div>
                    <h2 className="news-title my-0 mb-4">
                        <Link className="text-2xl" to={`/news/edit/${data.slug}`}>
                            {data.title}
                        </Link>
                    </h2>
                    <div className="news-tags">
                        {data.tags.map((tag, index) => (
                            <Tag className="mt-2 p-1" key={index} color="success">
                                {tag.toUpperCase()}
                            </Tag>
                        ))}
                    </div>
                    <div className="news-description leading-7">{data.description}</div>
                    <Space className="news-footer mt-6" size="middle">
                        <Button className="px-6" type="primary" size="large">
                            <Link to={`/news/edit/${data.slug}`}>Edit</Link>
                        </Button>
                        <Button className="px-6" type="primary" size="large" onClick={showDeleteModal} danger>
                            Delete
                        </Button>
                    </Space>
                </div>
            </Space>
            <Modal
                title="Delete News"
                visible={isDeleteModalVisible}
                onOk={handleDeleteNews}
                onCancel={closeDeleteModal}
                okButtonProps={{ danger: true }}
                cancelButtonProps={{ danger: true }}
            >
                Confirm to delete "{data.slug}" ?
            </Modal>
        </div>
    ) : null;
}

NewsPreview.propTypes = {
    data: PropTypes.shape({
        author: PropTypes.string,
        thumbnail: PropTypes.string,
        modifiedDate: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        slug: PropTypes.string
    })
};

export default NewsPreview;
