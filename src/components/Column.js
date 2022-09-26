import axios from "axios";
// import { useState } from "react";

const Column = ({ apiObj }) => {
  const [response, setResponse] = useState("");

  const getStatusFromCode = (statusCode) => {
    let status = "false";
    if (statusCode === 200) {
      status = "success";
    }
    return status;
  };
  const requestHandlerUp = (url, method) => {
    const instance = axios.create();

    instance.interceptors.request.use((config) => {
      config.headers["request-startTime"] = new Date().getTime();
      return config;
    });

    instance.interceptors.response.use((response) => {
      const currentTime = new Date().getTime();
      const startTime = response.config.headers["request-startTime"];
      response.headers["request-duration"] = currentTime - startTime;
      return response;
    });
    const config = { method: method, url: url };
    return instance(config);
  };
  return (
    <div className="container mx-auto">
      <button
        className="btn btn-secondary mx-10"
        onClick={async () => {
          let response;

          response = await requestHandlerUp(apiObj["url"], "get")
            .then((response) => response)
            .catch((error) => {
              console.log(error.status);
            });
          console.log(response);
          document.getElementById("response").value = JSON.stringify(
            response.data
          );
          console.log(response.status);
          document.getElementById(
            "responseStatus"
          ).innerHTML = `<b>Status:</b> ${
            response.status
          } - ${getStatusFromCode(response.status)}`;
          document.getElementById(
            "responseTime"
          ).innerHTML = `Response Time: ${response.headers["request-duration"]} ms`;
        }}
      >
        {apiObj["name"]}
      </button>
      <input
        readOnly
        type="text"
        id="response"
        className="input input-bordered input-lg w-full max-w-xs box-content"
      />
      <span id="responseStatus" className="mx-10"></span>
      <span id="responseTime" className="mx-10"></span>
    </div>
  );
};

export default Column;
