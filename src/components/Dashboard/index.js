import {
  Col,
  DatePicker,
  Divider,
  Row,
  Spin,
  Statistic,
  Table,
  Typography
} from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  BarElement
} from "chart.js";
import moment from "moment";
import { useEffect, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import Invoice from "../../api/invoice.api";
import User from "../../api/user.api";
import { store } from "../../store";
import { DASHBOARD_LOADED, DASHBOARD_UNLOADED } from "../../store/actions";
import { toLocaleStringCurrency } from "../../utils";

const { Text, Title } = Typography;
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);
const chartOptions = {
  responsive: true,
  plugins: {},
  scales: {
    y: {
      ticks: {
        callback: function (value, index) {
          return "$" + value / 1000 + "K";
        }
      }
    }
  }
};

export default function Dashboard() {
  const {
    monthlyProfit,
    topClientList,
    totalInvoiced,
    totalReceived,
    totalClients,
    inProgress
  } = useSelector(state => state.dashboard);

  const onLoad = payload => {
    store.dispatch({ type: DASHBOARD_LOADED, payload });
  };
  const onUnload = () => {
    store.dispatch({ type: DASHBOARD_UNLOADED });
  };

  const profitData = useMemo(() => {
    const labels = moment.monthsShort();
    return {
      labels,
      datasets: [
        {
          label: "Total invoiced",
          data: monthlyProfit,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)"
        }
      ]
    };
  }, [monthlyProfit]);

  const columns = [
    {
      title: "No.",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1
    },
    {
      title: "User Name",
      dataIndex: "username",
      key: "username"
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      align: "center",
      render: (text, record) => toLocaleStringCurrency(text)
    }
  ];

  const handleChangeYear = (date, dateString) => {
    onLoad(Promise.all([Invoice.getMonthlyProfit(dateString)]));
  };

  useEffect(() => {
    onLoad(
      Promise.all([
        Invoice.getMonthlyProfit(moment().year()),
        Invoice.getTopSpendingClients(),
        Invoice.getSummary(),
        User.countClients()
      ])
    );
    return () => onUnload();
  }, []);

  return (
    <div>
      <div className="bg-white px-6 pb-4 mb-6">
        <Row>
          <Title level={3}>SUMMARY</Title>
        </Row>
        <Divider className="mt-0 mb-4" />
        <Row gutter={[8, 0]}>
          <Col span={24} md={8}>
            <Statistic
              title={
                <Text className="font-semibold text-xl">Total Invoiced</Text>
              }
              value={totalInvoiced}
              loading={inProgress}
              formatter={value => (
                <Title level={3} type="warning">
                  {toLocaleStringCurrency(value)}
                </Title>
              )}
            />
          </Col>
          <Col span={24} md={8}>
            <Statistic
              title={
                <Text className="font-semibold text-xl">Total Received</Text>
              }
              value={totalReceived}
              loading={inProgress}
              formatter={value => (
                <Title level={3} type="success">
                  {toLocaleStringCurrency(value)}
                </Title>
              )}
            />
          </Col>
          <Col span={24} md={8}>
            <Statistic
              title={
                <Text className="font-semibold text-xl">Total Clients</Text>
              }
              value={totalClients}
              loading={inProgress}
              formatter={value => (
                <Title level={3} type="danger">
                  {value}
                </Title>
              )}
            />
          </Col>
        </Row>
      </div>
      <Row>
        <Col className="bg-white px-6 pb-4" span={24} xxl={16}>
          <Row justify="space-between" align="middle">
            <Title level={3}>PROFIT</Title>
            <DatePicker
              className="h-max"
              onChange={handleChangeYear}
              picker="year"
            />
          </Row>
          <Divider className="mt-0 mb-4" />
          <Row>
            {inProgress ? (
              <div className="w-full text-center">
                <Spin size="large" />
              </div>
            ) : (
              <Bar options={chartOptions} data={profitData} />
            )}
          </Row>
        </Col>
        <Col className="bg-white px-6 pb-4" span={24} xxl={8}>
          <Row>
            <Title level={3}>TOP CLIENTS</Title>
          </Row>
          <Divider className="mt-0 mb-4" />
          <Row>
            <Table
              className="w-full"
              rowKey="username"
              columns={columns}
              dataSource={topClientList}
              loading={inProgress}
              pagination={false}
              showSorterTooltip={false}
            />
          </Row>
        </Col>
      </Row>
    </div>
  );
}
