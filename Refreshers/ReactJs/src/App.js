import React, { useState } from "react";

import GoalsList from "./Components/GoalsList/GoalsList";
import NewGoal from "./Components/NewGoal/NewGoal";

const App = () => {
  const [goals, setGoals] = useState([
    { id: "goal1", text: "Git good" },
    { id: "goal2", text: "Finish the course good" },
    { id: "goal3", text: "Create my own project using MERN" },
  ]);

  const addNewGoalHandler = (newGoal) => {
    // setGoals(goals.concat(newGoal));
    setGoals((prevGoals) => {
      return prevGoals.concat(newGoal);
    });
  };

  return (
    <div>
      <h1>My Goals</h1>
      <NewGoal onAddGoal={addNewGoalHandler} />
      <GoalsList goals={goals} />
    </div>
  );
};

export default App;
