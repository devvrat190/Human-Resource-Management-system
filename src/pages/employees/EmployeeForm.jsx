import { useEffect, useState } from "react";
import {
  createEmployee,
  getEmployeeById,
  updateEmployee,
} from "../../services/employeeService";
import { getDepartments } from "../../services/departmentService";
import { getZones } from "../../services/zoneService";
import { useNavigate, useParams } from "react-router-dom";
import "./employees.css";

export default function EmployeeForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);
  const [zones, setZones] = useState([]);

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    address: "",

    email: "",
    password: "",
    role: "employee",
    status: "active",
    department_id: "",
    zone_id: "",
    designation: "",
  });

  useEffect(() => {
    loadMeta();
    if (id) loadEmployee();
  }, [id]);

  const loadMeta = async () => {
    const [deptData, zoneData] = await Promise.all([
      getDepartments(),
      getZones(),
    ]);
    setDepartments(deptData);
    setZones(zoneData);
  };

  const loadEmployee = async () => {
    const data = await getEmployeeById(id);

    setForm({
      full_name: data.full_name || "",
      phone: data.phone || "",
      address: data.address || "",

      email: data.profiles.email || "",
      password: "",
      role: data.profiles.role || "employee",
      status: data.profiles.status || "active",
      department_id: data.profiles.department_id || "",
      zone_id: data.profiles.zone_id || "",
      designation: data.profiles.designation || "",
    });
  };

  const handleSubmit = async () => {
    if (!form.full_name || !form.email || (!id && !form.password)) {
      alert("Name, email and password are required");
      return;
    }

    if (!form.department_id || !form.zone_id) {
      alert("Please select Department and Zone");
      return;
    }

    try {
      if (id) {
        await updateEmployee(id, {
          full_name: form.full_name,
          phone: form.phone,
          address: form.address,
          role: form.role,
          status: form.status,
          department_id: form.department_id,
          zone_id: form.zone_id,
          designation: form.designation,
        });
      } else {
        await createEmployee(form);
      }

      navigate("/employees");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="employee-form">
      <h1>{id ? "Edit Employee" : "Add Employee"}</h1>

      {/* EMPLOYEE INFO */}
      <input
        placeholder="Full Name"
        value={form.full_name}
        onChange={(e) => setForm({ ...form, full_name: e.target.value })}
      />

      <input
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <input
        placeholder="Address"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />

      {/* PROFILE INFO */}
      <input
        placeholder="Email"
        disabled={!!id}
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      {!id && (
        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      )}

      <input
        placeholder="Designation"
        value={form.designation}
        onChange={(e) =>
          setForm({ ...form, designation: e.target.value })
        }
      />

      {/* DEPARTMENT DROPDOWN */}
      <select
        value={form.department_id}
        onChange={(e) =>
          setForm({ ...form, department_id: e.target.value })
        }
      >
        <option value="">Select Department</option>
        {departments.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>

      {/* ZONE DROPDOWN */}
      <select
        value={form.zone_id}
        onChange={(e) =>
          setForm({ ...form, zone_id: e.target.value })
        }
      >
        <option value="">Select Zone</option>
        {zones.map((z) => (
          <option key={z.id} value={z.id}>
            {z.name}
          </option>
        ))}
      </select>

      {/* ROLE & STATUS */}
      <select
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      >
        <option value="employee">Employee</option>
        <option value="supervisor">Supervisor</option>
        <option value="hr">HR</option>
        <option value="zone_admin">Zone Admin</option>
        <option value="admin">Admin</option>
      </select>

      <select
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <button onClick={handleSubmit}>
        {id ? "Update Employee" : "Create Employee"}
      </button>
    </div>
  );
}
