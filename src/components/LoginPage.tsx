import React, {useState} from 'react';
import {Button, Form, Input, Layout, message} from 'antd';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import delay from "../utils/delay";

const {Content} = Layout;

type FieldType = {
    username?: string;
    password?: string;
};

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    const onSubmit = async (values: any) => {
        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("username", values.username);
            formData.append("password", values.password);

            const response = await axios.post('http://localhost:8000/token', formData);

            message.success("Success");
            localStorage.setItem("token", response.data["access_token"]);
            await delay(1000);
            navigate("/")
        } catch (error: any) {
            console.error('Login failed', error);

            if (error.response) {
                message.error(error.response.data.detail);
            } else if (error.request) {
                message.error('Network error, please try again.');
            } else {
                message.error('An error occurred, please try again later.');
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <Layout style={{height: "100vh"}}>
            <Content style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div
                    style={{
                        padding: 24,
                        backgroundColor: "white"
                    }}
                >
                    <Form
                        name="basic"
                        labelCol={{span: 8}}
                        wrapperCol={{span: 16}}
                        style={{maxWidth: 600}}
                        onFinish={onSubmit}
                        autoComplete="off"
                    >
                        <Form.Item<FieldType>
                            label="Username"
                            name="username"
                            rules={[{required: true, message: 'Please input your username!'}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Password"
                            name="password"
                            rules={[{required: true, message: 'Please input your password!'}]}
                        >
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Content>
        </Layout>
    )
};

export default LoginPage;