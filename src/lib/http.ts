interface CustomeRequest extends RequestInit {
  body?: any;
}
type methodType = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
const htppRequest = async (method: methodType, fullURL: string, option?: CustomeRequest) => {
  let body = JSON.stringify(option?.body);
  let headers: HeadersInit = option?.headers || {};
  const credentials = option?.credentials;
  const cache = option?.cache;

  const dataResponse = await fetch(fullURL, {
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    cache,
    body,
    credentials,
    method,
  });
  if (!dataResponse.ok) {
    throw dataResponse;
  }
  const data = await dataResponse.json();

  return data;
};
export default htppRequest;
export const http = {
  get(url: string, option?: Omit<CustomeRequest, "body">) {
    return htppRequest("GET", url, option);
  },
  post(url: string, body: any, option: Omit<CustomeRequest, "body">) {
    return htppRequest("POST", url, { ...option, body });
  },
  put(url: string, body: any, option: Omit<CustomeRequest, "body">) {
    return htppRequest("PUT", url, { ...option, body });
  },
  delete(url: string, body: any, option: Omit<CustomeRequest, "body">) {
    return htppRequest("DELETE", url, { ...option, body });
  },
};
