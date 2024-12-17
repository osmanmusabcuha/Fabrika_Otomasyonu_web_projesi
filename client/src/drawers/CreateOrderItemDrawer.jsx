import { Button, Drawer, Form, Input, InputNumber, Select, Space, Typography, theme } from "antd";
import { useFormik, FormikProvider } from "formik";
import mutateData from "../hooks/mutateData";
import { useContext, useEffect } from "react";
import { DrawerContext } from "../context/DrawerProvider";
import getData from "../hooks/getData";

const CreateOrderItemDrawer = ({ orderItemData, onClose, open }) => {
  const { toggleSubmit, createButtonClicked, forEdit, setForEdit, showNotification } =
    useContext(DrawerContext);
    const {
      token: { colorPrimary  },
    } = theme.useToken();
    const productData = getData("product");
    const orderData = getData("order");
 

  useEffect(() => {
    formik.setValues(formik.initialValues);
  }, [createButtonClicked]);

  useEffect(() => {
    if (forEdit) {
      formik.setValues({
        siparis_id: orderItemData.siparis_id,
        urun_id: orderItemData.urun_id,
        siparis_miktar: orderItemData.siparis_miktar,
      });
    }
  }, [orderItemData, forEdit]);

  const handleSubmit = async (values) => {
    await mutateData(
      forEdit ? `order-item/${orderItemData.id}` : "order-item",
      forEdit ? "put" : "post",
      {
        siparis_id: values.siparis_id,
        urun_id: values.urun_id,
        siparis_miktar: values.siparis_miktar,
      },
      "application/json"
    );
    showNotification("Sipariş İçeriği Eklendi!")
    toggleSubmit();
    formik.setValues(formik.initialValues);
  };

  const formik = useFormik({
    initialValues: {
      siparis_id: null,
      urun_id: null,
      siparis_miktar: null,
    },
    onSubmit: handleSubmit,
  });

  return (
    <Drawer
      width={"50%"}
      title={forEdit ? "" : "Yeni Siparis İçerik"}
      onClose={() => {
        onClose();
        setForEdit(false);
      }}
      open={open}
      extra={
        <Space>
          <Button
            onClick={() => {
              onClose();
              setForEdit(false);
            }}
          >
            İptal
          </Button>
          <Button
            loading={formik.isSubmitting}
            onClick={() => {
              onClose();
              formik.submitForm();
            }}
            type="primary"
          >
            Gönder
          </Button>
        </Space>
      }
    >
      <FormikProvider value={formik.initialValues}>
        <Form
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 24 }}
          onFinish={formik.handleSubmit}
        >
          <Form.Item htmlFor="siparis_id" label="Siparis ID">
            <Select placeholder="Bir sipariş seçiniz..." onChange={(e) => formik.setFieldValue("siparis_id", e)}>
              {orderData.data.map((item, key) => {
              return (<Select.Option key={key} value={item.id}>
                <Typography.Text strong style={{
                  color: colorPrimary,
                }}>
                {item.id}
                </Typography.Text>
                </Select.Option>)
              })}
            </Select>
          </Form.Item>
          <Form.Item htmlFor="urun_id" label="Urun ID">
          <Select placeholder="Bir ürün seçiniz..." onChange={(e) => formik.setFieldValue("urun_id", e)}>
              {productData.data.map((item, key) => {
              return <Select.Option key={key} value={item.id}>{item.adi}</Select.Option>
              })}
            </Select>
          </Form.Item>
          <Form.Item htmlFor="siparis_miktar" label="Siparis Miktar">
            <InputNumber
              style={{
                width: "100%",
              }}
              name="siparis_miktar"
              type="number"
              onChange={(e) => formik.setFieldValue("siparis_miktar", e)}
              value={formik.values.siparis_miktar}
            />
          </Form.Item>
        </Form>
      </FormikProvider>
    </Drawer>
  );
};

export default CreateOrderItemDrawer;
