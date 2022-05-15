import type Processo from "./processo";
import json from "./mock-response.json";

export const processo: Processo = JSON.parse(JSON.stringify(json));
