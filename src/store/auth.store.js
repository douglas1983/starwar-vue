import { userKey, showErrorToast } from "../shared/global";

import auth from "../services/auth.service";
import route from "../router/index";

export const namespaced = true;
export const state = {
  token: "",
  user: { teste: "teste" },
  resetCode: "",
};

export const getters = {
  getToken: (state) => state.token,
  loggedIn: (state) => !!state.token,
};

export const mutations = {
  SET_TOKEN: (state, token) => {
    sessionStorage.setItem(userKey, token);
    state.token = token;
  },
  SET_RESETCODE: (state, resetcode) => {
    state.resetCode = resetcode;
  },
  SET_USERLOGIN: (state, user) => {
    state.user = user;
  },
};

export const actions = {
  login: async ({ commit, dispatch }, loginData) => {
    dispatch("removeToken");

    const response = await auth._login(loginData);

    if (response.status === 201) {
      await commit("SET_TOKEN", response.data.access_token);
    }

    return response.data;
  },

  getUserLogin: async ({ commit }) => {
    const response = await auth._getProfile();

    if (response.status === 200) {
      const { data } = response;

      commit("SET_USERLOGIN", data);
    }
    return response;
  },

  forgotPassword: async ({ commit, dispatch }, payload) => {
    dispatch("removeToken");

    const response = await auth._forgotPassword(payload);

    if (response.status === 200) {
      const { data } = response;
      const resetCode = data.recovery_code;
      commit("SET_RESETCODE", resetCode);
    } else {
      showErrorToast("Dados inválidos ");
    }

    return response;
  },
  newPassword: async (context, { payload, resetCode }) => {
    const response = await auth._resetPassword(payload, resetCode);
    return response;
  },

  logout: ({ commit }) => {
    commit("SET_TOKEN", null);
    sessionStorage.clear();
    /* route.push({
      name: "login"
    }); */
  },

  removeToken: ({ commit }) => {
    auth._removeToken();
    localStorage.removeItem(userKey);
    commit("SET_TOKEN", "");
  },
};
