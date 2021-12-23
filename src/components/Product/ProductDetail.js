import { Checkbox, Form, Input, InputNumber, Space, Tag } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UPDATE_FIELD_PRODUCT_EDITOR } from "../../constants/actionTypes";
import { isStringInArray } from "../../utils";

const formItems = [
    {
        props: {
            label: "Product Name",
            name: "name",
            required: true
        },
        component: <Input />
    },
    {
        props: {
            label: "Supplier",
            name: "supplier",
            required: true
        },
        component: <Input />
    },
    {
        props: {
            label: "Listed Price",
            name: "listedPrice",
            required: true
        },
        component: (
            <InputNumber
                step={5}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={value => value.replace(/\$\s?|(,*)/g, "")}
                addonAfter="$"
                min={0}
            />
        )
    },
    {
        props: {
            label: "Discount Price",
            name: "discountPrice"
        },
        component: (
            <InputNumber
                step={5}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={value => value.replace(/\$\s?|(,*)/g, "")}
                addonAfter="$"
                min={0}
            />
        )
    },
    {
        props: {
            label: "In Stock",
            name: "inStock"
        },
        component: <InputNumber min={0} />
    },
    {
        props: {
            label: "Feature"
        },
        component: (
            <Space className="flex" size="large">
                <Form.Item className="mb-0" name="isHot" valuePropName="checked">
                    <Checkbox>Hot</Checkbox>
                </Form.Item>
                <Form.Item className="mb-0" name="isInSlider" valuePropName="checked">
                    <Checkbox>In slider</Checkbox>
                </Form.Item>
            </Space>
        )
    }
];

export default function ProductDetail({ product }) {
    const dispatch = useDispatch();
    const onUpdateField = (key, value) => {
        dispatch({ type: UPDATE_FIELD_PRODUCT_EDITOR, key, value });
    };

    const [form] = Form.useForm();
    const [tagInput, setTagInput] = useState("");

    const onTagInputChange = e => setTagInput(e.target.value);
    const addTag = e => {
        e.preventDefault();
        const lowerCaseTag = tagInput.toLocaleLowerCase();
        if (!isStringInArray(product.tags, lowerCaseTag)) {
            onUpdateField("tags", [...product.tags, lowerCaseTag]);
        }
        setTagInput("");
    };

    const removeTag = index => {
        const newTagList = [...product.tags];
        newTagList.splice(index, 1);
        onUpdateField("tags", newTagList);
    };

    const updateValue = changedValues => {
        Object.keys(changedValues).map(key => onUpdateField(key, changedValues[key]));
    };

    useEffect(() => form.setFieldsValue(product), [product, form]);

    return (
        <Form
            form={form}
            labelCol={{ xs: { span: 24 }, sm: { span: 6 } }}
            labelAlign="left"
            wrapperCol={{ xs: { span: 24 }, sm: { span: 20 } }}
            name="productForm"
            size="large"
            autoComplete="off"
            spellCheck="false"
            colon={false}
            initialValues={product}
            onValuesChange={updateValue}
            style={{ maxWidth: 700, minWidth: 200 }}
        >
            {formItems.map((item, index) => (
                <Form.Item key={index} {...item.props}>
                    {item.component}
                </Form.Item>
            ))}

            <Form.Item label="Tags">
                <Input value={tagInput} onChange={onTagInputChange} onPressEnter={addTag} />
                <div>
                    {product.tags.map((tag, index) => (
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
        </Form>
    );
}
