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

const _findAll = async (page) => {
  Loading.show();
  let user = {};
  try {
    user = await http
      .get(`/people/?page=${page}`, tokenBearer)
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
