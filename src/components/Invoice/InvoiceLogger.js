import { Timeline, Typography } from "antd";

const { Text } = Typography;

export default function InvoiceLogger({ invoice }) {
    const renderAction = log => {
        switch (log.action) {
            case "create":
                return (
                    <span>
                        created invoice <Text strong>{invoice._id}</Text>
                    </span>
                );

            case "change_status":
                return (
                    <span>
                        updated status from <Text strong>{log.prevStatus}</Text> to <Text strong>{log.nextStatus}</Text>{" "}
                    </span>
                );

            case "cancel":
                return (
                    <span>
                        cancelled invoice <Text strong>{invoice._id}</Text>
                    </span>
                );

            default:
                break;
        }
    };

    return (
        <Timeline>
            {invoice.logs.reverse().map((log, index) => (
                <Timeline.Item key={index} color={log.action === "cancel" ? "red" : "green"}>
                    User <Text strong>{log.user}</Text> {renderAction(log)} on{" "}
                    <Text strong>{new Date(log.timestamp).toLocaleString()}</Text>.
                </Timeline.Item>
            ))}
        </Timeline>
    );
}
