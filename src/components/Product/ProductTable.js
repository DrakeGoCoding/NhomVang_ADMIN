import { Button, Pagination, Space, Spin, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SET_PRODUCTLIST_PAGE } from "../../store/actions";
import "../../style/product.css";

export default function ProductTable(props) {
    const dispatch = useDispatch();
    const { inProgress } = useSelector(state => state.productList);

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            fixed: "left",
            width: 100,
            ellipsis: true,
            textWrap: "word-break",
            sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
            title: "Supplier",
            dataIndex: "supplier",
            key: "supplier",
            width: 100,
            ellipsis: true,
            textWrap: "word-break",
            sorter: (a, b) => a.supplier.localeCompare(b.supplier)
        },
        {
            title: "In Stock",
            dataIndex: "inStock",
            key: "inStock",
            width: 40,
            align: "center",
            sorter: (a, b) => a.inStock - b.inStock
        },
        {
            title: "Feature",
            dataIndex: "feature",
            key: "feature",
            width: 60,
            align: "center",
            render: (text, record) => (
                <div>
                    {record.isHot ? <Tag color="volcano">HOT</Tag> : null}
                    {record.isInSlider ? <Tag color="cyan">SLIDER</Tag> : null}
                </div>
            )
        },
        {
            title: "Tags",
            dataIndex: "tags",
            key: "tags",
            width: 80,
            align: "center",
            render: (text, record) => (
                <Space direction="vertical">
                    {record.tags.map((tag, index) => (
                        <Tag key={index} color="processing">
                            {tag.toUpperCase()}
                        </Tag>
                    ))}
                </Space>
            )
        },
        {
            title: "Listed Price",
            dataIndex: "listedPrice",
            key: "listedPrice",
            width: 60,
            align: "right",
            sorter: (a, b) => a.listedPrice - b.listedPrice,
            render: text => (text ? text.toFixed(2).toLocaleString("en-US") : "")
        },
        {
            title: "Discount Price",
            dataIndex: "discountPrice",
            key: "discountPrice",
            width: 60,
            align: "right",
            sorter: (a, b) => a.discountPrice - b.discountPrice,
            render: text => (text ? text.toFixed(2).toLocaleString("en-US") : "")
        },
        {
            title: "Action",
            key: "action",
            width: 90,
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary">
                        <Link to={`/product/edit/${record.slug}`}>Edit</Link>
                    </Button>
                    <Button type="primary" danger onClick={() => props.showDeleteUserModal(record.slug)}>
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
                showSorterTooltip={false}
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
