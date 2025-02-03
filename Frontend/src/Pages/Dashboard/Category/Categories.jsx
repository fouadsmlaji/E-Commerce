import { useEffect, useState } from "react";
import {  CATEGORIES, CATEGORY } from "../../../Api/Api";
import { Axios } from "../../../Api/Axios";
import { Link } from "react-router-dom";
import TableComponent from "../../../Components/Dashboard/TableComponent";

export default function Categories() {
    const [categories, setCategories] = useState([]);

    const header = [
        {
            key: 'title',
            name: "title"
        },
        {
          key: 'image',
            name: "image"
        },
    ]

    //Get All Categories
        useEffect(() => {
        Axios.get(`/${CATEGORIES}`)
            .then((data) => setCategories(data.data))
        }, []);


     async function handleDelete(id) {
     
        try {
          const res = await Axios.delete(`${CATEGORY}/${id}`);
          setCategories(prev => prev.filter((item) => item.id !== id))
        } catch (err) {
          console.log(err);
        }
    
    }

 
    return (
      <div className="d-flex flex-column w-100 p-4">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h1 style={{fontWeight:"200"}}>Create Category</h1>
          <Link className="btn btn-third" to='/dashboard/create_category'>Create Category</Link>
        </div>
       
       <TableComponent header={header} data={categories} delete={handleDelete}/>
      </div>
    );
  }