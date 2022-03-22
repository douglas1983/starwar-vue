import { Loading, Dialog } from "quasar";
import { http, tokenBearer } from "./http";

const _create = async (payload) => {
  Loading.show();
  let user = {};
  try {
    user = await http
      .post("/user", payload)
      .then((response) => response)
      .catch((error) => error);
  } finally {
    Loading.hide();
  }

  return user;
};
const _updatepassword = async (payload) => {
  const { id, ...data } = payload;
  Loading.show();
  let user = {};
  try {
    user = await http
      .post(`/user/${id}/password`, data, tokenBearer())
      .then((response) => response)
      .catch((error) => error);
  } finally {
    Loading.hide();
  }

  return user;
};

export default {
  _create,
  _updatepassword,
};
