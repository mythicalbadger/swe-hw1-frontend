import React, { useState } from "react";
import { Layout } from "antd";
import { UserAPI } from "../apis/userAPI";

const { Content } = Layout;

type UserInfo = {
  username: string;
  full_name: string;
  remaining_leave_days: string;
};

const ProfilePage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: "",
    full_name: "",
    remaining_leave_days: "",
  });

  React.useEffect(() => {
    UserAPI.getUserInfo().then((response) => {
      setUserInfo(response?.data);
    });
  }, []);

  return (
    <Content
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          padding: 24,
          backgroundColor: "white",
          textAlign: "center",
          display: "block",
        }}
      >
        <p>Name: {userInfo.full_name}</p>
        <p>Username: {userInfo.username}</p>
        <p>Leave Days Remaining: {userInfo.remaining_leave_days}</p>
      </div>
    </Content>
  );
};
export default ProfilePage;
