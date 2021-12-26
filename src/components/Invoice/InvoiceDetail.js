import { Button, Descriptions, Input, Select, Space, Table } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { UPDATE_FIELD_INVOICE_EDITOR } from "../../constants/actionTypes";
import { ReactComponent as PaypalSvg } from "../../assets/paypal.svg";
import { ReactComponent as StripeSvg } from "../../assets/stripe.svg";
import { toLocaleStringCurrency } from "../../utils";

const renderPaymentMethod = paymentMethod => {
    switch (paymentMethod) {
        case "paypal":
            return <PaypalSvg />;
        case "stripe":
            return <StripeSvg />;
        default:
            return null;
    }
};

export default function InvoiceDetail({ invoice }) {
    const dispatch = useDispatch();
    const onUpdateField = (key, value) => {
        dispatch({
            type: UPDATE_FIELD_INVOICE_EDITOR,
            key,
            value
        });
    };

    const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);
    const showSaveModal = () => setIsSaveModalVisible(true);
    const closeSaveModal = () => setIsSaveModalVisible(false);

    const onStatusChange = value => onUpdateField("status", value);
    const onVoucherCodeChange = (productIndex, voucherIndex, value) => {
        const updatedInvoice = [...invoice.products];
        updatedInvoice[productIndex]["vouchers"][voucherIndex] = value;
        onUpdateField("products", updatedInvoice);
    };
    const handleSaveInvoice = () => {
        console.log(invoice);
    };

    const productColumns = [
        {
            title: "No.",
            key: "ordinal",
            width: 50,
            fixed: "left",
            ellipsis: true,
            render: (text, record, index) => index + 1
        },
        {
            title: "Product Name",
            dataIndex: "name",
            key: "name",
            width: 200,
            fixed: "left",
            ellipsis: true,
            textWrap: "word-break"
        },
        {
            title: "Listed Price",
            dataIndex: "listedPrice",
            key: "listedPrice",
            width: 100,
            ellipsis: true,
            align: "center",
            render: text => toLocaleStringCurrency(text)
        },
        {
            title: "Discount Price",
            dataIndex: "discountPrice",
            key: "discountPrice",
            width: 100,
            ellipsis: true,
            align: "center",
            render: text => toLocaleStringCurrency(text)
        },
        {
            title: "Qty.",
            dataIndex: "quantity",
            key: "quantity",
            width: 50,
            ellipsis: true,
            align: "center"
        },
        {
            title: "Subtotal",
            key: "subtotal",
            width: 120,
            align: "right",
            fixed: "right",
            render: (text, record) => {
                const { listedPrice, discountPrice, quantity } = record;
                const subtotal = discountPrice ? discountPrice * quantity : listedPrice * quantity;
                return toLocaleStringCurrency(subtotal);
            }
        }
    ];

    if (!invoice) return null;
    return (
        <div className="invoice-details">
            <div className="bg-white p-4 mb-4">
                <Descriptions labelStyle={{ fontWeight: "bold" }} className="overflow-auto" column={3} bordered>
                    <Descriptions.Item label="ID#">{invoice._id}</Descriptions.Item>
                    <Descriptions.Item label="Client">{invoice.user.displayname}</Descriptions.Item>
                    <Descriptions.Item label="Date">
                        {new Date(invoice.createdDate).toLocaleDateString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="Status" span={3}>
                        <Select className="w-40" value={invoice.status} onChange={onStatusChange}>
                            <Select.Option value="pending">Pending</Select.Option>
                            <Select.Option value="in_progress">In progress</Select.Option>
                            <Select.Option value="delivered">Delivered</Select.Option>
                            <Select.Option value="cancel">Cancel</Select.Option>
                        </Select>
                    </Descriptions.Item>
                    <Descriptions.Item label="Products" span={3}>
                        <Table
                            rowKey="_id"
                            dataSource={invoice.products}
                            columns={productColumns}
                            pagination={false}
                            scroll={{ x: 800 }}
                            expandable={{
                                expandedRowRender: (record, index) => {
                                    if (invoice.status !== "delivered") return null;
                                    const voucherInputs = [];
                                    for (let i = 0; i < record.quantity; i++) {
                                        voucherInputs.push(
                                            <Input
                                                key={i}
                                                value={record.vouchers?.[i]}
                                                className="mb-2 last:mb-0"
                                                placeholder="Enter voucher code here"
                                                onChange={e => onVoucherCodeChange(index, i, e.target.value)}
                                            />
                                        );
                                    }
                                    return voucherInputs;
                                }
                            }}
                        />
                        <span className="float-right pt-4 text-2xl">
                            <span className="font-bold text-2xl pr-8">Total:</span>
                            {toLocaleStringCurrency(invoice.discountTotal || invoice.total)}
                        </span>
                    </Descriptions.Item>
                    <Descriptions.Item label="Payment Info" span={3}>
                        <span className="inline-flex">
                            <span className="pr-4">Payment Method:</span> {renderPaymentMethod(invoice.paymentMethod)}
                        </span>
                    </Descriptions.Item>
                </Descriptions>
            </div>
            <Space size="large">
                <Button type="primary" onClick={showSaveModal}>
                    Save
                </Button>

                <Button>
                    <Link to="/invoice">Cancel</Link>
                </Button>
            </Space>

            <Modal title="Product" visible={isSaveModalVisible} onOk={handleSaveInvoice} onCancel={closeSaveModal}>
                Confirm to save product?
            </Modal>
        </div>
    );
}
