import { useEffect } from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { Axios } from "../../Api/Axios";
import { USER } from "../../Api/Api";
import { useNavigate } from "react-router-dom";

export default function UserCreate() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  // Handle Submit
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await Axios.post(`${USER}/add`, form);
      window.location.pathname =   "/dashboard/users";
    } catch (err) {
      console.log(err);
    }
  }

  // Handle Form Change
  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <>
   
      <Form className="bg-white w-100 mx-2 p-4" onSubmit={handleSubmit}>
      <h1 style={{fontWeight:"200"}} className="mb-4">Create User</h1>  
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Joe Doe"
            value={form.name}
            onChange={handleFormChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="name@example.com"
            value={form.email}
            onChange={handleFormChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            value={form.password}
            onChange={handleFormChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
          <Form.Label>Role</Form.Label>
          <Form.Select
            value={form.role}
            onChange={handleFormChange}
            name="role"
          >
            <option disabled value="">
              Select Role
            </option>
            <option value="1995">Admin</option>
            <option value="2001">User</option>
            <option value="1996">Editor</option>
          </Form.Select>
        </Form.Group>

        <button
          className="btn btn-primary"
          type="submit"
          disabled={
            form.name.length > 1 &&
            form.email.length > 1 &&
            form.password.length > 7 &&
            form.role !== ""
              ? false
              : true
          }
        >
          Create
        </button>
      </Form>
    </>
  );
}
