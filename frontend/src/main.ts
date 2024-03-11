import { createApp } from "vue";
import "./main.css";
import { router } from "./router/Router";
import App from "./App.vue";
import Vueform from "@vueform/vueform";
import vueformConfig from "../vueform.config";

const app = createApp(App);
app.use(Vueform, vueformConfig);
app.use(router);
app.mount("#app");
