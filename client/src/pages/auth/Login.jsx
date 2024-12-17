import { useContext, useState } from "react";
import mutateData from "../../hooks/mutateData";
import { Avatar, Button, Checkbox, Form, Input, notification, theme } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { FormikProvider, useFormik } from "formik";
import { DrawerContext } from "../../context/DrawerProvider";

const Login = () => {
  const {setLoggedUser} = useContext(DrawerContext);

  const {
    token: {  boxShadow, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    console.log('values:', values);
    let loginRes = await mutateData(
      "auth/login",
      "post",
      {
        eposta: values.email,
        sifre: values.password,
      },
      "application/json"
    );
    if (loginRes.data.Status === "Success") {
      console.log('res:', loginRes);
      localStorage.setItem("token", loginRes.data.Token);
      setLoggedUser(`${values.email}`);
      localStorage.setItem("usermail", values.email);
      navigate("/dashboard");
    }else {
      notification.error({
        message: "Girdiğiniz Bilgiler Yanlış!"
      })
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleSubmit,
  });

  return (
    <div
      style={{
        display: "flex",
        marginTop: "200px",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <FormikProvider value={formik.initialValues}>
      <Form
      layout="vertical"
        onFinish={formik.handleSubmit}
      labelCol={{span: 12}}
      wrapperCol={{span: 24}}
        style={{
          display: "flex",
          flexDirection: "column",
          border: `1px solid rgba(0, 0, 0, .2)`,
          padding: 25,
          maxWidth: 500,
          borderRadius: borderRadiusLG,
          boxShadow: boxShadow,
        }}
      >
        <Avatar
          size={86}
          icon={<UserOutlined />}
          style={{
            marginBottom: 20,
            backgroundColor: "#1577fe",
            placeSelf: "center",
          }}
        />
        <Form.Item name="email">
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Eposta"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </Form.Item>
        <Form.Item name="password" >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Şifre"
            visibilityToggle
            value={formik.values.sifre}
            onChange={formik.handleChange}
          />
        </Form.Item>
        <Button loading={formik.isSubmitting} type="primary" htmlType="submit">
          Giriş Yap
        </Button>
      </Form>
      </FormikProvider>
    </div>
  );
};

export default Login;
