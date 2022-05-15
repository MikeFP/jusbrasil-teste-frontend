import Processo from "./processo";
import json from "./mock-response.json";
import dateReviver from "@/utils/date-reviver";
import type { IProcesso } from "./processo";

const processoObj: IProcesso = JSON.parse(JSON.stringify(json), dateReviver);
export const processo = Processo.parse(processoObj);
