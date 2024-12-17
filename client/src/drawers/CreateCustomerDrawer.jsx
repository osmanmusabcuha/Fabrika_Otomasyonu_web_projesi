import { Button, Drawer, Form, Input, InputNumber, Select, Space } from "antd";
import { useFormik, FormikProvider } from "formik";
import mutateData from "../hooks/mutateData";
import { useContext, useEffect } from "react";
import { DrawerContext } from "../context/DrawerProvider";

const { TextArea } = Input;

const CreateCustomerDrawer = ({ customerData, onClose, open }) => {
  const { toggleSubmit, createButtonClicked, forEdit, setForEdit, showNotification } =
    useContext(DrawerContext);

  useEffect(() => {
    formik.setValues(formik.initialValues);
  }, [createButtonClicked]);

  useEffect(() => {
    if (forEdit) {
      formik.setValues({
        ad: customerData.adi,
        soyad: customerData.soyadi,
        firma_adi: customerData.firma_adi,
        firma_adres: customerData.firma_adres
      });
    }

    console.log("ad:", formik.values.ad);
  }, [customerData, forEdit]);

  const handleSubmit = async (values) => {
    await mutateData(
      forEdit ? `customer/${customerData.id}` : "customer",
      forEdit ? "put" : "post",
      {
        adi: values.ad,
        soyadi: values.soyad,
        firma_adi: values.firma_adi,
        firma_adres: values.firma_adres,
      },
      "application/json"
    );
    toggleSubmit();
    showNotification("Yeni Müşteri Eklendi")
    formik.setValues(formik.initialValues);
  };

  const formik = useFormik({
    initialValues: {
      ad: "",
      soyad: "",
      firma_adi: "",
      firma_adres: "",
    },
    onSubmit: handleSubmit,
  });

  return (
    <Drawer
      width={"50%"}
      title={forEdit ? "Musteri Kaydını Güncelle" : "Yeni Musteri Kaydı"}
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
          <Form.Item htmlFor="soyad" label="Soyad">
            <Input
              style={{
                width: "100%",
              }}
              name="soyad"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.soyad}
            />
          </Form.Item>
          <Form.Item htmlFor="firma_adi" label="Firma Adı">
            <Input
              style={{
                width: "100%",
              }}
              name="firma_adi"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.firma_adi}
            />
          </Form.Item>
          <Form.Item htmlFor="firma_adres" label="Firma Adres">
            <TextArea
              maxLength={250}
              showCount
              style={{
                width: "100%",
              }}
              name="firma_adres"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.firma_adres}
            />
          </Form.Item>
        </Form>
      </FormikProvider>
    </Drawer>
  );
};

export default CreateCustomerDrawer;
