import React, { Fragment } from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  // Will be used in the Form component 
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    console.log("props = ", props)
    transition(SAVING);
    props.
      bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(err => console.log(err));
  }
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
    </article>
  );
};
