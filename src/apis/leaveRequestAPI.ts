import { api } from "./configs/axiosConfig";
import { message } from "antd";

export const LeaveRequestAPI = {
  getAllLeaveRequests: async function getAllLeaveRequests() {
    try {
      const token = localStorage.getItem("token");
      const response = api.request({
        url: "/api/get-all-leave-requests",
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      return response;
    } catch (error: any) {
      console.error("Create leave request failed", error);

      if (error.response) {
        message.error(error.response.data.detail);
      } else if (error.request) {
        message.error("Network error, please try again.");
      } else {
        message.error("An error occurred, please try again later.");
      }
    }
  },
  createRequest: async function createRequest(values: any) {
    try {
      const token = localStorage.getItem("token");
      const data = {
        start_date: values.start_date,
        end_date: values.end_date,
        reason: values.reason,
      };
      const response = await api.request({
        url: "/api/create-leave-request",
        method: "POST",
        data: data,
        headers: { Authorization: `Bearer ${token}` },
      });
      return response;
    } catch (error: any) {
      console.error("Create leave request failed", error);

      if (error.response) {
        message.error(error.response.data.detail);
      } else if (error.request) {
        message.error("Network error, please try again.");
      } else {
        message.error("An error occurred, please try again later.");
      }
    }
  },
  deleteRequest: async function deleteRequest(request_id: string) {
    try {
      const token = localStorage.getItem("token");
      await api.request({
        url: `/api/delete-leave-request/${request_id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error: any) {
      console.error("Delete request failed.", error);

      if (error.response) {
        message.error(error.response.data.detail);
      } else if (error.request) {
        message.error("Network error, please try again.");
      } else {
        message.error("An error occurred, please try again later.");
      }
    }
  },
  approveRequest: async function approveRequest(request_id: string) {
    try {
      const token = localStorage.getItem("token");
      await api.request({
        url: `/api/approve-leave-request/${request_id}`,
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error: any) {
      console.error("Approve request failed.", error);

      if (error.response) {
        message.error(error.response.data.detail);
      } else if (error.request) {
        message.error("Network error, please try again.");
      } else {
        message.error("An error occurred, please try again later.");
      }
    }
  },
  denyRequest: async function denyRequest(request_id: string) {
    try {
      const token = localStorage.getItem("token");
      await api.request({
        url: `/api/deny-leave-request/${request_id}`,
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error: any) {
      console.error("Deny request failed.", error);

      if (error.response) {
        message.error(error.response.data.detail);
      } else if (error.request) {
        message.error("Network error, please try again.");
      } else {
        message.error("An error occurred, please try again later.");
      }
    }
  },
};
