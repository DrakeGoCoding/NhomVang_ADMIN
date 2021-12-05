import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "@drakegocoding/ckeditor5-custom-build";
import { useDispatch } from "react-redux";
import { UPDATE_FIELD_PRODUCT_EDITOR } from "../../constants/actionTypes";
import UploadAdapterPlugin from "../Common/ckeditor/UploadAdapter";

export default function ProductDescriptor({ description }) {
    const dispatch = useDispatch();
    const changeDescription = (event, editor) => {
        dispatch({
            type: UPDATE_FIELD_PRODUCT_EDITOR,
            key: "description",
            value: editor.getData()
        });
    };

    return (
        <div className="product-descriptor">
            <CKEditor
                editor={Editor}
                config={{
                    extraPlugins: [UploadAdapterPlugin],
                    removePlugins: ["Title"]
                }}
                data={description}
                onChange={changeDescription}
            />
        </div>
    );
}
