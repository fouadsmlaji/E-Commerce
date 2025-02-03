import { useEffect } from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { Axios } from "../../../Api/Axios";
import { USER } from "../../../Api/Api";
import { useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "../../../Components/Loading/LoadingScreen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function UserUpdate() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [disable, setDisable] = useState(true);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //Get user id
  const { id } = useParams();

  //Get User Info
  useEffect(() => {

    setLoading(true); 
    Axios.get(`/${USER}/${id}`)
      .then((data) => {
        
        setForm({
          name: data.data.name,
          email: data.data.email,
          role: data.data.role,
        });
        setLoading(false); 
      })
      .then(() => setDisable(false)).catch(() => navigate('/dashboard/users/page/404', {replace: true})) //wait until the data loads
  }, []);

  // Handle Submit
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await Axios.post(`${USER}/edit/${id}`, form);
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
    {loading && <LoadingScreen/>}
      <Form className="bg-white w-100 mx-2 p-4" onSubmit={handleSubmit}>
        <h1 className="mb-4" style={{fontWeight:"200  "}}>Update User</h1>
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
          <Form.Label>Role</Form.Label>
          <Form.Select value={form.role} onChange={handleFormChange} name="role">
        <option disabled value="">Select Role</option>
          <option value="1995">Admin</option>
          <option value="2001">User</option>
          <option value="1996">Editor</option>
          <option value="1999">Product Manager</option>
        </Form.Select>
        </Form.Group>
        
        <button className="btn btn-primary" type="submit" disabled={disable}>
          Save Changes
        </button>
      </Form>
    </>
  );
}
