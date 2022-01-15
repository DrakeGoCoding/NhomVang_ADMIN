import { useEffect, useState } from "react";
import { Button, Form, Input, Modal, message, Space, Typography } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "@drakegocoding/ckeditor5-custom-build";
import UploadAdapterPlugin from "../Common/ckeditor/UploadAdapter";
import Newsletter from "../../api/newsletter.api";
import { useSelector } from "react-redux";
import { store } from "../../store";
import {
  NEWSLETTER_PAGE_LOADED,
  NEWSLETTER_PAGE_UNLOADED,
  UPDATE_FIELD_NEWSLETTER_EDITOR
} from "../../store/actions";
import User from "../../api/user.api";
import { useNavigate, useParams } from "react-router-dom";

const { Link } = Typography;

export default function NewsletterEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, subscriberCount } = useSelector(state => state.newsletter);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  const onLoad = payload => {
    store.dispatch({
      type: NEWSLETTER_PAGE_LOADED,
      payload
    });
  };
  const onUnload = () => store.dispatch({ type: NEWSLETTER_PAGE_UNLOADED });
  const onUpdateField = (key, value) =>
    store.dispatch({ type: UPDATE_FIELD_NEWSLETTER_EDITOR, key, value });

  const changeSubject = e => onUpdateField("subject", e.target.value);
  const changeContent = (event, editor) => {
    const content = editor.getData();
    onUpdateField("content", content);
  };

  const showModal = () => {
    if (!data.content) {
      message.error({ content: "Newsletter content is required" });
    } else {
      setIsModalVisible(true);
    }
  };
  const closeModal = () => setIsModalVisible(false);

  const handleSendNewsletter = async () => {
    try {
      setInProgress(true);
      await Newsletter.send(data.subject, data.content);
      message.success({ content: "Sent successfully." });
      navigate("/newsletters");
    } catch (error) {
      message.error({ content: error.message || error.response.data.message });
    } finally {
      setInProgress(false);
      closeModal();
    }
  };

  useEffect(() => {
    onLoad(
      Promise.all([User.countSubscribers(), id ? Newsletter.getById(id) : null])
    );
  }, [id]);

  useEffect(() => {
    return () => onUnload();
  }, []);

  return (
    <div className="newsletter-editor">
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
            value={data.subject}
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
            data={data.content}
            onChange={changeContent}
          />
        </Form.Item>
      </Form>

      <Space className="float-right">
        <Button disabled={inProgress} type="primary" onClick={showModal}>
          {id ? "Resend" : "Send"}
        </Button>
      </Space>

      <Modal
        title="Newsletter"
        visible={isModalVisible}
        onOk={handleSendNewsletter}
        onCancel={closeModal}
      >
        <div>
          Confirm to send this newsletter to all subscribers? (Estimate{" "}
          <Link>{subscriberCount}</Link>)
        </div>
      </Modal>
    </div>
  );
}
