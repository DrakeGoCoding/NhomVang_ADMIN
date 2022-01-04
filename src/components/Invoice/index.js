import { Button, DatePicker, Input, Space } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Invoice from "../../api/invoice.api";
import { FILTER_INVOICELIST, INVOICELIST_PAGE_LOADED, INVOICELIST_PAGE_UNLOADED } from "../../store/actions";
import { store } from "../../store";
import InvoiceTable from "./InvoiceTable";

export default function InvoicePage() {
    const searchParams = useSearchParams();
    const user = searchParams[0].get("user");
    const { invoiceList, total, page, pager, inProgress } = useSelector(state => state.invoiceList);

    const [filter, setFilter] = useState({
        user: user || "",
        date: null
    });

    const onLoad = user => {
        const pager = (page, filter) => Invoice.getAll(page, { ...filter, user });
        store.dispatch({
            type: INVOICELIST_PAGE_LOADED,
            pager,
            payload: Invoice.getAll(0, { user })
        });
    };
    const onUnload = () => store.dispatch({ type: INVOICELIST_PAGE_UNLOADED });
    const onReload = () =>
        store.dispatch({
            type: FILTER_INVOICELIST,
            payload: pager(page, filter)
        });

    const onDateChange = (date, dateString) => {
        updateFilter("date", date);
        store.dispatch({
            type: FILTER_INVOICELIST,
            payload: Invoice.getAll(0, { ...filter, date })
        });
    };

    const updateFilter = (key, value) => {
        setFilter({ ...filter, [key]: value });
    };
    const onFilter = () => {
        store.dispatch({
            type: FILTER_INVOICELIST,
            payload: Invoice.getAll(0, filter)
        });
    };

    useEffect(() => {
        onLoad(user);
        return () => {
            onUnload();
        };
    }, [user]);

    return (
        <Space className="invoice-page max-w-full" direction="vertical" size="large">
            <div className="flex flex-col-reverse justify-between xl:flex-row">
                <Space size="middle">
                    <Input.Search
                        className="box-border"
                        style={{ minWidth: "320px" }}
                        placeholder="Enter username"
                        enterButton
                        maxLength={100}
                        size="middle"
                        value={filter.user}
                        allowClear
                        onChange={e => updateFilter("user", e.target.value)}
                        onSearch={onFilter}
                    />
                    <DatePicker value={filter.date} onChange={onDateChange} />
                </Space>
                <Space className="flex-row mb-6 xl:mb-0 xl:items-end xl:flex-col" size="middle">
                    <Button size="large" icon={<ReloadOutlined />} onClick={onReload} />
                </Space>
            </div>
            <InvoiceTable
                invoiceList={invoiceList}
                pageSize={Invoice.pageSize}
                total={total}
                currentPage={page + 1}
                pager={pager}
                filter={filter}
                inProgress={inProgress}
            />
        </Space>
    );
}
