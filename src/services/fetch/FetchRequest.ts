export interface FetchRequest {
    method?: string;
    headers?: Record<string, Array<string> | string>;
    credentials?: "omit" | "include";
    redirect?: "flow" | "error";
    signal?: AbortSignal;
}
