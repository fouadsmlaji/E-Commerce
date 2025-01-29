import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Axios } from "../../Api/Axios";
import { CATEGORIES, PRODUCT } from "../../Api/Api";

export default function CreateProduct() {
  const [form, setForm] = useState({
    category: "",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
  });

  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);

  // Handle Submit
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category", form.category);
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("discount", form.discount);
    formData.append("About", form.About);

    images.forEach((image) => formData.append("images[]", image));

    try {
      await Axios.post(`${PRODUCT}/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      window.location.pathname = "/dashboard/products";
    } catch (err) {
      console.error("Error uploading product:", err);
    }
  }

  // Handle Form Input Change
  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Handle Image Change
  function handleImageChange(e) {
    setImages([...e.target.files]);
 }

 // Get Categories
  useEffect(() => {
    Axios.get(`/${CATEGORIES}`)
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Mapping Categories
  const ShowCategory = categories.map((category, index) => (
    <option value={category.id} key={index}>{category.title}</option>
  ))

   // Mapping Images
   const ShowImages = images.map((image, index) => 
    <div className="d-flex flex-column align-items-center justify-content-center">
        <img src={URL.createObjectURL(image)} key={index} width={300} />
        <p>{image.name}</p>
        <p>{(image.size < 999 ? (image.size / 1024).toFixed(2) : image.size / (1024 * 1024)).toFixed(2)} MB  </p>
    </div>
    )

  return (
    <Form className="bg-white w-100 mx-2 p-4" onSubmit={handleSubmit}>
      <h1 style={{ fontWeight: "200" }} className="mb-4">
        Create Product
      </h1>

      {/* Category Selection */}
      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Select
          name="category"
          value={form.category}
          onChange={handleFormChange}
          required
        >
          <option value="" disabled>Select Category</option>
        {ShowCategory}
        </Form.Select>
      </Form.Group>

      {/* Title Input */}
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          name="title"
          type="text"
          placeholder="Product Title"
          value={form.title}
          onChange={handleFormChange}
          required
        />
      </Form.Group>

      {/* Description Input */}
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          name="description"
          type="text"
          placeholder="Product Description"
          value={form.description}
          onChange={handleFormChange}
          required
        />
      </Form.Group>

      {/* Price Input */}
      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control
          name="price"
          type="number"
          placeholder="Product Price"
          value={form.price}
          onChange={handleFormChange}
          required
        />
      </Form.Group>

      {/* Discount Input */}
      <Form.Group className="mb-3">
        <Form.Label>Discount</Form.Label>
        <Form.Control
          name="discount"
          type="number"
          placeholder="Product Discount"
          value={form.discount}
          onChange={handleFormChange}
          required
        />
      </Form.Group>

      {/* About Input */}
      <Form.Group className="mb-3">
        <Form.Label>About</Form.Label>
        <Form.Control
          name="About"
          type="text"
          placeholder="Product About"
          value={form.About}
          onChange={handleFormChange}
          required
        />
      </Form.Group>

      {/* File Upload */}
      <Form.Group className="mb-3">
        <Form.Label>Images</Form.Label>
        <Form.Control
          multiple
          name="images"
          type="file"
          onChange={handleImageChange}
          required
        />
      </Form.Group>

      {/* Submit Button */}
      <button
        className="btn btn-primary"
        type="submit"
        disabled={
          !form.category ||
          !form.title 
          
        }
      >
        Create
      </button>

      
      <div className="d-flex flex-row gap-2 pt-4"> 
        {ShowImages}
      </div>
    </Form>
  );
}
