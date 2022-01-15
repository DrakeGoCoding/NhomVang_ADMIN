import {
  Button,
  Descriptions,
  Input,
  message,
  Select,
  Space,
  Table,
  Typography
} from "antd";
import Modal from "antd/lib/modal/Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  INVOICE_SUBMITTED,
  UPDATE_FIELD_INVOICE_EDITOR
} from "../../store/actions";
import { ReactComponent as PaypalSvg } from "../../assets/paypal.svg";
import { ReactComponent as StripeSvg } from "../../assets/stripe.svg";
import { toLocaleStringCurrency } from "../../utils";
import Invoice from "../../api/invoice.api";

const { Text } = Typography;

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
    render: text => <Text type="success">{toLocaleStringCurrency(text)}</Text>
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
      const subtotal = discountPrice
        ? discountPrice * quantity
        : listedPrice * quantity;
      return toLocaleStringCurrency(subtotal);
    }
  }
];

export default function InvoiceDetail({ invoice, disabled }) {
  const dispatch = useDispatch();
  const onUpdateField = (key, value) => {
    dispatch({
      type: UPDATE_FIELD_INVOICE_EDITOR,
      key,
      value
    });
  };

  const [status, setStatus] = useState(invoice.status || "pending");
  const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);
  const showSaveModal = () => {
    if (status === "delivered") {
      const isValidInvoice = invoice.products.every(product => {
        return (
          product.vouchers.length === product.quantity &&
          product.vouchers.every(voucher => {
            return voucher && voucher.trim().length > 0;
          })
        );
      });
      if (!isValidInvoice) {
        message.error({ content: "Please fill in all voucher codes." });
        return;
      }
    }
    setIsSaveModalVisible(true);
  };
  const closeSaveModal = () => setIsSaveModalVisible(false);

  const onStatusChange = value => setStatus(value);
  const onVoucherCodeChange = (productIndex, voucherIndex, value) => {
    const updatedInvoice = [...invoice.products];
    updatedInvoice[productIndex]["vouchers"][voucherIndex] = value;
    onUpdateField("products", updatedInvoice);
  };
  const handleSaveInvoice = () => {
    dispatch({
      type: INVOICE_SUBMITTED,
      payload: Invoice.update({ ...invoice, status })
    });
    closeSaveModal();
  };

  if (!invoice) return null;
  return (
    <div className="invoice-details">
      <div className="bg-white p-4 mb-4">
        <Descriptions
          labelStyle={{ fontWeight: "bold" }}
          className="overflow-auto"
          column={3}
          bordered
        >
          <Descriptions.Item label="ID#">{invoice._id}</Descriptions.Item>
          <Descriptions.Item label="Client">
            {invoice.user.displayname}
          </Descriptions.Item>
          <Descriptions.Item label="Date">
            {new Date(invoice.createdDate).toDateString()}
          </Descriptions.Item>
          <Descriptions.Item label="Status" span={3}>
            <Select
              disabled={disabled}
              className="w-40"
              value={status}
              onChange={onStatusChange}
            >
              <Select.Option disabled value="pending">
                Pending
              </Select.Option>
              <Select.Option disabled value="in_progress">
                In progress
              </Select.Option>
              <Select.Option
                disabled={invoice.paymentStatus !== "done"}
                value="delivered"
              >
                Delivered
              </Select.Option>
              <Select.Option value="failed">Failed</Select.Option>
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
                  if (status !== "delivered") return null;
                  const voucherInputs = [];
                  for (let i = 0; i < record.quantity; i++) {
                    voucherInputs.push(
                      <Input
                        key={i}
                        value={record.vouchers?.[i]}
                        className="mb-2 last:mb-0"
                        disabled={disabled}
                        placeholder="Enter voucher code here"
                        onChange={e =>
                          onVoucherCodeChange(index, i, e.target.value)
                        }
                      />
                    );
                  }
                  return voucherInputs;
                }
              }}
            />
            <span className="float-right flex items-center pt-4 text-2xl">
              <span className="font-bold text-2xl pr-8">Total:</span>
              <div className="flex flex-col text-right">
                <Text
                  className="text-2xl"
                  delete={invoice.discountTotal < invoice.total}
                >
                  {toLocaleStringCurrency(invoice.discountTotal)}
                </Text>
                {invoice.discountTotal < invoice.total && (
                  <Text className="text-2xl" type="success">
                    {toLocaleStringCurrency(invoice.discountTotal)}
                  </Text>
                )}
              </div>
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="Payment Info" span={3}>
            <span className="inline-flex mb-2">
              <span className="pr-4">Status:</span> {invoice.paymentStatus}
            </span>
            <br />
            <span className="inline-flex">
              <span className="pr-4">Method:</span>{" "}
              {renderPaymentMethod(invoice.paymentMethod)}
            </span>
          </Descriptions.Item>
        </Descriptions>
      </div>
      <Space className="float-right" size="middle">
        <Button size="large">
          <Link to="/invoices">{disabled ? "Back" : "Cancel"}</Link>
        </Button>
        <Button
          disabled={disabled || !["delivered", "failed"].includes(status)}
          size="large"
          type="primary"
          onClick={showSaveModal}
        >
          Save
        </Button>
      </Space>

      <Modal
        title="Invoice"
        visible={isSaveModalVisible}
        onOk={handleSaveInvoice}
        onCancel={closeSaveModal}
      >
        Confirm to save invoice?
      </Modal>
    </div>
  );
}
