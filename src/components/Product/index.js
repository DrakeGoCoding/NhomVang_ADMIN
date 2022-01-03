import { Button, Checkbox, Input, InputNumber, message, Modal, Space, Tooltip } from "antd";
import { ClearOutlined, ReloadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Product from "../../api/product.api";
import {
    DELETE_PRODUCT,
    FILTER_PRODUCTLIST,
    PRODUCTLIST_PAGE_LOADED,
    PRODUCTLIST_PAGE_UNLOADED
} from "../../store/actions";
import { store } from "../../store";
import ProductTable from "./ProductTable";
import "../../style/product.css";

const DEFAULT_FILTER = {
    name: "",
    supplier: "",
    minPrice: undefined,
    maxPrice: undefined,
    hot: false,
    inSlider: false
};

export default function ProductPage() {
    const { productList, total, page, pager, error, reload } = useSelector(state => state.productList);

    const onLoad = () => {
        const pager = (page, filter) => Product.getAll(page, filter);
        store.dispatch({
            type: PRODUCTLIST_PAGE_LOADED,
            pager,
            payload: Product.getAll()
        });
    };
    const onUnload = () => store.dispatch({ type: PRODUCTLIST_PAGE_UNLOADED });

    const [filter, setFilter] = useState(DEFAULT_FILTER);
    const [deleteProductModal, setDeleteProductModal] = useState({ visible: false, slug: "" });

    const showDeleteUserModal = slug => setDeleteProductModal({ visible: true, slug });
    const closeDeleteUserModal = () => setDeleteProductModal({ visible: false, slug: "" });

    const handleDeleteProduct = () => {
        store.dispatch({
            type: DELETE_PRODUCT,
            payload: Product.delete(deleteProductModal.slug)
        });
    };

    const changeName = e => {
        setFilter({ ...filter, name: e.target.value });
    };

    const changeSupplier = e => {
        setFilter({ ...filter, supplier: e.target.value });
    };

    const changeMinPrice = value => {
        setFilter({ ...filter, minPrice: value });
    };

    const changeMaxPrice = value => {
        setFilter({ ...filter, maxPrice: value });
    };

    const changeHot = e => {
        setFilter({ ...filter, hot: e.target.checked });
        store.dispatch({
            type: FILTER_PRODUCTLIST,
            payload: pager(0, { ...filter, hot: e.target.checked })
        });
    };

    const changeInSlider = e => {
        setFilter({ ...filter, inSlider: e.target.checked });
        store.dispatch({
            type: FILTER_PRODUCTLIST,
            payload: pager(0, { ...filter, inSlider: e.target.checked })
        });
    };

    const onFilter = e => {
        store.dispatch({
            type: FILTER_PRODUCTLIST,
            payload: pager(0, filter)
        });
    };

    const onResetFilter = e => {
        setFilter(DEFAULT_FILTER);
        onLoad();
    };

    const onReload = () => {
        store.dispatch({
            type: FILTER_PRODUCTLIST,
            page,
            payload: pager(page, filter)
        });
    };

    useEffect(() => {
        onLoad();
        return () => {
            onUnload();
        };
    }, []);

    useEffect(() => {
        if (reload) {
            onLoad();
        } else if (error) {
            message.error({ content: error });
        }
        closeDeleteUserModal();
    }, [reload, error]);

    return (
        <Space className="product-page max-w-full" direction="vertical" size="large">
            <div className="flex flex-col-reverse justify-between xl:flex-row">
                <Space direction="vertical">
                    <Space className="mb-4 justify-start" size="middle">
                        <Input.Search
                            className="float-right box-border"
                            style={{ minWidth: "320px" }}
                            placeholder="Enter product name"
                            enterButton
                            maxLength={100}
                            size="middle"
                            value={filter.name}
                            onChange={changeName}
                            onSearch={onFilter}
                        />

                        <Input.Search
                            className="float-right box-border"
                            style={{ minWidth: "320px" }}
                            placeholder="Enter supplier"
                            enterButton
                            maxLength={100}
                            size="middle"
                            value={filter.supplier}
                            onChange={changeSupplier}
                            onSearch={onFilter}
                        />
                    </Space>
                    <Space size="large">
                        <Space>
                            <span>Price</span>
                            <InputNumber
                                placeholder="Min"
                                step={5}
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                parser={value => value.replace(/\$\s?|(,*)/g, "")}
                                addonAfter="$"
                                min={0}
                                value={filter.minPrice}
                                onChange={changeMinPrice}
                                onPressEnter={onFilter}
                            />
                            <span>to</span>
                            <InputNumber
                                placeholder="Max"
                                step={5}
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                parser={value => value.replace(/\$\s?|(,*)/g, "")}
                                addonAfter="$"
                                min={0}
                                value={filter.maxPrice}
                                onChange={changeMaxPrice}
                                onPressEnter={onFilter}
                            />
                        </Space>
                        <Space>
                            <Checkbox checked={filter.hot} onChange={changeHot}>
                                Hot
                            </Checkbox>
                            <Checkbox checked={filter.inSlider} onChange={changeInSlider}>
                                Slider
                            </Checkbox>
                        </Space>
                    </Space>
                </Space>
                <Space className="flex-row mb-6 xl:mb-0 xl:items-end xl:flex-col" size="middle">
                    <Space className="items-start" size="middle">
                        <Button type="primary" size="large">
                            <Link to="/products/create">New Product</Link>
                        </Button>
                        <Tooltip title="Reload">
                            <Button size="large" icon={<ReloadOutlined />} onClick={onReload} />
                        </Tooltip>
                    </Space>
                    <Tooltip title="Reset filter">
                        <Button type="dashed" size="large" onClick={onResetFilter} icon={<ClearOutlined />} />
                    </Tooltip>
                </Space>
            </div>
            <ProductTable
                productList={productList}
                pageSize={Product.pageSize}
                total={total}
                currentPage={page + 1}
                pager={pager}
                showDeleteUserModal={showDeleteUserModal}
            />
            <Modal
                visible={deleteProductModal.visible}
                title="Delete Product"
                okButtonProps={{ danger: true }}
                cancelButtonProps={{ danger: true }}
                onOk={handleDeleteProduct}
                onCancel={closeDeleteUserModal}
            >
                Confirm to delete product "{deleteProductModal.slug}"?
            </Modal>
        </Space>
    );
}
