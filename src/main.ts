import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faLocationDot,
  faUser,
  faGavel,
  faUserTie,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "./index.css";
import "vue-universal-modal/dist/index.css";
import VueUniversalModal from "vue-universal-modal";
import Maska from "maska";

library.add(faLocationDot, faUser, faGavel, faUserTie, faCircleExclamation);

const app = createApp(App);

app.use(router);
app.use(VueUniversalModal, {
  teleportTarget: "#modals",
});
app.use(Maska);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
