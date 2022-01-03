import { Button, message, Pagination, Popconfirm, Space, Spin, Table } from "antd";
import { QuestionCircleFilled } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Newsletter from "../../api/newsletter.api";
import { SET_NEWSLETTERLIST_PAGE } from "../../store/actions";

export default function NewsletterHistory(props) {
    const dispatch = useDispatch();

    const onResend = async newsletter => {
        try {
            await Newsletter.send(newsletter.subject, newsletter.content);
            message.success({ content: "Resent successfully." });
            props.onReload();
        } catch (error) {
            message.error({ content: error.message || error.response.data.message });
        }
    };

    const columns = [
        {
            title: "Sender",
            dataIndex: "sender",
            key: "sender",
            width: 80,
            fixed: "left",
            ellipsis: true,
            textWrap: "word-break",
            render: (text, record) => record.sender.displayname,
            sorter: (a, b) => a.sender.displayname.localeCompare(b.sender.displayname)
        },
        {
            title: "Subject",
            dataIndex: "subject",
            key: "subject",
            width: 200,
            ellipsis: true,
            textWrap: "word-break",
            sorter: (a, b) => a.subject.localeCompare(b.subject)
        },
        {
            title: "Date",
            dataIndex: "createdDate",
            key: "createdDate",
            width: 100,
            render: text => new Date(text).toDateString(),
            sorter: (a, b) => new Date(a.createdDate) - new Date(b.createdDate)
        },
        {
            title: "Action",
            key: "action",
            width: 80,
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary" className="view-newsletter-btn bg-green-400 text-white border-green-400">
                        <Link to={`/newsletters/edit/${record._id}`}>View</Link>
                    </Button>
                    <Popconfirm
                        title="Confirm to resend this newsletter?"
                        onConfirm={() => onResend(record)}
                        okText="Yes"
                        cancelText="No"
                        placement="topRight"
                        icon={<QuestionCircleFilled style={{ color: "#1890ff" }} />}
                    >
                        <Button type="primary">Resend</Button>
                    </Popconfirm>
                </Space>
            ),
            align: "center",
            fixed: "right"
        }
    ];

    const changePage = pageNumber => {
        dispatch({
            type: SET_NEWSLETTERLIST_PAGE,
            page: pageNumber - 1,
            payload: props.pager(pageNumber - 1)
        });
    };

    return (
        <div>
            <Table
                columns={columns}
                dataSource={props.newsletterList}
                rowKey="_id"
                pagination={false}
                showSorterTooltip={false}
                loading={{ indicator: <Spin size="large" />, spinning: props.inProgress }}
                scroll={{ x: 1500, y: 670 }}
            />
            {props.total > 0 && (
                <Pagination
                    className="flex items-center mt-4"
                    defaultCurrent={1}
                    current={props.currentPage}
                    pageSize={props.pageSize}
                    total={props.total}
                    onChange={changePage}
                />
            )}
        </div>
    );
}
