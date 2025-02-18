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
        if (error.response) {
          rej(error.response.data);
        } else {
          rej({ message: error.message });
        }
      });
  });
};

export default apiRequest;


