import React, {useState} from 'react';
import {ClockCircleOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Image, Layout, Menu} from 'antd';
import RequestPage from "./RequestPage";
import {useNavigate} from "react-router-dom";

const {Footer, Sider} = Layout;

const labels = ["Requests", "Profile"]
const items = [ClockCircleOutlined, UserOutlined].map(
    (icon, index) => ({
        key: String(labels[index]),
        icon: React.createElement(icon),
        label: labels[index],
    }),
);


const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const [selectedMenuItem, setSelectedMenuItem] = useState("Requests");
    const componentSwitch = (key: any) => {
        switch (key) {
            case 'Requests':
                return <RequestPage/>
            default:
                break;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <Layout style={{height: "100vh"}}>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                theme={"light"}
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="demo-logo-vertical" style={{textAlign: "center", margin: "1em"}}>
                    <Image src={"calendar512.png"} width={"50%"}/>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: "80%"}}>
                    <Menu
                        theme="light"
                        mode="inline"
                        selectedKeys={[selectedMenuItem]}
                        items={items}
                        onClick={(e) => setSelectedMenuItem(e.key)}
                    />

                    <div style={{textAlign: 'center', margin: '1em'}}>
                        <Button type="primary" onClick={logout}>Logout</Button>
                    </div>
                </div>
            </Sider>
            <Layout>
                {componentSwitch(selectedMenuItem)}
                <Footer style={{textAlign: 'center'}}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default HomePage;