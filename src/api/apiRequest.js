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

    if (queryParams) {
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
        console.log(response.data,"response")
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
// import axios from "axios";
// import qs from "qs";
// import endpoints from "./endpoints";
// import { baseUrl } from "./baseUrl";

// const apiRequest = async (endpointKey, data = {}, pathParams = {}, queryParams = {}) => {
//   try {
//     const endpoint = endpoints[endpointKey];

//     if (!endpoint) {
//       throw new Error(`Endpoint "${endpointKey}" not found.`);
//     }

//     // Generate URL
//     let url = typeof endpoint.url === "function" ? endpoint.url(pathParams) : endpoint.url;

//     if (queryParams && Object.keys(queryParams).length) {
//       url += qs.stringify(queryParams, { addQueryPrefix: true });
//     }

//     const jwt_token = localStorage.getItem("jwt_token");

//     const config = {
//       method: endpoint.method,
//       url: `${baseUrl}${url}`,
//       headers: {
//         Authorization: jwt_token ? `Bearer ${jwt_token}` : undefined,
//         "Content-Type": "application/json",
//       },
//       ...(endpoint.method === "get" ? { params: queryParams } : { data }),
//     };

//     console.log("API Request Config:", config);

//     const response = await axios(config);

//     console.log("API Response:", response.data);

//     return response.data;
//   } catch (error) {
//     console.error("API Request Error:", error);
//     throw error.response?.data || { message: error.message };
//   }
// };

// export default apiRequest;

