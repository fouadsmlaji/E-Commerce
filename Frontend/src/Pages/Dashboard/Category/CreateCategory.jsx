import { useState } from "react";
import Form from "react-bootstrap/Form";
import { Axios } from "../../../Api/Axios";
import { CATEGORY } from "../../../Api/Api";
import { FormControl, FormGroup } from "react-bootstrap";

export default function CreateCategory() {
  const [form, setForm] = useState({
    title: "",
    image: null,
  });

  // Handle Submit
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("image", form.image);
    try {
      await Axios.post(`${CATEGORY}/add`, formData);
      window.location.pathname = "/dashboard/categories";
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
      <Form className="bg-white w-100 mx-2 p-4" onSubmit={handleSubmit}>
        <h1 style={{ fontWeight: "200" }} className="mb-4">
          Create Category
        </h1>
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
        <button
          className="btn btn-primary"
          type="submit"
          disabled={!form.title || !form.image}
        >
          Create
        </button>
      </Form>
    </>
  );
}
