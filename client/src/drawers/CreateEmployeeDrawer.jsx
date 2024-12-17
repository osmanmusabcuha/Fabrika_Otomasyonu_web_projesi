import { Button, Drawer, Form, Input, InputNumber, Select, Space } from "antd";
import { useFormik, FormikProvider } from "formik";
import mutateData from "../hooks/mutateData";
import { useContext, useEffect } from "react";
import { DrawerContext } from "../context/DrawerProvider";

const { TextArea } = Input;

const CreateEmployeeDrawer = ({ employeeData, onClose, open }) => {
  const { toggleSubmit, createButtonClicked, forEdit, setForEdit, showNotification } =
    useContext(DrawerContext);

  useEffect(() => {
    formik.setValues(formik.initialValues);
  }, [createButtonClicked]);

  useEffect(() => {
    if (forEdit) {
      formik.setValues({
        ad: employeeData.adi,
        soyad: employeeData.soyadi,
        adres: employeeData.adres,
        maas: employeeData.maas,
        medeni_durum: employeeData.medeni_durum,
        tel: employeeData.tel_no,
      });
    }

    console.log("ad:", formik.values.ad);
  }, [employeeData, forEdit]);

  const handleSubmit = async (values) => {
    await mutateData(
      forEdit ? `employeer/${employeeData.id}` : "employeer",
      forEdit ? "put" : "post",
      {
        adi: values.ad,
        soyadi: values.soyad,
        maas: values.maas.toString(),
        medeni_durum: values.medeni_durum,
        tel_no: values.tel,
        adres: values.adres,
      },
      "application/json"
    );
    toggleSubmit();
    formik.setValues(formik.initialValues);
    showNotification("Müsteri eklendi")
  };

  const formik = useFormik({
    initialValues: {
      ad: "",
      soyad: "",
      maas: null,
      medeni_durum: "",
      tel: "",
      adres: "",
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

          <Form.Item htmlFor="maas" label="Maaş">
            <InputNumber
              min={0}
              style={{
                width: "100%",
              }}
              addonAfter="₺"
              name="maas"
              type="number"
              onChange={(e) => formik.setFieldValue("maas", e)}
              value={formik.values.maas}
            />
          </Form.Item>
          <Form.Item htmlFor="medeni_durum" label="Medeni Durum">
            <Select
              style={{
                width: "100%",
              }}
              name="medeni_durum"
              options={[
                {
                  title: "Evli",
                  value: "Evli",
                },
                {
                  title: "Bekar",
                  value: "Bekar",
                },
              ]}
              onChange={(e) => formik.setFieldValue("medeni_durum", e)}
              value={formik.values.medeni_durum}
            />
          </Form.Item>
          <Form.Item htmlFor="tel" label="Tel No">
            <Input.OTP
              length={10}
              style={{}}
              name="tel"
              type="number"
              onChange={(e) => formik.setFieldValue("tel", e)}
              value={formik.values.tel}
            />
          </Form.Item>
          <Form.Item htmlFor="adres" label="Adres">
            <TextArea
              maxLength={200}
              showCount
              style={{
                width: "100%",
              }}
              name="adres"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.adres}
            />
          </Form.Item>
        </Form>
      </FormikProvider>
    </Drawer>
  );
};

export default CreateEmployeeDrawer;
