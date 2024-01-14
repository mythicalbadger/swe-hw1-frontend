import React, {useState} from 'react';
import {Button, DatePicker, Form, Input, message, Modal} from 'antd';
import axios from "axios";
import delay from "../utils/delay";

interface CreateRequestModalProps {
    createModalOpen: boolean;
    handleCancel: () => void;
}

type FieldType = {
    start_date?: Date;
    end_date?: Date;
    reason?: string;
};

const CreateRequestModal: React.FC<CreateRequestModalProps> = (props) => {
    const token = localStorage.getItem("token");
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [form] = Form.useForm();

    const onSubmit = async (values: any) => {
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
            props.handleCancel();
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

    return (
        <>
            <Modal
                title="Title"
                open={props.createModalOpen}
                okText={"Submit"}
                onOk={() => form.validateFields().then(async (values) => {
                    form.resetFields();
                    await onSubmit(values);
                }).catch((info) => {
                    console.log(info);
                })}
                confirmLoading={confirmLoading}
                onCancel={() => {
                    form.resetFields();
                    props.handleCancel();
                }}
            >
                <Form
                    name="basic"
                    form={form}
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    style={{maxWidth: 600}}
                    onFinish={onSubmit}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Start Date"
                        name="start_date"
                        rules={[{required: true, message: 'Please select a start date!'}]}
                    >
                        <DatePicker/>
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="End Date"
                        name="end_date"
                        rules={[{required: true, message: 'Please select an end date!'}]}
                    >
                        <DatePicker/>
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Reason"
                        name="reason"
                        rules={[{required: true, message: 'Please specify the reason!'}]}
                    >
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default CreateRequestModal;