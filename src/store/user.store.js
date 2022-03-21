import { userKey, showErrorToast } from "../shared/global";

import user from "../services/user.service";
import route from "../router/index";

export const namespaced = true;
export const state = {
  user: { teste: "teste" },
};

export const getters = {};

export const mutations = {};

export const actions = {
  newUser: async ({ commit, dispatch }, data) => {
    const response = await user._create(data);

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

  newPassword: async (context, { payload }) => {
    const response = await user._updatepassword(payload);
    return response;
  },
};
