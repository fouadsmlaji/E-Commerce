import { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { Axios } from "../../../Api/Axios";
import { CATEGORIES, PRODUCT } from "../../../Api/Api";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function CreateProduct() {
  const [form, setForm] = useState({
    category: "",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
  });

  const dummyForm = {
    category: null,
    title: "dummy",
    description: "dummy",
    price: 222,
    discount: 0,
    About: "About",
  };

  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sent, setSent] = useState(false);
  const [id, setId] = useState();

  // Ref
  const UploadProgress = useRef([]);
  const j = useRef(-1);
  const ids = useRef([]);

  // Handle Submit
  async function handleEdit(e) {
    e.preventDefault();

    try {
      await Axios.post(`${PRODUCT}/edit/${id}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      window.location.pathname = "/dashboard/products";
    } catch (err) {
      console.error("Error uploading product:", err);
    }
  }

  // Handle Submit Form
  async function HandleSubmitForm() {
    try {
      const res = await Axios.post(`${PRODUCT}/add`, dummyForm);
      setId(res.data.id);
    } catch (err) {
      console.log(err);
    }
  }

  // Handle Form Input Change
  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSent(true);
    if (sent !== true) {
      HandleSubmitForm();
    }
  }

  // Handle Image Change
  async function handleImageChange(e) {
    setImages((prev) => [...prev, ...e.target.files]);
    const ImagesFile = e.target.files;

    for (let i = 0; i < ImagesFile.length; i++) {
      j.current++;
      const data = new FormData();
      data.append("image", ImagesFile[i]);
      data.append("product_id", id);

      try {
        const res = await Axios.post("/product-img/add", data, {
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percent = Math.floor((loaded * 100) / total);

            if (percent % 10 === 0 && UploadProgress.current[j.current]) {
              UploadProgress.current[j.current].style.width = `${percent}%`;
              UploadProgress.current[j.current].setAttribute(
                "percent",
                `${percent}%`
              );
            }
          },
        });
        ids.current[j.current] = res.data.id;
      } catch (err) {
        console.log(err);
      }
    }
  }
  // Get Categories
  useEffect(() => {
    Axios.get(`/${CATEGORIES}`)
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Mapping Categories
  const ShowCategory = categories.map((category, index) => (
    <option value={category.id} key={index}>
      {category.title}
    </option>
  ));

  // Handle Image Delete
  async function handleImageDelete(id, img) {
    const findId = ids.current[id];
    try {
      const res = await Axios.delete(`product-img/${findId}`);
      setImages((prev) => prev.filter((image) => image !== img));
      ids.current = ids.current.filter((i) => i !== findId);
      --j.current;
    } catch (error) {
      console.log(error);
    }
  }

  // Mapping Images
  const ShowImages = images.map((image, index) => (
    <div key={index}>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <img src={URL.createObjectURL(image)} width={300} />
        <div className="progress">
          <span
            ref={(e) => (UploadProgress.current[index] = e)}
            // percent={`${UploadProgress[index]}%`}
            className="innerProgress"
          ></span>
        </div>
        <p>{image.name}</p>
        <div className="d-flex flex-row gap-3 align-items-center">
          <p className="m-0">
            {image.size / 1024 < 900
              ? (image.size / 1024).toFixed(2) + "KB"
              : (image.size / (1024 * 1024)).toFixed(2) + "MB"}
          </p>
          <FontAwesomeIcon
            icon={faTrashCan}
            color="red"
            onClick={() => handleImageDelete(index, image)}
            cursor="pointer"
          />
        </div>
      </div>
    </div>
  ));

  return (
    <Form className="bg-white w-100 mx-2 p-4" onSubmit={handleEdit}>
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
          <option value="" disabled>
            Select Category
          </option>
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
          disabled={!sent}
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
          disabled={!sent}
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
          disabled={!sent}
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
          disabled={!sent}
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
          disabled={!sent}
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
          disabled={!sent}
        />
      </Form.Group>

      {/* Submit Button */}
      <button
        className="btn btn-primary"
        type="submit"
        disabled={!form.category || !form.title}
      >
        Create
      </button>

      <div className="d-flex flex-row gap-2 pt-4">{ShowImages}</div>
    </Form>
  );
}
