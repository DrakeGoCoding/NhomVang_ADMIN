import { Button, Empty, Pagination, Skeleton, Space, Table, Tag } from "antd";
import moment from "moment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SET_USERLIST_PAGE } from "../../constants/actionTypes";
import { store } from "../../store";

export default function UserTable({ showEditUserModal, showDeleteUserModal }) {
    const { currentUser } = useSelector(state => state.common);
    const { userList, currentPage, role, regex, total, pager, inProgress } = useSelector(state => state.userList);
    const pageSize = 10;
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
            width: 250,
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
            title: "Date of birth",
            dataIndex: "dob",
            key: "dob",
            width: 150,
            render: text => moment(text).format("DD/MM/YYYY") || "",
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
            align: "center",
            fixed: "right"
        },
        {
            title: "Action",
            key: "action",
            width: 150,
            render: (text, record) => (
                <Space size="middle">
                    {record.role === "admin" ? (
                        <>
                            <Button type="primary" onClick={() => showEditUserModal(record)}>
                                Edit
                            </Button>
                            <Button
                                disabled={record.username === currentUser.username}
                                type="primary"
                                onClick={() => showDeleteUserModal(record)}
                                danger
                            >
                                Delete
                            </Button>
                        </>
                    ) : (
                        <Button type="primary" className="view-order-btn bg-green-400 text-white border-green-400">
                            <Link to={`/order/${record.username}`}>View Order</Link>
                        </Button>
                    )}
                </Space>
            ),
            align: "center",
            fixed: "right"
        }
    ];

    const changePage = pageNumber => {
        store.dispatch({
            type: SET_USERLIST_PAGE,
            page: pageNumber - 1,
            payload: pager(pageNumber - 1, role, regex)
        });
    };

    return (
        <div>
            <Table
                columns={columns}
                dataSource={userList}
                rowKey="username"
                pagination={false}
                scroll={{ x: 1500, y: 670 }}
                locale={{
                    emptyText: inProgress ? <Skeleton active={true} /> : <Empty />
                }}
            />
            {total > 0 ? (
                <Pagination
                    className="flex items-center mt-4"
                    defaultCurrent={1}
                    current={currentPage + 1}
                    pageSize={pageSize}
                    total={total}
                    onChange={changePage}
                />
            ) : null}
        </div>
    );
}
