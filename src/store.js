import { createStore } from "vuex";
import axios from "axios";
const store = createStore({
  state() {
    return {
      name: "kim",
      age: 27,
    };
  },
  mutations: {},
  actions: {},
});

export default store;
