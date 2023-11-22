import { Form, Input, Button } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/baseUrl";

type FieldType = {
  username?: string;
  email?: string;
  password?: string;
};

const Sign: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [form] = useForm();

  const registerPost = async (
    username: string,
    email: string,
    password: string
  ) => {
    const res = await axios.post(`${BASE_URL}/users/register`, {
      username,
      email,
      password,
    });
    return res;
  };

  const onFinish = async () => {
    form.resetFields();

    try {
      const res = await registerPost(username, email, password);
      const token = res.data.token;
      console.log(token);
      window.location.pathname = "/login";
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
          <p className="text-white text-center mt-3 font-sans text-xl">
            Sign up
          </p>
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
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
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
        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            className="bg-blue2 hover:bg-blue3"
          >
            Sign up
          </Button>
          <p className="text-white mt-2 text-right">
            or<span> </span>
            <Link to="/protectedRoute">
              <span className="text-blue3 underline cursor-pointer">login</span>
            </Link>
          </p>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Sign;
