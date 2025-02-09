import { useEffect, useState } from "react";
import {  PRODUCT, PRODUCTS } from "../../../Api/Api";
import { Axios } from "../../../Api/Axios";
import { Link } from "react-router-dom";
import TableComponent from "../../../Components/Dashboard/TableComponent";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [limit, setLimit] = useState(8);
    const [page, setPage] = useState(1);

    const header = [
        {
          key: "images",
          name:"Images"
        },
        {
            key: 'title',
            name: "Title"
        },
        {
          key: 'description',
            name: "Description"
        },
        {
          key: 'price',
            name: "Price"
        },
        {
          key: 'rating',
            name: "Rating"
        },
    ]

    //Get All Categories
        useEffect(() => {
        Axios.get(`/${PRODUCTS}`)
            .then((data) => setProducts(data.data))
        }, []);


     async function handleDelete(id) {
     
        try {
          const res = await Axios.delete(`${PRODUCT}/${id}`);
          setProducts(prev => prev.filter((item) => item.id !== id))
        } catch (err) {
          console.log(err);
        }
    
    }

 
    return (
      <div className="d-flex flex-column w-100 p-4">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h1 style={{fontWeight:"200"}}>Create Product</h1>
          <Link className="btn btn-third" to='/dashboard/create_category'>Create Product</Link>
        </div>
       
       <TableComponent header={header} data={products} delete={handleDelete} limit={limit} page={setPage}/>
      </div>
    );
  }