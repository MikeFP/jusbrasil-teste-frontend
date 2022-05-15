import type Processo from "./processo";
import json from "./mock-response.json";
import dateReviver from "@/utils/date-reviver";

export const processo: Processo = JSON.parse(JSON.stringify(json), dateReviver);
