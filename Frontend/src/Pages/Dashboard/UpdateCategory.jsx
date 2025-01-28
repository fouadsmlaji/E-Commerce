import { useEffect } from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { Axios } from "../../Api/Axios";
import { CATEGORY, USER } from "../../Api/Api";
import { useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "../../Components/Loading/LoadingScreen";
import { FormControl, FormGroup } from "react-bootstrap";


export default function UpdateCategory() {

  const [form, setForm] = useState({
    title: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
 
  const navigate = useNavigate();

  //Get user id
  const { id } = useParams();

  //Get User Info
  useEffect(() => {

    setLoading(true); 
    Axios.get(`/${CATEGORY}/${id}`)
      .then((data) => {
        
        setForm({
          title: data.data.title,
        });
        setLoading(false); 
      })
      .catch(() => navigate('/dashboard/categories/page/404', {replace: true})) //wait until the data loads
  }, []);

  // Handle Submit
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("image", form.image);
    try {
      const res = await Axios.post(`${CATEGORY}/edit/${id}`, formData);
      window.location.pathname =   "/dashboard/categories";
    } catch (err) { 
      console.log(err);
    }
  }

  // Handle Form Change
  function handleFormChange(e) {
    if (e.target.type === "file") {
        setForm({ ...form, [e.target.name]: e.target.files[0] });
      } else {
        setForm({ ...form, [e.target.name]: e.target.value });
      }
  }

  return (
    <>
    {loading && <LoadingScreen/>}
      <Form className="bg-white w-100 mx-2 p-4" onSubmit={handleSubmit}>
        <h1 className="mb-4" style={{fontWeight:"200  "}}>Update Category</h1>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            type="text"
            placeholder="Category Title"
            value={form.title}
            onChange={handleFormChange}
            required
          />
        </Form.Group>
        <FormGroup className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Image</Form.Label>
          <FormControl name="image" onChange={handleFormChange} type="file" />
        </FormGroup>
       
        
        <button className="btn btn-primary" type="submit" >
          Save Changes
        </button>
      </Form>
    </>
  );
}
