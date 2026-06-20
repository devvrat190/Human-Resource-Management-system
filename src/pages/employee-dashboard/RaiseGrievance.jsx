import { useState } from "react";
import { createGrievance } from "../../services/employeeActionsService";
import "./employeeActions.css";

export default function RaiseGrievance() {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const submit = async () => {
    await createGrievance({ category, description });
    alert("Grievance submitted");
  };

  return (
    <div className="action-page">
      <h1>Raise Grievance</h1>

      <input placeholder="Category" onChange={e => setCategory(e.target.value)} />
      <textarea placeholder="Description" onChange={e => setDescription(e.target.value)} />

      <button onClick={submit}>Submit</button>
    </div>
  );
}
