import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "@drakegocoding/ckeditor5-custom-build";
import UploadAdapterPlugin from "../ckeditor/uploadAdapter";
import { Button, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export default function NewsEditor() {
    const { slug } = useParams();
    const [content, setContent] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [description, setDescription] = useState("");

    const changeDescription = e => setDescription(e.target.value);

    const onEditorReady = editor => {
        console.log("CKEditor is ready to use");
    };

    const onEditorChange = (event, editor) => {
        const data = editor.getData();
        setContent(data);
    };

    const getTitle = () => {
        const document = parse(content);
        if (!document || !document[0]) return "";
        const title = document[0].props.children.toString() || "";
        return title;
    };

    const handleSave = e => {
        const news = {
            title: getTitle(),
            content,
            thumbnail,
            description
        };
        console.log(news);
        // TODO: post news
    };

    useEffect(() => {
        if (slug) {
            // TODO: find news by slug
            // TODO: setData(news.body)
            setContent("");
        }
        return () => {
            //
        };
    }, [slug]);

    const uploadProps = {
        listType: "picture",
        maxCount: 1,
        accept: "image/*",
        beforeUpload: file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = async () => {
                try {
                    const base64Image = reader.result;
                    const data = await fetch("http://localhost:5543/image/upload", {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        method: "POST",
                        body: JSON.stringify({ image: base64Image })
                    });
                    setThumbnail(data.status === 201 ? await data.json() : "");
                } catch (error) {
                    console.log(error);
                    setThumbnail("");
                }
            };
            return false;
        },
        onRemove: file => {
            setThumbnail("");
        }
    };

    return (
        <div className="news-editor">
            <CKEditor
                editor={Editor}
                config={{
                    extraPlugins: [UploadAdapterPlugin]
                }}
                data={content}
                onReady={onEditorReady}
                onChange={onEditorChange}
            />
            <div className="thumbnail-upload my-4 px-5 flex justify-between items-center">
                <div>
                    <Input.TextArea
                        className="mb-3"
                        allowClear
                        placeholder="Type your description"
                        value={description}
                        size="large"
                        autoSize={{ minRows: 3, maxRows: 3 }}
                        maxLength={150}
                        onChange={changeDescription}
                    />
                    <span className="pr-4">Choose a thumbnail image</span>
                    <Upload {...uploadProps}>
                        <Button className="thumbnail-upload-btn" icon={<UploadOutlined />}>
                            Upload
                        </Button>
                    </Upload>
                </div>
                <Button className="save-btn px-10 py-4 self-start" type="primary" onClick={handleSave}>
                    Save
                </Button>
            </div>
        </div>
    );
}
