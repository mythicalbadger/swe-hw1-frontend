import {api} from "./configs/axiosConfig"
import {message} from "antd";
import axios from "axios";

export const UserAPI = {
    login: async function (username: string, password: string) {
        try {
            const formData = new FormData();
            formData.append("username", username);
            formData.append("password", password);

            const response = await api.request({
                url: "/token",
                method: "POST",
                data: formData
            });

            message.success("Success");

            return response;
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
    },
    register: async function (full_name: string, username: string, password: string) {
        try {
            const data = {
                username: username,
                full_name: full_name,
                password: password
            };
            await api.request({
                url: "/register",
                method: "POST",
                data: data
            });
        } catch (error: any) {
            console.error('Register failed', error);

            if (error.response) {
                message.error(error.response.data.detail);
            } else if (error.request) {
                message.error('Network error, please try again.');
            } else {
                message.error('An error occurred, please try again later.');
            }
        }
    },
    getUserInfo: async function () {
        const token = localStorage.getItem("token");
            try {
                return await api.request({
                    url: "/api/get-current-user",
                    method: "GET",
                    headers: {Authorization: `Bearer ${token}`}
                });
            } catch (error: any) {
                console.error('Get user info failed', error);

                if (error.response) {
                    message.error(error.response.data.detail);
                } else if (error.request) {
                    message.error('Network error, please try again.');
                } else {
                    message.error('An error occurred, please try again later.');
                }

            }
    }
}