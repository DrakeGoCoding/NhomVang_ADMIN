import { Button, Pagination, Space, Spin, Table, Tag } from "antd";
import { useDispatch } from "react-redux";
import { SET_INVOICELIST_PAGE } from "../../constants/actionTypes";

export default function InvoiceTable(props) {
    const dispatch = useDispatch();
    const columns = [
        {
            title: "User",
            dataIndex: "user",
            key: "user",
            fixed: "left",
            width: 80,
            ellipsis: true,
            textWrap: "word-break",
            render: (text, record) => record.user.username
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: 50,
            align: "center",
            render: text => {
                let color;
                switch (text) {
                    case "in_progress":
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
            align: "right"
        },
        {
            title: "Discount",
            dataIndex: "discountTotal",
            key: "discountTotal",
            width: 80,
            align: "right"
        },
        {
            title: "Payment Status",
            dataIndex: "paymentStatus",
            key: "paymentStatus",
            width: 50,
            align: "center",
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
            width: 50,
            align: "center",
            fixed: "right",
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary">Edit</Button>
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
