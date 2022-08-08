import { useEffect, useState } from "react";
import TodoDataService from "../api/todo/TodoDataService";
import { loggedInUser } from "../api/todo/AuthenticationService";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export default function ListTodosComponent() {
  const [todos, setTodosList] = useState([]);
  const [uiSuccessMessage, setUiSuccessMessage] = useState("");
  const [deletedStatus, setDeletedStatus] = useState(false);
  const navigate = useNavigate();
  // const todos = [
  //   {
  //     id: 1,
  //     description: "Learn to drive motorcycle",
  //     done: false,
  //     targetDate: new Date(),
  //   },
  //   {
  //     id: 2,
  //     description: "Learn to swim",
  //     done: false,
  //     targetDate: new Date(),
  //   },
  //   {
  //     id: 3,
  //     description: "Travel to Egypt",
  //     done: false,
  //     targetDate: new Date(),
  //   },
  // ];

  useEffect(() => {
    // const user = loggedInUser();
    // if (user != null) {
    TodoDataService.retrieveAllTodos("vvp19")
      .then((response) => {
        setTodosList(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    //  }
  }, []);

  function deleteTodoClicked(id) {
    TodoDataService.deleteTodo("vvp19", id)
      .then((response) => {
        setUiSuccessMessage(`Successfully deleted todo:  ${id} `);
        setDeletedStatus(true);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateTodoClicked(id) {
    navigate(`/todo/${id}`);
  }

  function addTodoClicked() {
    navigate(`/todo/-1`);
  }

  return (
    <div>
      <h1>List Todos</h1>
      {deletedStatus && (
        <div className="alert alert-success">{uiSuccessMessage}</div>
      )}

      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Status</th>
              <th>Target Date</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.description}</td>
                <td>{todo.done.toString()}</td>
                <td>{moment(todo.targetDate).format("YYYY-MM-DD")}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={(event) => {
                      updateTodoClicked(todo.id);
                    }}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={(event) => {
                      deleteTodoClicked(event.target.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="row">
          <button className="btn btn-success" onClick={addTodoClicked}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
