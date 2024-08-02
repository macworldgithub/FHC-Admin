import React, { useState } from "react";
import { Button, Input, Form, notification } from "antd";
import { useNavigate } from "react-router-dom";
// import { Users } from "../data/users";
// import { login } from "../reduxSlices/userSlice";

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (
    type: "success" | "error",
    message: string,
    description: string
  ) => {
    api[type]({
      message,
      description,
    });
  };

  const handleLogin = async () => {
    try {
      openNotificationWithIcon("success", "Login Success!", "");
      navigate("/");
    } catch (error) {}
  };

  return (
    <Form
      name="login"
      className="login-form w-full text-center"
      initialValues={{ remember: true }}
      onFinish={handleLogin}
    >
      {contextHolder}
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input your Email!" }]}
      >
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-full py-3 px-10 w-full"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input.Password
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-full py-3 px-10 w-full"
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button w-28"
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
