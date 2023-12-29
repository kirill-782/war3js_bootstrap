import { consoleLog } from "@war3js/unsafe";
import { FetchRequest } from "./FetchRequest.js";

export const fetch = (url: string, options?: FetchRequest) => {
    consoleLog(0, url, options);
};
