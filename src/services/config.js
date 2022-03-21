import { showErrorToast } from "../shared/global";
import store from "../store/index";

export const config = {
  timeout: 30 * 1000,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export const errorHandler = async (error) => {
  const err = error.response;
  const errorMessage = error.message;
  const status = error.response.status;

  // if (status === 401) {
  //   await store.dispatch("logout");
  //   return showErrorToast("Acesso negado");
  // }

  if (status === 403) {
    const msg = "Acesso restrito!";
    return showErrorToast(msg);
  }

  return { err, errorMessage };
};
