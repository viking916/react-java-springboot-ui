import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TodoDataService from "../api/todo/TodoDataService";

export default function TodoComponent() {
  const [id, setId] = useState("");
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  let params = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    if (params.id === -1) {
      return;
    }
    TodoDataService.retrieveTodo("vvp19", params.id)
      .then((response) => {
        setId(params.id);
        setDescription(response.data.description);
        setTargetDate(moment(response.data.targetDate).format("YYYY-MM-DD"));
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function submitForm(values) {
    let todo = {
      id: params.id,
      description: values.description,
      targetDate: values.targetDate,
    };
    if (params.id === -1) {
      TodoDataService.createTodo("vvp19", todo)
        .then(() => {
          navigate("/todos", { replace: true });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      TodoDataService.updateTodo("vvp19", params.id, todo)
        .then(() => {
          navigate("/todos", { replace: true });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    console.log(values);
  }

  function validateForm(values) {
    let errors = {};
    if (!values.description) {
      errors.description = "Enter a description";
    } else if (values.description.length < 5) {
      errors.description = "Enter atleast 5 characaters in description";
    }

    if (!moment(values.targetDate).isValid()) {
      errors.targetDate = "Enter valid date";
    }
    return errors;
  }

  return (
    <div>
      <h1>Todo</h1>
      <div className="container">
        <Formik
          initialValues={{
            description: description,
            targetDate: targetDate,
          }}
          onSubmit={submitForm}
          validateOnChange={false}
          validateOnBlur={false}
          validate={validateForm}
          enableReinitialize={true}
        >
          <Form>
            <ErrorMessage
              name="description"
              component="div"
              className="alert alert-warning"
            ></ErrorMessage>
            <fieldset className="form-group">
              <label>Description</label>
              <Field
                className="form-control"
                type="text"
                name="description"
              ></Field>
            </fieldset>
            <fieldset className="form-group">
              <label>Target Date</label>
              <Field
                className="form-control"
                type="date"
                name="targetDate"
              ></Field>
            </fieldset>
            <button className="btn btn-success" type="submit">
              Save
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
