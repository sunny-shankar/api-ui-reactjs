import axios from "axios";
import { useState } from "react";

const Column = ({ apiObj }) => {
  const [response, setResponse] = useState();
  const [err, setError] = useState();

  const getStatusFromCode = (statusCode) => {
    let status = "error";
    if (statusCode === 200) {
      status = "Success";
    }
    return status;
  };

  const getButtonColor = (statusCode) => {
    let response;
    if (statusCode === 200) {
      response = "btn btn-success mx-5";
    } else {
      response = "btn btn-error mx-5";
    }
    return response;
  };
  const requestHandler = async (url, method) => {
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

    instance(config)
      .then((res) => {
        setResponse(res);
      })
      .catch((err) => {
        setError(err);
      });
  };
  return (
    <div className="main mx-auto border my-5 py-4 px-10 shadow-lg rounded">
      <div className="container flex items-center justify-between my-5">
        <button
          className={
            response ? getButtonColor(response.status) : "btn btn-primary mx-5"
          }
          onClick={() => {
            requestHandler(apiObj["url"], "get");
          }}
        >
          {apiObj["name"]}
        </button>
        <input
          readOnly
          type="text"
          id="response"
          className="input input-bordered input-lg w-full max-w-xs box-content"
          value={response ? JSON.stringify(response.data) : ""}
        />
        <span id="responseStatus" className="mx-5">
          {response
            ? `Status Code: ${response.status} - [${getStatusFromCode(
                response.status
              )}]`
            : ""}
        </span>
        <span id="responseTime" className="mx-5">
          {response
            ? `Response Time: ${response.headers["request-duration"]} ms`
            : ""}
        </span>
      </div>
      <div className={err ? "alert alert-error shadow-lg" : "hidden"}>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{err ? err.message : ""}</span>
        </div>
      </div>
    </div>
  );
};

export default Column;
