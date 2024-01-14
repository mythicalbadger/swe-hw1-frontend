import React, {useState} from 'react';
import {Button, Layout, Table, theme} from 'antd';
import Title from "antd/es/typography/Title";
import {PlusOutlined} from '@ant-design/icons';
import axios from "axios";
import CreateRequestModal from "./CreateRequestModal";

const {Content} = Layout;

const RequestPage: React.FC = () => {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    const token = localStorage.getItem('token')
    const [requests, setRequests] = useState([]);
    const [createModalOpen, setCreateModalOpen] = useState(false);

    React.useEffect(() => {
        axios.get("http://localhost:8000/api/get-all-leave-requests", {headers: {Authorization: `Bearer ${token}`}}).then((response) => {
            setRequests(response.data)
        })
    }, [createModalOpen])


    const columns = [
        {
            title: 'Employee ID',
            dataIndex: 'requester_id',
            key: 'id',
        },
        {
            title: 'Start Date',
            dataIndex: 'start_date',
            key: 'start',
            render: ((date: string) => {
                const dateObj: Date = new Date(date);
                return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`
            })
        },
        {
            title: "End Date",
            dataIndex: "end_date",
            key: "end",
            render: ((date: string) => {
                const dateObj: Date = new Date(date);
                return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`
            })
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
                <div style={{textAlign: "right", marginRight: "1em", marginBottom: "2em"}}>
                    <Button type="primary" shape="round" icon={<PlusOutlined/>} size={'large'}
                            onClick={() => setCreateModalOpen(true)}>
                        New Request
                    </Button>
                    <CreateRequestModal createModalOpen={createModalOpen}
                                        handleCancel={() => setCreateModalOpen(false)}/>
                </div>
                <Table dataSource={requests} columns={columns}/>;
            </div>
        </Content>
    );
};
export default RequestPage;
