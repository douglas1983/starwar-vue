import { Loading, Dialog } from "quasar";
import { http, tokenBearer } from "./http";

const _findAll = async (page) => {
  Loading.show();
  let user = {};
  try {
    user = await http
      .get(`/people/?page=${page}`, tokenBearer())
      .then((response) => response)
      .catch((error) => error);
  } finally {
    Loading.hide();
  }

  return user;
};

export default {
  _findAll,
};
