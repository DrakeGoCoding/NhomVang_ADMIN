import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "@drakegocoding/ckeditor5-custom-build";
import UploadAdapterPlugin from "../Common/ckeditor/UploadAdapter";
import { Button, Form, Input, message, Modal, Space, Spin, Tabs, Tag, Tooltip, Upload } from "antd";
import { ArrowLeftOutlined, LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import News from "../../api/news.api";
import { store } from "../../store";
import {
    EDITOR_PAGE_LOADED,
    EDITOR_PAGE_UNLOADED,
    NEWS_SUBMITTED,
    UPDATE_FIELD_NEWS_EDITOR
} from "../../store/actions";
import { useSelector } from "react-redux";
import { beforeUploadImage, isStringInArray } from "../../utils";

const ExtraTabSlot = {
    left: (
        <Tooltip title="Back">
            <Link to="/news" className="mr-2">
                <Button type="link" icon={<ArrowLeftOutlined />} />
            </Link>
        </Tooltip>
    )
};

export default function NewsEditor() {
    const { slug } = useParams();
    const { data, inProgress } = useSelector(state => state.editor);

    const onLoad = payload => store.dispatch({ type: EDITOR_PAGE_LOADED, payload });
    const onUnload = () => store.dispatch({ type: EDITOR_PAGE_UNLOADED });
    const onUpdateField = (key, value) => store.dispatch({ type: UPDATE_FIELD_NEWS_EDITOR, key, value });

    const [currentTab, setCurrentTab] = useState("content");
    const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);
    const [thumbnailImage, setThumbnailImage] = useState([]);

    const changeTab = activeKey => setCurrentTab(activeKey);

    const addTag = tag => {
        if (!isStringInArray(data.tags, tag) && tag.trim().length > 0) {
            onUpdateField("tags", [...data.tags, tag]);
        }
    };
    const removeTag = index => {
        const newTagList = [...data.tags];
        newTagList.splice(index, 1);
        onUpdateField("tags", newTagList);
    };

    const showSaveModal = () => {
        if (!data.title || !data.content) {
            setCurrentTab("content");
            message.error({ content: "Title and content are required." });
            return;
        }
        setIsSaveModalVisible(true);
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
                tabBarExtraContent={ExtraTabSlot}
            >
                <Tabs.TabPane tab="Content" key="content">
                    <ContentTab
                        inProgress={inProgress}
                        title={data.title}
                        content={data.content}
                        onTitleChange={changeTitle}
                        onContentChange={changeContent}
                    />
                </Tabs.TabPane>
                <Tabs.TabPane tab="More" key="more">
                    <MoreTab
                        thumbnailImage={thumbnailImage}
                        tags={data.tags}
                        description={data.description}
                        onThumbnailChange={changeThumbnail}
                        onTagAdd={addTag}
                        onTagRemove={removeTag}
                        onDescriptionChange={changeDescription}
                    />
                </Tabs.TabPane>
            </Tabs>

            <Space size="middle" className="float-right">
                <Button>
                    <Link to="/news">Cancel</Link>
                </Button>
                <Button disabled={inProgress} type="primary" onClick={showSaveModal}>
                    {slug ? "Save" : "Create"}
                </Button>
            </Space>

            <Modal title="Editor" visible={isSaveModalVisible} onOk={handleSaveNews} onCancel={closeSaveModal}>
                Confirm to save news?
            </Modal>
        </div>
    );
}

function ContentTab(props) {
    if (props.inProgress) {
        return <Spin size="large" />;
    }
    return (
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
                    value={props.title}
                    maxLength={100}
                    size="middle"
                    autoSize={{ minRows: 1, maxRows: 1 }}
                    allowClear
                    onChange={props.onTitleChange}
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
                    data={props.content}
                    onChange={props.onContentChange}
                />
            </Form.Item>
        </Form>
    );
}

function MoreTab(props) {
    const [isUploadingThumbnail, setUploadingThumbnail] = useState(false);
    const [tagInput, setTagInput] = useState("");
    const onTagInputChange = e => setTagInput(e.target.value);
    const addTag = e => {
        e.preventDefault();
        const lowerCaseTag = tagInput.toLocaleLowerCase();
        props.onTagAdd(lowerCaseTag);
        setTagInput("");
    };
    const removeTag = index => props.onTagRemove(index);

    if (props.inProgress) {
        return <Spin size="large" />;
    }
    return (
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
                    fileList={props.thumbnailImage}
                    beforeUpload={file => beforeUploadImage(file, props.onThumbnailChange, setUploadingThumbnail)}
                    onRemove={async file => props.onThumbnailChange("")}
                >
                    <Button
                        className="flex items-center"
                        icon={isUploadingThumbnail ? <LoadingOutlined /> : <UploadOutlined />}
                    >
                        Upload thumbnail
                    </Button>
                </Upload>
            </Form.Item>
            <Form.Item label="Tags">
                <Input value={tagInput} onChange={onTagInputChange} onPressEnter={addTag} />
                <div>
                    {props.tags.map((tag, index) => (
                        <Tag
                            className="mt-3 p-1"
                            key={index}
                            color="processing"
                            closable
                            onClose={() => removeTag(index)}
                        >
                            {tag.toUpperCase()}
                        </Tag>
                    ))}
                </div>
            </Form.Item>
            <Form.Item label="Description">
                <Input.TextArea
                    placeholder="Type your description"
                    value={props.description}
                    size="large"
                    autoSize={{ minRows: 4, maxRows: 4 }}
                    maxLength={200}
                    onChange={props.onDescriptionChange}
                    allowClear
                />
            </Form.Item>
        </Form>
    );
}
