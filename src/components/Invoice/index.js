import { Space } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Invoice from "../../api/invoice.api";
import { INVOICE_PAGE_LOADED, INVOICE_PAGE_UNLOADED } from "../../constants/actionTypes";
import { store } from "../../store";
import InvoiceTable from "./InvoiceTable";

export default function InvoicePage() {
    const searchParams = useSearchParams();
    const user = searchParams[0].get("user");
    const { invoiceList, total, page, pager, inProgress } = useSelector(state => state.invoiceList);

    const onLoad = user => {
        const pager = (page, filter) => Invoice.getAll(page, { ...filter, user });
        store.dispatch({
            type: INVOICE_PAGE_LOADED,
            pager,
            payload: Invoice.getAll(0, { user })
        });
    };
    const onUnload = () => store.dispatch({ type: INVOICE_PAGE_UNLOADED });

    useEffect(() => {
        onLoad(user);
        return () => {
            onUnload();
        };
    }, [user]);

    return (
        <Space className="invoice-page max-w-full" direction="vertical" size="large">
            <div className="flex flex-col-reverse justify-between xl:flex-row">
                <Space size="middle"></Space>
            </div>
            <InvoiceTable
                invoiceList={invoiceList}
                pageSize={Invoice.pageSize}
                total={total}
                currentPage={page + 1}
                pager={pager}
                inProgress={inProgress}
            />
        </Space>
    );
}
