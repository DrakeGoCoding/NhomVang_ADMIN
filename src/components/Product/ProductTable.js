import { Button, Pagination, Space, Spin, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SET_PRODUCTLIST_PAGE } from "../../constants/actionTypes";

export default function ProductTable(props) {
    const dispatch = useDispatch();
    const { inProgress } = useSelector(state => state.productList);
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            fixed: "left",
            width: 150,
            ellipsis: true,
            textWrap: "word-break"
        },
        {
            title: "Supplier",
            dataIndex: "supplier",
            key: "supplier",
            width: 100,
            ellipsis: true,
            textWrap: "word-break"
        },
        {
            title: "Listed Price",
            dataIndex: "listedPrice",
            key: "listedPrice",
            width: 50,
            ellipsis: true,
            align: "center",
            render: text => text.toLocaleString("it-IT")
        },
        {
            title: "Discount Price",
            dataIndex: "discountPrice",
            key: "discountPrice",
            width: 50,
            ellipsis: true,
            align: "center",
            render: text => (text ? text.toLocaleString("it-IT") : "")
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
            width: 30,
            ellipsis: true,
            align: "center"
        },
        {
            title: "Action",
            key: "action",
            width: 100,
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary">Edit</Button>
                    <Button type="primary" danger>
                        Delete
                    </Button>
                </Space>
            ),
            align: "center",
            fixed: "right"
        }
    ];

    const changePage = pageNumber => {
        dispatch({
            type: SET_PRODUCTLIST_PAGE,
            page: pageNumber - 1,
            payload: props.pager(pageNumber - 1, props.filter)
        });
    };

    return (
        <div>
            <Table
                columns={columns}
                dataSource={props.productList}
                rowKey="name"
                pagination={false}
                loading={{ indicator: <Spin size="large" />, spinning: inProgress }}
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
