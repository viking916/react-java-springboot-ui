import axios from "axios";

class HelloWorldService {
  executeHelloWorldService() {
    return axios.get("http://localhost:8080/hello-world");
  }

  executeHelloWorldBeanService() {
    return axios.get("http://localhost:8080/hello-world-bean");
  }

  executeHelloWorldPathVariableService(name) {
    let username = "viking";
    let password = "morde";

    //Creating structure of basic auth header
    let basicAuthHeader = "Basic " + window.btoa(username + ":" + password);
    return axios.get(
      `http://localhost:8080/hello-world/path-variable/${name}`,
      { withCredentials: true },
      {
        headers: {
          authorization: basicAuthHeader,
        },
      }
    );
  }
}

export default new HelloWorldService();
