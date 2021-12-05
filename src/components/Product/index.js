import { Button, message, Modal, Space } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Product from "../../api/product.api";
import { DELETE_PRODUCT, PRODUCTLIST_PAGE_LOADED, PRODUCTLIST_PAGE_UNLOADED } from "../../constants/actionTypes";
import { store } from "../../store";
import ProductTable from "./ProductTable";
import "../../style/product.css";

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

    const onReload = () => {
        onLoad();
    };

    const [deleteProductModal, setDeleteProductModal] = useState({ visible: false, slug: "" });

    const showDeleteUserModal = slug => setDeleteProductModal({ visible: true, slug });
    const closeDeleteUserModal = () => setDeleteProductModal({ visible: false, slug: "" });

    const handleDeleteProduct = () => {
        store.dispatch({
            type: DELETE_PRODUCT,
            payload: Product.delete(deleteProductModal.slug)
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
            <div className="flex justify-between">
                <Space className="mr-4" size="middle">
                    <Button type="primary" size="large">
                        <Link to="/product/create">New Product</Link>
                    </Button>
                    <Button size="large" icon={<ReloadOutlined />} onClick={onReload} />
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
