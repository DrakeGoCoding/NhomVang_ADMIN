import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "@drakegocoding/ckeditor5-custom-build";
import UploadAdapterPlugin from "./ckeditor/uploadAdapter";
import { Button, Input, Modal, Space, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import News from "../../api/news.api";
import Image from "../../api/image.api";
import { store } from "../../store";
import {
    EDITOR_PAGE_LOADED,
    EDITOR_PAGE_UNLOADED,
    NEWS_SUBMITTED,
    UPDATE_FIELD_EDITOR
} from "../../constants/actionTypes";
import { useSelector } from "react-redux";

export default function NewsEditor() {
    const { slug } = useParams();
    const editor = useSelector(state => state.editor);

    const onLoad = payload => store.dispatch({ type: EDITOR_PAGE_LOADED, payload });
    const onUnload = () => store.dispatch({ type: EDITOR_PAGE_UNLOADED });
    const onUpdateField = (key, value) => store.dispatch({ type: UPDATE_FIELD_EDITOR, key, value });

    const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);

    const showSaveModal = () => setIsSaveModalVisible(true);
    const closeSaveModal = () => setIsSaveModalVisible(false);

    const changeThumbnail = value => onUpdateField("thumbnail", value);
    const changeDescription = e => onUpdateField("description", e.target.value);
    const changeContent = (event, editor) => {
        const content = editor.getData();
        onUpdateField("content", content);
    };

    const onEditorReady = editor => {
        console.log("CKEditor is ready to use");
    };

    const getTitle = () => {
        const document = parse(editor.content);
        if (!document || !document[0]) return "";
        const title = document[0].props.children.toString() || "";
        return title;
    };

    const handleSaveNews = () => {
        const news = {
            title: getTitle(),
            description: editor.description,
            content: editor.content,
            thumbnail: editor.thumbnail,
            slug: editor.slug
        };
        store.dispatch({
            type: NEWS_SUBMITTED,
            payload: editor.slug ? News.update(news) : News.create(news)
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

    return (
        <Space className="news-editor" direction="vertical" size="middle">
            <CKEditor
                editor={Editor}
                config={{
                    extraPlugins: [UploadAdapterPlugin]
                }}
                data={editor.content}
                onReady={onEditorReady}
                onChange={changeContent}
            />

            <Upload
                listType="picture"
                maxCount={1}
                accept="image/*"
                fileList={
                    editor.thumbnail
                        ? [
                              {
                                  uid: "-1",
                                  status: "done",
                                  name: "thumbnail.png",
                                  url: editor.thumbnail
                              }
                          ]
                        : []
                }
                beforeUpload={file => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = async () => {
                        try {
                            const base64Image = reader.result;
                            const { url } = await Image.upload(base64Image);
                            changeThumbnail(url);
                        } catch (error) {
                            changeThumbnail("");
                            console.log(error);
                        }
                    };
                    return false;
                }}
                onRemove={async file => changeThumbnail("")}
            >
                <Button className="flex items-center" icon={<UploadOutlined />}>
                    Upload thumbnail
                </Button>
            </Upload>

            <div className="flex">
                <Input.TextArea
                    className="px-4"
                    placeholder="Type your description"
                    value={editor.description}
                    size="middle"
                    autoSize={{ minRows: 3, maxRows: 3 }}
                    maxLength={200}
                    onChange={changeDescription}
                    allowClear
                />
                <Button className="save-btn px-8 ml-8 float-right" type="primary" onClick={showSaveModal}>
                    Save
                </Button>
            </div>

            <Modal title="Editor" visible={isSaveModalVisible} onOk={handleSaveNews} onCancel={closeSaveModal}>
                Confirm to save news?
            </Modal>
        </Space>
    );
}
