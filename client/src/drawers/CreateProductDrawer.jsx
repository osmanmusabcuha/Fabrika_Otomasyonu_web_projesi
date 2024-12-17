import { Button, Drawer, Form, Input, InputNumber, Select, Space } from "antd";
import { useFormik, FormikProvider } from "formik";
import mutateData from "../hooks/mutateData";
import { useContext, useEffect } from "react";
import { DrawerContext } from "../context/DrawerProvider";

const { TextArea } = Input;

const CreateProductDrawer = ({ productData, onClose, open }) => {
  const { toggleSubmit, createButtonClicked, forEdit, setForEdit, showNotification } =
    useContext(DrawerContext);

  useEffect(() => {
    formik.setValues(formik.initialValues);
  }, [createButtonClicked]);

  useEffect(() => {
    if (forEdit) {
      formik.setValues({
        ad: productData.adi,
        fiyat: productData.fiyat,
        miktar: productData.miktar
      });
    }

    console.log("ad:", formik.values.ad);
  }, [productData, forEdit]);

  const handleSubmit = async (values) => {
    await mutateData(
      forEdit ? `product/${productData.id}` : "product",
      forEdit ? "put" : "post",
      {
        adi: values.ad,
        fiyat: values.fiyat,
        miktar: values.miktar,
      },
      "application/json"
    );
    toggleSubmit();
    formik.setValues(formik.initialValues);
    showNotification("Ürün Eklendi")
  };

  const formik = useFormik({
    initialValues: {
      ad: "",
      fiyat: "",
      miktar: "",
    },
    onSubmit: handleSubmit,
  });

  return (
    <Drawer
      width={"50%"}
      title={forEdit ? "Urun Güncelle" : "Yeni Urun Kaydı"}
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
          <Form.Item htmlFor="ad" label="Ad">
            <Input
              name="ad"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.ad}
            />
          </Form.Item>

          <Form.Item htmlFor="fiyat" label="Fiyat">
            <InputNumber
              style={{
                width: "100%",
              }}
              addonAfter="₺"
              name="fiyat"
              type="number"
              onChange={(e) => formik.setFieldValue("fiyat", e)}
              value={formik.values.fiyat}
            />
          </Form.Item>
          <Form.Item htmlFor="miktar" label="Miktar">
            <InputNumber
              style={{
                width: "100%",
              }}
              name="miktar"
              type="number"
              onChange={(e) => formik.setFieldValue("miktar", e)}
              value={formik.values.miktar}
            />
          </Form.Item>
          
        </Form>
      </FormikProvider>
    </Drawer>
  );
};

export default CreateProductDrawer;
