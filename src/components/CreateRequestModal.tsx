import React, { useState } from "react";
import { DatePicker, Form, Input, Modal } from "antd";
import moment from "moment";

interface CreateRequestModalProps {
  createModalOpen: boolean;
  handleSubmit: (values: any) => void;
  handleCancel: () => void;
}

type FieldType = {
  start_date?: Date;
  end_date?: Date;
  reason?: string;
};

const CreateRequestModal: React.FC<CreateRequestModalProps> = (props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  return (
    <>
      <Modal
        title="Title"
        open={props.createModalOpen}
        okText={"Submit"}
        onOk={() =>
          form
            .validateFields()
            .then(async (values) => {
              form.resetFields();
              props.handleSubmit(values);
            })
            .catch((info) => {
              console.log(info);
            })
        }
        confirmLoading={confirmLoading}
        onCancel={() => {
          form.resetFields();
          props.handleCancel();
        }}
      >
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Start Date"
            name="start_date"
            rules={[{ required: true, message: "Please select a start date!" }]}
          >
            <DatePicker
              disabledDate={(current: any) => {
                return (
                  moment().add(-1, "days") >= current ||
                  moment().add(1, "month") <= current
                );
              }}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="End Date"
            name="end_date"
            rules={[{ required: true, message: "Please select an end date!" }]}
          >
            <DatePicker
              disabledDate={(current: any) => {
                return (
                  moment().add(-1, "days") >= current ||
                  moment().add(1, "month") <= current
                );
              }}
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="Reason"
            name="reason"
            rules={[{ required: true, message: "Please specify the reason!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateRequestModal;
