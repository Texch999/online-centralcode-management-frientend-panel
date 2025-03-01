import axios from "axios";
import qs from "qs";
import endpoints from "./endpoints";
import { baseUrl } from "./baseUrl";

const apiRequest = (
  endpointKey,
  data = null,
  pathParams = null,
  queryParams = null
) => {
  return new Promise((res, rej) => {
    const endpoint = endpoints[endpointKey];
    let url =
      typeof endpoint.url === "function"
        ? endpoint.url(pathParams)
        : endpoint.url;

    console.log("Final API URL:", url);
    console.log(queryParams);

    if (queryParams) {
      // Ensure queryParams include pagination params like limit and offset
      const queryString = qs.stringify(queryParams, { addQueryPrefix: true });
      url += queryString;
    }

    const jwt_token = localStorage.getItem("jwt_token");
    axios({
      method: endpoint.method,
      url: `${baseUrl}${url}`,
      data: data,
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    })
      .then((response) => {
        res(response?.data);
      })
      .catch((error) => {
        console.log(error.response, "==> axios error");

        if (error.response) {
          let status = error.response.status;
          let message;

          const errorMessage =
            error.response.data?.message || "An unknown error occurred";

          if (typeof errorMessage === "string") {
            message = [errorMessage];
          } else if (Array.isArray(errorMessage)) {
            message = errorMessage;
          } else if (typeof errorMessage === "object") {
            message = Object.values(errorMessage).flat();
          } else {
            message = ["An unknown error occurred"];
          }

          switch (status) {
            case 422:
              rej({ status, message });
              break;
          
            
            case 429:
              rej({
                status,
                message: ["Too many requests. Please try again later."],
              });
              break;
            case 403:
              rej({
                status,
                message: [
                  "Forbidden: You do not have permission to access this resource.",
                ],
              });
              break;
            case 409:
              rej({ status, message: ["Please try again later."] });
              break;
            case 500:
            default:
              rej({
                status,
                message: ["Network error or something went wrong."],
              });
              break;
          }
        } else {
          rej({
            status: 500,
            message: ["Network error or no response received."],
          });
        }
      });
  });
};

export default apiRequest;
