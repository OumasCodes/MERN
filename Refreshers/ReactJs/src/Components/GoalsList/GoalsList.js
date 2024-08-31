import React from "react";

import "./GoalsList.css";

const GoalsList = (props) => {
  return (
    <ul className="goals-list">
      {props.goals.map((goal) => {
        return <li key={goal.id}>{goal.text}</li>;
      })}
    </ul>
  );
};

export default GoalsList;
