import { store } from "quasar/wrappers";
import * as auth from "./auth.store";
import * as user from "./user.store";
import * as people from "./people.store";
import { createStore } from "vuex";

// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

//export default store(function (/* { ssrContext } */) {°
const Store = createStore({
  modules: {
    auth,
    user,
    people,
  },

  // enable strict mode (adds overhead!)
  // for dev mode and --debug builds only
  strict: process.env.DEBUGGING,
});

export default Store;
//});
