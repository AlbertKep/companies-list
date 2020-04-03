import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import { store } from "./store/store";
import DatePicker from "v-calendar/lib/components/date-picker.umd";

Vue.config.productionTip = false;
new Vue({
  store,
  router,
  DatePicker,
  render: h => h(App)
}).$mount("#app");
