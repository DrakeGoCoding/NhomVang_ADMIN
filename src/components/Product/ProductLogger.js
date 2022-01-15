import { Table, Tag, Timeline, Typography } from "antd";

const { Text } = Typography;

export default function ProductLogger({ product }) {
  const renderAction = log => {
    switch (log.action) {
      case "create":
        return (
          <span>
            created product <Text strong>{product._id}</Text>
          </span>
        );

      case "update":
        return (
          <span>
            updated product <Text strong>{product._id}</Text>
          </span>
        );

      default:
        break;
    }
  };

  const renderUpdateDetails = details => {
    const columns = [
      {
        title: "Field",
        dataIndex: "field",
        key: "field"
      },
      {
        title: "From",
        dataIndex: "prevValue",
        key: "prevValue",
        align: "center",
        render: (text, record) =>
          text && <Tag color="error">{text.toString()}</Tag>
      },
      {
        title: "To",
        dataIndex: "nextValue",
        key: "nextValue",
        align: "center",
        render: (text, record) =>
          text && <Tag color="success">{text.toString()}</Tag>
      }
    ];
    return (
      <Table
        className="w-max max-w-full"
        rowKey="field"
        columns={columns}
        dataSource={details}
        pagination={false}
      ></Table>
    );
  };

  return (
    <Timeline>
      {product.logs.reverse().map((log, index) => (
        <Timeline.Item
          key={index}
          color={log.action === "delete" ? "red" : "green"}
        >
          User <Text strong>{log.user}</Text> {renderAction(log)} on{" "}
          <Text strong>{new Date(log.timestamp).toLocaleString()}</Text>.
          {log.action === "update" && renderUpdateDetails(log.details)}
        </Timeline.Item>
      ))}
    </Timeline>
  );
}
