import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import * as api from "../API/index";

const ProfilePage = () => {
  const { username } = useParams();
  const { state } = useLocation();

  useEffect(
    () => async () => {
      await api.getProfileData(username, state.token);
    },
    [username, state.token]
  );

  return <div>{username}</div>;
};

export default ProfilePage;
