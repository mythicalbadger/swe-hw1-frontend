import React, {useState} from 'react';
import {Button, Layout, message, Popconfirm, Table, theme} from 'antd';
import Title from "antd/es/typography/Title";
import {PlusOutlined} from '@ant-design/icons';
import axios from "axios";
import CreateRequestModal from "./CreateRequestModal";
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import delay from "../utils/delay";

const {Content} = Layout;

type UserInfo = {
    id: string;
    username: string;
    full_name: string;
    remaining_leave_days: string;
};

type TableKey = {
    id: string;
    status: string;
    start_date: Date;
    end_date: Date;
    requester_id: string;
}


const RequestPage: React.FC = () => {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    const token = localStorage.getItem('token')
    const [requests, setRequests] = useState<any[]>([]);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [userInfo, setUserInfo] = useState<UserInfo>({id: "", username: "", full_name: "", remaining_leave_days: ""});

    async function getUserData() {
        return await axios.get("http://localhost:8000/api/get-current-user", {headers: {Authorization: `Bearer ${token}`}});
    }

    async function createRequest(values: any) {
        try {
            console.log(values.start_date)
            const data = {
                start_date: values.start_date,
                end_date: values.end_date,
                reason: values.reason
            }
            const response = await axios.post('http://localhost:8000/api/create-leave-request', data, {headers: {Authorization: `Bearer ${token}`}});

            message.success("Success");
            await delay(1000);
            setCreateModalOpen(false);
            const newRequests = [...requests, response.data];
            setRequests(newRequests);

        } catch (error: any) {
            console.error('Login failed', error);

            if (error.response) {
                message.error(error.response.data.detail);
            } else if (error.request) {
                message.error('Network error, please try again.');
            } else {
                message.error('An error occurred, please try again later.');
            }
        }
    }

    async function deleteRequest(request_id: string) {
        await axios.delete(`http://localhost:8000/api/delete-leave-request/${request_id}`, {headers: {Authorization: `Bearer ${token}`}});
        setRequests(requests.filter((request: TableKey) => request.id != request_id));
    }

    React.useEffect(() => {
        getUserData().then((response) => {
            setUserInfo(response.data)
        });
        axios.get("http://localhost:8000/api/get-all-leave-requests", {headers: {Authorization: `Bearer ${token}`}}).then((response) => {
            setRequests(response.data)
        })
    }, [])


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
            title: "Status",
            dataIndex: "status",
            key: "status"
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: TableKey) => {
                return (requests.length > 0 && record.requester_id === userInfo.id) ? (
                    <span>
                        <Button icon={<EditOutlined/>}></Button>
                        <Popconfirm title={"Delete request"}
                                    description={"Are you sure you want to delete this leave request?"} okText={"Yes"}
                                    cancelText={"No"}
                                    onConfirm={() => deleteRequest(record.id)}
                        >
                            <Button danger icon={<DeleteOutlined/>}></Button>
                        </Popconfirm>
                    </span>
                ) : null
            }
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
                                        handleSubmit={createRequest}
                                        handleCancel={() => setCreateModalOpen(false)}/>
                </div>
                <Table dataSource={requests} columns={columns}/>;
            </div>
        </Content>
    );
};
export default RequestPage;
