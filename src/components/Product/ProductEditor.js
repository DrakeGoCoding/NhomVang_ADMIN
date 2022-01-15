import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { store } from "../../store";
import {
  PRODUCT_PAGE_LOADED,
  PRODUCT_PAGE_UNLOADED,
  PRODUCT_SUBMITTED
} from "../../store/actions";
import Product from "../../api/product.api";
import { Button, message, Modal, Space, Spin, Tabs, Tooltip } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import ProductDescriptor from "./ProductDescriptor";
import ProductPhoto from "./ProductPhoto";
import ProductDetail from "./ProductDetail";
import ProductLogger from "./ProductLogger";

const ExtraTabSlot = {
  left: (
    <Tooltip title="Back">
      <Link to="/products" className="mr-2">
        <Button type="link" icon={<ArrowLeftOutlined />} />
      </Link>
    </Tooltip>
  )
};

export default function ProductEditor({ mode }) {
  const { slug } = useParams();
  const { data, inProgress } = useSelector(state => state.product);

  const onLoad = payload =>
    store.dispatch({ type: PRODUCT_PAGE_LOADED, payload });
  const onUnload = () => store.dispatch({ type: PRODUCT_PAGE_UNLOADED });

  const [currentTab, setCurrentTab] = useState("form");
  const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);

  const changeTab = activeKey => setCurrentTab(activeKey);
  const showSaveModal = () => {
    if (!data.name || !data.supplier || !data.listedPrice) {
      setCurrentTab("form");
      message.error({
        content: (
          <span>
            Please fill in all required <span className="text-red-500">*</span>{" "}
            fields.
          </span>
        )
      });
    } else if (!data.thumbnail) {
      setCurrentTab("photo");
      message.error({ content: "Please upload a thumbnail image." });
    } else {
      setIsSaveModalVisible(true);
    }
  };
  const closeSaveModal = () => setIsSaveModalVisible(false);

  const handleSaveProduct = () => {
    store.dispatch({
      type: PRODUCT_SUBMITTED,
      payload: slug ? Product.update(data) : Product.create(data)
    });
    closeSaveModal();
  };

  useEffect(() => {
    onLoad(slug ? Product.getBySlug(slug) : null);
  }, [slug]);

  useEffect(() => {
    return () => {
      onUnload();
    };
  }, []);

  return (
    <div className="product-editor">
      <Tabs
        type="card"
        className="mb-4"
        activeKey={currentTab}
        defaultActiveKey="form"
        onChange={changeTab}
        tabBarExtraContent={ExtraTabSlot}
      >
        <Tabs.TabPane tab="Detail" key="form">
          {inProgress ? (
            <Spin size="large" />
          ) : (
            <ProductDetail product={data} />
          )}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Description" key="description">
          {inProgress ? (
            <Spin size="large" />
          ) : (
            <ProductDescriptor description={data.description} />
          )}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Photo" key="photo">
          {inProgress ? (
            <Spin size="large" />
          ) : (
            <ProductPhoto thumbnail={data.thumbnail} photos={data.photos} />
          )}
        </Tabs.TabPane>
        {mode === "edit" && (
          <Tabs.TabPane tab="Logs" key="logs">
            {inProgress ? (
              <Spin size="large" />
            ) : (
              <ProductLogger product={data} />
            )}
          </Tabs.TabPane>
        )}
      </Tabs>

      <Space size="middle">
        <Button disabled={inProgress} type="primary" onClick={showSaveModal}>
          {slug ? "Save" : "Create"}
        </Button>

        <Button>
          <Link to="/products">Cancel</Link>
        </Button>
      </Space>

      <Modal
        title="Product"
        visible={isSaveModalVisible}
        onOk={handleSaveProduct}
        onCancel={closeSaveModal}
      >
        Confirm to save product?
      </Modal>
    </div>
  );
}
