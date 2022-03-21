import { Loading, Dialog } from "quasar";
import { http } from "./http";
import { userKey } from "../shared/global";
const token = !!sessionStorage.getItem(userKey)
  ? sessionStorage.getItem(userKey)
  : "";
const tokenBearer = {
  headers: {
    Authorization: "Bearer " + token,
  },
};

const _login = async (payload) => {
  Loading.show();
  let login = {};
  try {
    login = await http
      .post("/auth/login", payload)
      .then((response) => response)
      .catch((error) => error);
  } finally {
    Loading.hide();
  }

  return login;
};
const _getProfile = async (payload) => {
  Loading.show();
  let profile = {};
  try {
    profile = await http
      .get("/profile", tokenBearer)
      .then((response) => response)
      .catch((error) => error);
  } finally {
    Loading.hide();
  }

  return profile;
};

const _forgotPassword = async (payload) => {};
const _resetPassword = async (payload, resetCode) => {};
const _checkToken = async (payload) => {};
const _storeToken = (token) => {};

const _removeToken = () => {};

export default {
  _login,
  _getProfile,
  _storeToken,
  _removeToken,
  _forgotPassword,
  _resetPassword,
  _checkToken,
};
