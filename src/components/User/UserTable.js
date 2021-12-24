import { Button, Pagination, Space, Spin, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SET_USERLIST_PAGE } from "../../constants/actionTypes";

export default function UserTable(props) {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.common);
    const columns = [
        {
            title: "User Name",
            dataIndex: "username",
            key: "username",
            fixed: "left",
            width: 150,
            ellipsis: true,
            textWrap: "word-break"
        },
        {
            title: "Display Name",
            dataIndex: "displayname",
            key: "displayname",
            width: 150,
            ellipsis: true,
            textWrap: "word-break"
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: 200,
            ellipsis: true,
            textWrap: "word-break"
        },
        {
            title: "Phone Number",
            dataIndex: "phonenumber",
            key: "phonenumber",
            width: 150,
            ellipsis: true,
            textWrap: "word-break",
            align: "center"
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
            width: 80,
            render: text => {
                let color = text === "admin" ? "geekblue" : "green";
                return <Tag color={color}>{text.toUpperCase()}</Tag>;
            },
            align: "center"
        },
        {
            title: "Action",
            key: "action",
            width: 150,
            render: (text, record) => (
                <Space size="middle">
                    {record.role === "admin" ? (
                        <>
                            <Button
                                disabled={record.username === "admin"}
                                type="primary"
                                onClick={e => props.showUserModal(e, "edit", record)}
                            >
                                Edit
                            </Button>
                            <Button
                                disabled={record.username === currentUser.username}
                                type="primary"
                                onClick={e => props.showUserModal(e, "delete", record)}
                                danger
                            >
                                Delete
                            </Button>
                        </>
                    ) : (
                        <Button type="primary" className="view-order-btn bg-green-400 text-white border-green-400">
                            <Link to={`/invoice?user=${record.username}`}>View Orders</Link>
                        </Button>
                    )}
                </Space>
            ),
            align: "center",
            fixed: "right"
        }
    ];

    const changePage = pageNumber => {
        dispatch({
            type: SET_USERLIST_PAGE,
            page: pageNumber - 1,
            payload: props.pager(pageNumber - 1, props.filter)
        });
    };

    return (
        <div>
            <Table
                columns={columns}
                dataSource={props.userList}
                rowKey="username"
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
