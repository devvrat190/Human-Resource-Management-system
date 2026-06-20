import { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../../services/employeeService";
import { useNavigate } from "react-router-dom";
import "./employees.css";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    const data = await getEmployees();
    setEmployees(data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete employee?")) return;
    await deleteEmployee(id);
    loadEmployees();
  };

  return (
    <div className="employee-page">
      <div className="employee-header">
        <h1>Employees</h1>
        <button onClick={() => navigate("/employees/new")}>
          + Add Employee
        </button>
      </div>

      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.full_name}</td>
              <td>{emp.profiles?.email || "-"}</td>
              <td>{emp.profiles?.role || "-"}</td>
              <td>{emp.profiles?.status || "-"}</td>

              <td className="actions">
                <button onClick={() => navigate(`/employees/${emp.id}`)}>
                  View
                </button>
                <button onClick={() => navigate(`/employees/${emp.id}/edit`)}>
                  Edit
                </button>
                <button
                  className="danger"
                  onClick={() => handleDelete(emp.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {employees.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
