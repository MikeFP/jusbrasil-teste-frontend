import { reactive } from "vue";
import axios, { AxiosError, type AxiosResponseHeaders } from "axios";
import type Processo from "@/classes/processo";

export const apiStore = reactive({
  session: "",
  search(cnj: string): Promise<Processo> {
    return axios.get(`/api/tribproc/${cnj}`, {
      params: {
        tipo_numero: "8",
        api_key: "5af8ba4c-43e3-4361-9e9c-f73458ab6a5b",
      },
    });
  },

  async authenticate(): Promise<any> {
    if (this.session !== "") return Promise.resolve();
    let headers: AxiosResponseHeaders;
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
      }
    );
    headers = res.headers;
    console.log(headers);
    const cookies = headers["set-cookie"] ?? [""];
    const session = cookies.find((val) => val.split("=")[0] === "session");
    console.log(session);
    this.session = session ?? "";
  },
});
