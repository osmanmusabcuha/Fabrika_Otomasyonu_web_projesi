import { Button, Drawer, Form, Input, InputNumber, Select, Space, Typography, theme, notification } from "antd";
import { useFormik, FormikProvider } from "formik";
import mutateData from "../hooks/mutateData";
import { useContext, useEffect } from "react";
import { DrawerContext } from "../context/DrawerProvider";
import getData from "../hooks/getData";

const CreateOrderDrawer = ({ orderData, onClose, open, showNotification }) => {
  const { toggleSubmit, createButtonClicked, forEdit, setForEdit } =
    useContext(DrawerContext);
    const {
      token: { colorPrimary  },
    } = theme.useToken();
    const employeerData = getData("employeer");
    const customerData = getData("customer");

  useEffect(() => {
    formik.setValues(formik.initialValues);
  }, [createButtonClicked]);

  useEffect(() => {
    if (forEdit) {
      formik.setValues({
        calisanlar_id: orderData.calisanlar_id,
        musteri_id: orderData.musteri_id,
      });
    }
  }, [orderData, forEdit]);

  const handleSubmit = async (values) => {
    await mutateData(
      forEdit ? `order/${orderData.id}` : "order",
      forEdit ? "put" : "post",
      {
        calisanlar_id: values.calisanlar_id,
        musteri_id: values.musteri_id,
      },
      "application/json"
    );
    toggleSubmit();
    notification.success({
      message: "Sipariş Başarıyla Eklendi!"
    })
    formik.setValues(formik.initialValues);
    showNotification("Siparis Eklendi")
  };

  const formik = useFormik({
    initialValues: {
    calisanlar_id: null,
      musteri_id: null,
    },
    onSubmit: handleSubmit,
  });

  return (
    <Drawer
      width={"50%"}
      title={forEdit ? "Siparis Kaydını Güncelle" : "Yeni Siparis Kaydı"}
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
          <Form.Item htmlFor="calisanlar_id" label="Çalışan">
          <Select placeholder="Bir çalışan seçiniz..." onChange={(e) => formik.setFieldValue("calisanlar_id", e)}>
              {employeerData.data.map((item, key) => {
              return (<Select.Option key={key} value={item.id}>
                <Typography.Text strong style={{
                  color: colorPrimary,
                  marginRight: 5,
                }}>
                {item.id}:
                </Typography.Text>
                {item.adi}
                </Select.Option>)
              })}
            </Select>
          </Form.Item>
          <Form.Item htmlFor="musteri_id" label="Musteri ID">
            <Select placeholder="Bir müşteri seçiniz..." onChange={(e) => formik.setFieldValue("musteri_id", e)}>
              {customerData.data.map((item, key) => {
              return (<Select.Option key={key} value={item.id}>
                <Typography.Text strong style={{
                  color: colorPrimary,
                  marginRight: 5,
                }}>
                {item.id}:
                </Typography.Text>
                {item.adi}
                </Select.Option>)
              })}
            </Select>
          </Form.Item>
        </Form>
      </FormikProvider>
    </Drawer>
  );
};

export default CreateOrderDrawer;
