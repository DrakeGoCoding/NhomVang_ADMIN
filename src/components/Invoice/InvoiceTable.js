import { Button, Pagination, Space, Spin, Table, Tag } from "antd";
import { ReactComponent as PaypalSvg } from "../../assets/paypal.svg";
import { ReactComponent as StripeSvg } from "../../assets/stripe.svg";
import { useDispatch } from "react-redux";
import { SET_INVOICELIST_PAGE } from "../../constants/actionTypes";
import { Link } from "react-router-dom";

const PaypalIcon = () => <PaypalSvg className="w-full" />;
const StripeIcon = () => <StripeSvg className="w-full" />;

export default function InvoiceTable(props) {
    const dispatch = useDispatch();
    const columns = [
        {
            title: "Client",
            dataIndex: "user",
            key: "user",
            fixed: "left",
            width: 80,
            ellipsis: true,
            textWrap: "word-break",
            sorter: (a, b) => a.user.username.localeCompare(b.user.username),
            render: (text, record) => record.user.username
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: 50,
            align: "center",
            filters: [
                {
                    text: "pending",
                    value: "pending"
                },
                {
                    text: "in progress",
                    value: "in_progress"
                },
                {
                    text: "delivered",
                    value: "delivered"
                },
                {
                    text: "failed",
                    value: "failed"
                }
            ],
            onFilter: (value, record) => record.status.indexOf(value) === 0,
            render: text => {
                let color;
                switch (text) {
                    case "in_progress":
                        color = "blue";
                        break;
                    case "delivered":
                        color = "success";
                        break;
                    case "failed":
                        color = "error";
                        break;
                    default:
                        color = "geekblue";
                        break;
                }
                return <Tag color={color}>{text.toUpperCase()}</Tag>;
            }
        },
        {
            title: "Total",
            dataIndex: "total",
            key: "total",
            width: 80,
            align: "right",
            sorter: (a, b) => a.total - b.total
        },
        {
            title: "Discount Total",
            dataIndex: "discountTotal",
            key: "discountTotal",
            width: 80,
            align: "right",
            sorter: (a, b) => a.discountTotal - b.discountTotal
        },
        {
            title: "Payment Method",
            dataIndex: "paymentMethod",
            key: "paymentMethod",
            width: 50,
            align: "center",
            render: text => {
                switch (text) {
                    case "paypal":
                        return <PaypalIcon />;
                    case "stripe":
                        return <StripeIcon />;
                    default:
                        break;
                }
            }
        },
        {
            title: "Payment Status",
            dataIndex: "paymentStatus",
            key: "paymentStatus",
            width: 50,
            align: "center",
            filters: [
                {
                    text: "pending",
                    value: "pending"
                },
                {
                    text: "done",
                    value: "done"
                },
                {
                    text: "cancel",
                    value: "cancel"
                }
            ],
            onFilter: (value, record) => record.paymentStatus.indexOf(value) === 0,
            render: text => {
                let color;
                switch (text) {
                    case "done":
                        color = "success";
                        break;
                    case "cancel":
                        color = "error";
                        break;
                    default:
                        color = "geekblue";
                        break;
                }
                return <Tag color={color}>{text.toUpperCase()}</Tag>;
            }
        },
        {
            title: "Action",
            key: "action",
            width: 70,
            align: "center",
            fixed: "right",
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary">
                        <Link to={`/invoice/${record._id}`}>View</Link>
                    </Button>
                    <Button type="primary" danger>
                        Cancel
                    </Button>
                </Space>
            )
        }
    ];

    const changePage = pageNumber => {
        dispatch({
            type: SET_INVOICELIST_PAGE,
            page: pageNumber - 1,
            payload: props.pager(pageNumber - 1, props.filter)
        });
    };

    return (
        <div>
            <Table
                columns={columns}
                dataSource={props.invoiceList}
                rowKey="_id"
                pagination={false}
                showSorterTooltip={false}
                loading={{ indicator: <Spin size="large" />, spinning: props.inProgress }}
                scroll={{ x: 1500, y: 670 }}
            />
            {props.total > 0 ? (
                <Pagination
                    className="flex items-center mt-4"
                    defaultCurrent={1}
                    current={props.currentPage}
                    pageSize={props.pageSize}
                    total={props.total}
                    onChange={changePage}
                />
            ) : null}
        </div>
    );
}
