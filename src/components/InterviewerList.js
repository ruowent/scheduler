// import React from "react";
// import "components/InterviewerListItem.scss";
// import InterviewerListItem from "./InterviewerListItem";


// export default function InterviewerList(props) {
//   const interviewersList = props.interviewers.map(int => (
//     <InterviewerListItem
//       key={int.id}
//       name={int.name}
//       avatar={int.avatar}
//       selected={int.id === props.interviewer}
//       setInterviewer={props.setInterviewer}
//     />
//   ));
//   return (
//     <section className="interviewers">
//       <h4 className="interviewers__header text--light">Interviewer</h4>
//       <ul className="interviewers__list">{interviewersList}</ul>
//     </section>
//   )
// }



import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types';
//interviewers:array - an array of objects containing the information of each interviewer
//interviewer:number - the id of an interviewer
//setInterviewer:function - a function that accepts an interviewer id
function InterviewerList(props) {
  const passedInterviewerList = props.interviewers.map(
    (interviewer) => (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={event => props.onChange(interviewer.id)}
      />
    )
  );
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{passedInterviewerList}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;