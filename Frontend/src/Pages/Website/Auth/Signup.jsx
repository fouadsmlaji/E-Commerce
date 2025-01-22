import axios from "axios";
import { useState } from "react";
import { baseURL, REGISTER } from "../../../Api/Api.js";
import LoadingScreen from '../../../Components/Loading/LoadingScreen.jsx'
import Cookie from "cookie-universal";
import { Form, FormControl } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";

export default function Signup() {

    // States
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    
    const navigate = useNavigate();
    
    //Loading
    const [loading, setloading] = useState(false);

    //error
    const [err, setErr] = useState("");

     //Cookies    
    const cookie = Cookie(); 

    // handle form function
    function handleFormChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    // handle submit function
    async function handleSubmit(e) {
        e.preventDefault();
        setloading(true);
        try {
            
            const res = await axios.post(`${baseURL}/${REGISTER}`, form);
            setloading(false);
            const token = res.data.token;
            cookie.set('Ecookie', token);

            navigate("/dashboard/users", {replace:true});
            console.log("Successfully Registered");
        } catch (err) {
            setloading(false);
            if (err.response && err.response.status === 422) {
                setErr("Email is already been taken");
            } else {
                setErr("Internal server error");
            }
            
        }   
    }

    const FormGroupStyle = {

        marginTop: "10px",
        position: "relative",
        border: "none",
        width: "40%",
        padding: "0",
   
    }

    return (
        <>
        {loading && <LoadingScreen/>}
        <div className="container h-100">
        <div className="row h-100 d-flex flex-column align-items-center justify-content-center">
          <Form onSubmit={handleSubmit} className="form">
            <h1 className="mb-4">Signup</h1>

            <Form.Group className="mb-3 FormGroup" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
              <FormControl
                value={form.name}
                onChange={handleFormChange}
                type="text"
                name="name"
                placeholder="Enter Your Name"
                required
                
              />
            </Form.Group>

            <Form.Group className="mb-3 FormGroup" controlId="exampleForm.ControlInput2" style={FormGroupStyle}>
              <FormControl
                value={form.email}
                onChange={handleFormChange}
                type="email"
                name="email"
                placeholder="Enter Your Email"
                required
                
              />
            </Form.Group>

            <Form.Group className="mb-3 FormGroup" controlId="exampleForm.ControlInput3" style={FormGroupStyle}>
              <FormControl
                value={form.password}
                onChange={handleFormChange}
                type="password"
                name="password"
                placeholder="Enter Your Password"
                required
                minLength={8}

                
              />
            </Form.Group>

            <button type="submit" className="btn-primary mb-3">
            Signup
            </button>
            <div className="google-btn">
              <a href={`http://127.0.0.1:8000/login-google`}>
                <div className="google-icon-wrapper">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="40"
                    height="40"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#FFC107"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                    <path
                      fill="#FF3D00"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    ></path>
                    <path
                      fill="#4CAF50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    ></path>
                    <path
                      fill="#1976D2"
                      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                  </svg>
                  <span>Signup in with Google</span>
                </div>
              </a>
            </div>

            {err !== "" && <span className="error">{err}</span>}
          </Form>
        </div>
      </div>
        
        </>
    );
}