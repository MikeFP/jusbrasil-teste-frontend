import { reactive } from "vue";
import axios, { AxiosError, type AxiosResponseHeaders } from "axios";

export const apiStore = reactive({
  session: "",
  search(cnj: string): Promise<Array<any>> {
    return axios.get(`/api/tribproc/${cnj}`, {
      params: {
        tipo_numero: "8",
      },
    });
  },

  async authenticate(): Promise<any> {
    if (this.session !== "") return Promise.resolve();
    let headers: AxiosResponseHeaders;
    try {
      const res = await axios.get("/api/user/current", {withCredentials: true});
      headers = res.headers;
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        headers = e.response.headers!;
      } else {
        throw e;
      }
    }
    console.log(headers);
    const cookies = headers["set-cookie"] ?? [""];
    const session = cookies.find((val) => val.split("=")[0] === "session");
    console.log(session);
    this.session = session ?? "";
  },
});
