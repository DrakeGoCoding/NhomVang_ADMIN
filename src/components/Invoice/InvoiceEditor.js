import { Spin, Tabs } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Invoice from "../../api/invoice.api";
import { INVOICE_PAGE_LOADED, INVOICE_PAGE_UNLOADED } from "../../constants/actionTypes";
import { store } from "../../store";
import InvoiceDetail from "./InvoiceDetail";
import InvoiceLogger from "./InvoiceLogger";

export default function InvoiceEditor() {
    const { id } = useParams();
    const { data, inProgress } = useSelector(state => state.invoice);

    const [currentTab, setCurrentTab] = useState("details");

    const onLoad = payload => {
        store.dispatch({
            type: INVOICE_PAGE_LOADED,
            payload
        });
    };
    const onUnload = () => {
        store.dispatch({ type: INVOICE_PAGE_UNLOADED });
    };

    const changeTab = activeKey => setCurrentTab(activeKey);

    useEffect(() => {
        onLoad(id ? Invoice.getById(id) : null);
    }, [id]);

    useEffect(() => {
        return () => {
            onUnload();
        };
    }, []);

    return (
        <div className="invoice-editor">
            <Tabs type="card" className="mb-4" activeKey={currentTab} defaultActiveKey="details" onChange={changeTab}>
                <Tabs.TabPane tab="Details" key="details">
                    {inProgress ? <Spin size="large" /> : <InvoiceDetail invoice={data} />}
                </Tabs.TabPane>
                <Tabs.TabPane tab="Logs" key="logs">
                    {inProgress ? <Spin size="large" /> : <InvoiceLogger invoice={data} />}
                </Tabs.TabPane>
            </Tabs>
        </div>
    );
}
