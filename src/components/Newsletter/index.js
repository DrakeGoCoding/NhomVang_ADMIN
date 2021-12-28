import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "@drakegocoding/ckeditor5-custom-build";
import UploadAdapterPlugin from "../Common/ckeditor/UploadAdapter";
import "../../style/newsletter.css";
import { Button, Form, Input, message, Space } from "antd";
import Modal from "antd/lib/modal/Modal";
import Newsletter from "../../api/newsletter.api";

export default function NewsletterPage() {
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [inProgress, setInProgress] = useState(false);

    const changeSubject = e => setSubject(e.target.value);
    const changeContent = (event, editor) => {
        const content = editor.getData();
        setContent(content);
    };

    const showModal = () => {
        if (!content) {
            message.error({ content: "Newsletter content is required" });
        } else {
            setIsModalVisible(true);
        }
    };
    const closeModal = () => setIsModalVisible(false);

    const handleSendNewsletter = async () => {
        try {
            setInProgress(true);
            await Newsletter.send(subject, content);
            message.success({ content: "Sent successfully." });
        } catch (error) {
            message.error({ content: error.response.data.message });
        } finally {
            setInProgress(false);
            closeModal();
        }
    };

    return (
        <div className="newsletter-page">
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
                        placeholder="Type subject here"
                        value={subject}
                        maxLength={100}
                        size="middle"
                        autoSize={{ minRows: 1, maxRows: 1 }}
                        allowClear
                        onChange={changeSubject}
                    />
                </Form.Item>
                <Form.Item>
                    <CKEditor
                        editor={Editor}
                        config={{
                            placeholder: "Type content here (required)",
                            extraPlugins: [UploadAdapterPlugin],
                            removePlugins: ["Title"]
                        }}
                        data={content}
                        onChange={changeContent}
                    />
                </Form.Item>
            </Form>

            <Space>
                <Button disabled={inProgress} type="primary" onClick={showModal}>
                    Send
                </Button>
            </Space>

            <Modal title="Newsletter" visible={isModalVisible} onOk={handleSendNewsletter} onCancel={closeModal}>
                Confirm to send this newsletter to all subscribers?
            </Modal>
        </div>
    );
}
