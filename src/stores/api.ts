import { reactive } from "vue";
import axios, { type AxiosResponseHeaders } from "axios";
import type Processo from "@/classes/processo";

export const apiStore = reactive({
  authenticated: false,
  controllers: [],
  async search(cnj: string): Promise<Processo> {
    const ctrl = new AbortController();
    this.controllers.push(ctrl);
    if (!this.authenticated) {
      await this.authenticate();
    }
    return axios.get(`/api/tribproc/${cnj}`, {
      withCredentials: true,
      params: {
        tipo_numero: "8",
        api_key: "5af8ba4c-43e3-4361-9e9c-f73458ab6a5b",
      },
      signal: ctrl.signal,
    });
  },

  async authenticate(): Promise<any> {
    if (this.authenticated) return Promise.resolve();
    const ctrl = new AbortController();
    this.controllers.push(ctrl);
    const res = await axios.post(
      "/user/login",
      {
        "credentials.username": "teste.frontend@digesto.com.br",
        "credentials.password": "12345678",
      },
      {
        withCredentials: true,
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
  },
});
