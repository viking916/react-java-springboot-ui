import { Link } from "react-router-dom";
import HelloWorldService from "../api/todo/HelloWorldService";
import { useState } from "react";
export default function WelcomeComponent() {
  const [welcomeMessage, setWelcomeMessage] = useState("");
  function retreieveWelcomeMessage() {
    // HelloWorldService.executeHelloWorldService()
    //   .then((response) => {
    //     console.log(response);
    //     setWelcomeMessage(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // HelloWorldService.executeHelloWorldBeanService()
    // .then((response) => {
    //   console.log(response);
    //   setWelcomeMessage(response.data.message);
    // })
    // .catch((error) => {
    //   console.log(error);
    // });

    HelloWorldService.executeHelloWorldPathVariableService("vvp19")
      .then((response) => {
        console.log(response);
        setWelcomeMessage(response.data.message);
      })
      .catch((error) => {
        let errorMessage = "";
        if (error.message) {
          errorMessage += error.message;
        }
        if (error.response && error.response.data) {
          errorMessage += error.response.data.message;
        }
        setWelcomeMessage(errorMessage);
      });
  }

  return (
    <>
      <h1>Welcome</h1>
      <div className="container">
        Welcome, you can manage your todos <Link to="/todos">here</Link>
      </div>
      <div className="container">
        Click here to get customized welcome message.
        <button onClick={retreieveWelcomeMessage} className="btn btn-success">
          Get Welcome Message
        </button>
      </div>
      <div className="container">{welcomeMessage}</div>
    </>
  );
}
