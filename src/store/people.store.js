import people from "../services/people.service";

export const namespaced = true;
export const state = {
  people: [],
};

export const getters = {};

export const mutations = {
  SET_PEOPLE: (state, people) => {
    state.people = people;
  },
};

export const actions = {
  getPeople: async ({ commit, dispatch }, data) => {
    const response = await people._findAll(data);
    if (response.status === 200) {
      commit("SET_PEOPLE", response.data);
    }
    return response;
  },

  newPassword: async (context, { payload }) => {
    const response = await user._updatepassword(payload);
    return response;
  },
};
