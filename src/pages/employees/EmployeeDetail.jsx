import { useEffect, useState } from "react";
import { getEmployeeById } from "../../services/employeeService";
import { useParams, useNavigate } from "react-router-dom";
import "./employees.css";

export default function EmployeeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getEmployeeById(id);
    setEmployee(data);
  };

  if (!employee) return null;

  return (
    <div className="employee-detail">
      <h1>{employee.full_name}</h1>
      <p><strong>Email:</strong> {employee.profiles.email}</p>
      <p><strong>Role:</strong> {employee.role}</p>
      <p><strong>Status:</strong> {employee.status}</p>

      <button onClick={() => navigate("/employees")}>Back</button>
    </div>
  );
}
