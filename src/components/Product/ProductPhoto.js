import { Button, Form, Upload } from "antd";
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { UPDATE_FIELD_PRODUCT_EDITOR } from "../../store/actions";
import { useState } from "react";
import { beforeUploadImage } from "../../utils";

export default function ProductPhoto({ thumbnail, photos }) {
  const dispatch = useDispatch();
  const onUpdateField = (key, value) => {
    dispatch({ type: UPDATE_FIELD_PRODUCT_EDITOR, key, value });
  };

  const [isUploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [isUploadingPhoto, setUploadingPhoto] = useState(false);

  const addThumbnail = value => onUpdateField("thumbnail", value);
  const removeThumbnail = file => onUpdateField("thumbnail", "");

  const addPhoto = url => {
    onUpdateField("photos", [...photos, url]);
  };
  const removePhoto = file => {
    let updatedPhotos = [...photos];
    updatedPhotos.splice(file.uid, 1);
    onUpdateField("photos", updatedPhotos);
  };

  return (
    <Form
      labelCol={{ xs: { span: 24 }, sm: { span: 6 } }}
      labelAlign="left"
      wrapperCol={{ xs: { span: 24 }, sm: { span: 20 } }}
      size="large"
      colon={false}
      style={{ maxWidth: 700, minWidth: 200 }}
    >
      <Form.Item label="Thumbnail" required={true}>
        <Upload
          listType="picture"
          maxCount={1}
          accept="image/*"
          fileList={
            thumbnail
              ? [
                  {
                    uid: "-1",
                    status: "done",
                    name: "thumbnail.png",
                    url: thumbnail
                  }
                ]
              : []
          }
          beforeUpload={file =>
            beforeUploadImage(file, addThumbnail, setUploadingThumbnail)
          }
          onRemove={removeThumbnail}
        >
          <Button
            className="flex items-center"
            icon={
              isUploadingThumbnail ? <LoadingOutlined /> : <UploadOutlined />
            }
          >
            Upload thumbnail
          </Button>
        </Upload>
      </Form.Item>

      <Form.Item label="Other photos">
        <Upload
          listType="picture-card"
          accept="image/*"
          fileList={photos.map((photo, index) => ({
            uid: index,
            status: "done",
            url: photo
          }))}
          beforeUpload={file =>
            beforeUploadImage(file, addPhoto, setUploadingPhoto)
          }
          onRemove={removePhoto}
        >
          <div>
            {isUploadingPhoto ? <LoadingOutlined /> : <PlusOutlined />}
            <div className="mt-2">Upload</div>
          </div>
        </Upload>
      </Form.Item>
    </Form>
  );
}
