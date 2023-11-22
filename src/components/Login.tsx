import { Form, Input, Checkbox, Button } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/baseUrl";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string | boolean;
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [form] = useForm();

  const loginPost = async (username: string, password: string) => {
    const res = await axios.post(`${BASE_URL}/users/login`, {
      username,
      password,
    });
    return res;
  };

  const onFinish = async () => {
    form.resetFields();

    try {
      const res = await loginPost(username, password);
      const token = res.data.token;
      if (remember === true) {
        localStorage.setItem("loginToken", token);
      }
      window.location.pathname = "/dashboard";
    } catch (err: any) {
      console.log(err.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-blue3">
      <Form
        form={form}
        name="basic"
        className="flex flex-col min-w-[300px] bg-blue1 p-4 md:p-6 rounded-lg"
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item>
          <h1 className="text-center text-white text-3xl font-serif">
            Doingly
          </h1>
          <p className="text-white text-center mt-3 font-sans text-xl">Login</p>
        </Form.Item>
        <Form.Item<FieldType>
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            placeholder="Enter your username"
            className="text-blue1 hover:outline-none"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>
        <Form.Item<FieldType>
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item<FieldType> name="remember" valuePropName="checked">
          <Checkbox
            onChange={(e: CheckboxChangeEvent) => setRemember(e.target.checked)}
            className="text-white"
          >
            Remember me
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            className="bg-blue2 hover:bg-blue3"
          >
            Login
          </Button>
          <p className="text-white mt-2 text-right">
            or <span> </span>
            <Link to="/sign">
              <span className="text-blue3 underline cursor-pointer">
                sign up
              </span>
            </Link>
          </p>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
