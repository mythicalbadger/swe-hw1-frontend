import React, {useState} from 'react';
import {Button, Form, Input, Layout} from 'antd';
import {useNavigate} from "react-router-dom";
import {UserAPI} from "../apis/userAPI";

const {Content} = Layout;

type FieldType = {
    username?: string;
    password?: string;
};

type LoginDetails = {
    username: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    const onSubmit = async (values: LoginDetails) => {
        setLoading(true);

        const response = await UserAPI.login(values.username, values.password);
        localStorage.setItem("token", response?.data["access_token"]);

        setLoading(false);

        navigate("/");
    }

    return (
        <Layout style={{height: "100vh"}}>
            <Content style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div
                    style={{
                        padding: 24,
                        backgroundColor: "white",
                        textAlign: "center"
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

                        <Form.Item wrapperCol={{offset: 4, span: 16}}>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Submit
                            </Button>
                        </Form.Item>
                        Don't have an account? <a href="/register">Register here.</a>
                    </Form>
                </div>
            </Content>
        </Layout>
    )
};

export default LoginPage;