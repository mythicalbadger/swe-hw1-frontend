import React, {useState} from 'react';
import {Button, Layout, Table, theme} from 'antd';
import Title from "antd/es/typography/Title";
import { PlusOutlined } from '@ant-design/icons';
import axios from "axios";

const {Content} = Layout;

const RequestPage: React.FC = () => {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    const token = localStorage.getItem('token')
    const [requests, setRequests] = useState([]);

    React.useEffect(() => {
        axios.get("http://localhost:8000/api/get-all-leave-requests",{ headers: { Authorization : `Bearer ${token}` }} ).then((response) => {
            setRequests(response.data)
        })
    }, [])


    const columns = [
        {
            title: 'Employee ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'full_name',
            key: 'name',
        },
        {
            title: 'Start Date',
            dataIndex: 'start_date',
            key: 'start',
        },
        {
            title: "End Date",
            dataIndex: "end_date",
            key: "end"
        },
        {
            title: "Reason",
            dataIndex: "reason",
            key: "reason"
        },
        {
            title: "Actions",
            key: "actions"
        }
    ];
    return (
        <Content style={{margin: '24px 16px 0', textAlign: 'center'}}>
            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <Title>Requests</Title>
                <div style={{ textAlign: "right", marginRight: "1em", marginBottom: "2em"}}>
                <Button type="primary" shape="round" icon={<PlusOutlined/>} size={'large'}>
                    New Request
                </Button>
                </div>
                <Table dataSource={requests} columns={columns}/>;
            </div>
        </Content>
    );
};
export default RequestPage;
