import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "@drakegocoding/ckeditor5-custom-build";
import UploadAdapterPlugin from "../Common/ckeditor/UploadAdapter";
import { Button, Form, Input, message, Modal, Space, Spin, Tabs, Upload } from "antd";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import News from "../../api/news.api";
import { store } from "../../store";
import {
    EDITOR_PAGE_LOADED,
    EDITOR_PAGE_UNLOADED,
    NEWS_SUBMITTED,
    UPDATE_FIELD_NEWS_EDITOR
} from "../../constants/actionTypes";
import { useSelector } from "react-redux";
import { beforeUploadImage } from "../../utils";

export default function NewsEditor() {
    const { slug } = useParams();
    const { data, inProgress } = useSelector(state => state.editor);

    const onLoad = payload => store.dispatch({ type: EDITOR_PAGE_LOADED, payload });
    const onUnload = () => store.dispatch({ type: EDITOR_PAGE_UNLOADED });
    const onUpdateField = (key, value) => store.dispatch({ type: UPDATE_FIELD_NEWS_EDITOR, key, value });

    const [currentTab, setCurrentTab] = useState("content");
    const [isUploadingThumbnail, setUploadingThumbnail] = useState(false);
    const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);
    const [thumbnailImage, setThumbnailImage] = useState([]);

    const changeTab = activeKey => setCurrentTab(activeKey);

    const showSaveModal = () => {
        if (!data.title || !data.content) {
            setCurrentTab("content");
            message.error({ content: "Title and content are required." });
        } else {
            setIsSaveModalVisible(true);
        }
    };
    const closeSaveModal = () => setIsSaveModalVisible(false);

    const changeTitle = e => onUpdateField("title", e.target.value);
    const changeThumbnail = value => onUpdateField("thumbnail", value);
    const changeDescription = e => onUpdateField("description", e.target.value);
    const changeContent = (event, editor) => {
        const content = editor.getData();
        onUpdateField("content", content);
    };

    const handleSaveNews = () => {
        store.dispatch({
            type: NEWS_SUBMITTED,
            payload: slug ? News.update(data) : News.create(data)
        });
        closeSaveModal();
    };

    useEffect(() => {
        onLoad(slug ? News.getBySlug(slug) : null);
    }, [slug]);

    useEffect(() => {
        return () => {
            onUnload();
        };
    }, []);

    useEffect(() => {
        if (data.thumbnail) {
            setThumbnailImage([
                {
                    uid: "-1",
                    status: "done",
                    name: "thumbnail.png",
                    url: data.thumbnail
                }
            ]);
        } else {
            setThumbnailImage([]);
        }
    }, [data.thumbnail]);

    return (
        <div className="news-editor">
            <Tabs
                type="card"
                className="mb-4"
                activeKey={currentTab}
                defaultActiveKey="content"
                onChange={changeTab}
                style={{ maxHeight: 1000 }}
            >
                <Tabs.TabPane tab="Content" key="content">
                    {inProgress ? (
                        <Spin size="large" />
                    ) : (
                        <Form
                            labelCol={{ xs: { span: 24 }, sm: { span: 4 } }}
                            labelAlign="left"
                            wrapperCol={{ span: 24 }}
                            size="large"
                            colon={false}
                        >
                            <Form.Item>
                                <Input.TextArea
                                    className="font-bold text-2xl"
                                    placeholder="Type your title (required)"
                                    value={data.title}
                                    maxLength={100}
                                    size="middle"
                                    autoSize={{ minRows: 1, maxRows: 1 }}
                                    allowClear
                                    onChange={changeTitle}
                                />
                            </Form.Item>
                            <Form.Item>
                                <CKEditor
                                    editor={Editor}
                                    config={{
                                        placeholder: "Type your content (required)",
                                        extraPlugins: [UploadAdapterPlugin],
                                        removePlugins: ["Title"]
                                    }}
                                    data={data.content}
                                    onChange={changeContent}
                                />
                            </Form.Item>
                        </Form>
                    )}
                </Tabs.TabPane>
                <Tabs.TabPane tab="More" key="more">
                    {inProgress ? (
                        <Spin size="large" />
                    ) : (
                        <Form
                            labelCol={{ xs: { span: 24 }, sm: { span: 4 } }}
                            labelAlign="left"
                            wrapperCol={{ xs: { span: 24 }, sm: { span: 20 } }}
                            size="large"
                            colon={false}
                            style={{ maxWidth: 1000, minWidth: 200 }}
                        >
                            <Form.Item label="Thumbnail">
                                <Upload
                                    listType="picture"
                                    maxCount={1}
                                    accept="image/*"
                                    fileList={thumbnailImage}
                                    beforeUpload={file =>
                                        beforeUploadImage(file, changeThumbnail, setUploadingThumbnail)
                                    }
                                    onRemove={async file => changeThumbnail("")}
                                >
                                    <Button
                                        className="flex items-center"
                                        icon={isUploadingThumbnail ? <LoadingOutlined /> : <UploadOutlined />}
                                    >
                                        Upload thumbnail
                                    </Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item label="Description">
                                <Input.TextArea
                                    placeholder="Type your description"
                                    value={data.description}
                                    size="large"
                                    autoSize={{ minRows: 4, maxRows: 4 }}
                                    maxLength={200}
                                    onChange={changeDescription}
                                    allowClear
                                />
                            </Form.Item>
                        </Form>
                    )}
                </Tabs.TabPane>
            </Tabs>

            <Space size="large">
                <Button disabled={inProgress} type="primary" onClick={showSaveModal}>
                    {slug ? "Save" : "Create"}
                </Button>

                <Button>
                    <Link to="/news">Cancel</Link>
                </Button>
            </Space>

            <Modal title="Editor" visible={isSaveModalVisible} onOk={handleSaveNews} onCancel={closeSaveModal}>
                Confirm to save news?
            </Modal>
        </div>
    );
}
