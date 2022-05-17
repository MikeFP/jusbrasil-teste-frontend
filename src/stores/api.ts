import { reactive } from "vue";
import axios from "axios";
import type Processo from "@/classes/processo";

export const apiStore = reactive({
  authenticated: false,
  controllers: [],
  async search(cnj: string): Promise<Processo> {
    const ctrl = new AbortController();
    this.controllers.push(ctrl);

    // Apparently, further requests only work if user was logged in previously.
    // The session cookies must be set and sent along with the requests for the
    // API to return successfully.
    if (!this.authenticated) {
      await this.authenticate();
    }

    return axios.get(`/api/tribproc/${cnj}`, {
      withCredentials: true, // To set session cookies.
      params: {
        tipo_numero: "8",
      },
      headers: {
        Authorization: "Bearer " + import.meta.env.VITE_API_KEY,
      },
      signal: ctrl.signal,
    });
  },

  async authenticate(): Promise<any> {
    if (this.authenticated) return Promise.resolve();

    const ctrl = new AbortController();
    this.controllers.push(ctrl);

    await axios.post(
      "/user/login",
      {
        "credentials.username": import.meta.env.VITE_API_USERNAME,
        "credentials.password": import.meta.env.VITE_API_PASSWORD,
      },
      {
        withCredentials: true, // To set session cookies.
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        signal: ctrl.signal,
      }
    );
    this.authenticated = true;
  },

  cancelRequests() {
    this.controllers.forEach((ctrl) => ctrl.abort());
    this.controllers = [];
  },
});
