import { Button, Drawer, Form, Input, InputNumber, Select, Space } from "antd";
import { useFormik, FormikProvider } from "formik";
import mutateData from "../hooks/mutateData";
import { useContext, useEffect } from "react";
import { DrawerContext } from "../context/DrawerProvider";
import getData from "../hooks/getData";

const CreateProductionDrawer = ({ productionData, onClose, open }) => {
  const { data, loading, error } = getData("employeer");
  const productData = getData("product");
  const rawMetarialData = getData("raw-metarial");
  const {
    toggleSubmit,
    createButtonClicked,
    forEdit,
    setForEdit,
    showNotification,
  } = useContext(DrawerContext);

  useEffect(() => {
    formik.setValues(formik.initialValues);
  }, [createButtonClicked]);

  useEffect(() => {
    if (forEdit) {
      formik.setValues({
        calisan_id: productionData.calisan_id,
        hammade_id: productionData.hammade_id,
        urun_id: productionData.urun_id,
        uretilen_miktar: productionData.uretilen_miktar,
      });
    }
  }, [productionData, forEdit]);

  const handleSubmit = async (values) => {
    console.log(values);
    await mutateData(
      "production",
      "post",
      {
        calisan_id: values.calisan_id,
        hammade_id: values.hammade_id,
        urun_id: values.urun_id,
        uretilen_miktar: values.uretilen_miktar,
      },
      "application/json"
    );
    toggleSubmit();
    formik.setValues(formik.initialValues);
    showNotification("Uretim Eklendi");
  };

  const formik = useFormik({
    initialValues: {
      calisan_id: null,
      hammade_id: null,
      urun_id: null,
      uretilen_miktar: null,
    },
    onSubmit: handleSubmit,
  });

  return (
    <Drawer
      width={"50%"}
      title={forEdit ? "Çalışan Kaydını Güncelle" : "Yeni Çalışan Kaydı"}
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
          <Form.Item htmlFor="calisan_id" label="Çalışan">
            <Select
              placeholder="Bir çalışan seçiniz..."
              onChange={(e) => formik.setFieldValue("calisan_id", e)}
            >
              {data.map((item, key) => {
                return (
                  <Select.Option key={key} value={item.id}>
                    {item.adi}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item htmlFor="hammade_id" label="Hammadde">
          <Select
              placeholder="Bir hammadde seçiniz..."
              onChange={(e) => formik.setFieldValue("hammade_id", e)}
            >
              {rawMetarialData.data.map((item, key) => {
                return (
                  <Select.Option key={key} value={item.id}>
                    {item.adi}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item htmlFor="urun_id" label="Ürün">
            <Select
              placeholder="Bir ürün seçiniz..."
              onChange={(e) => formik.setFieldValue("urun_id", e)}
            >
              {productData.data.map((item, key) => {
                return (
                  <Select.Option key={key} value={item.id}>
                    {item.adi}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item htmlFor="uretilen_miktar" label="Uretilen Miktar">
            <InputNumber
              style={{
                width: "100%",
              }}
              name="uretilen_miktar"
              type="number"
              onChange={(e) => formik.setFieldValue("uretilen_miktar", e)}
              value={formik.values.uretilen_miktar}
            />
          </Form.Item>
        </Form>
      </FormikProvider>
    </Drawer>
  );
};

export default CreateProductionDrawer;
