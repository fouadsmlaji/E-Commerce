import { useEffect, useState } from "react";
import {  CATEGORIES } from "../../Api/Api";
import { Axios } from "../../Api/Axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Table } from "react-bootstrap";
import TableComponent from "../../Components/Dashboard/TableComponent";

export default function Categories() {
    const [categories, setCategories] = useState([]);

    const header = [
        {
            name: "title"
        },
        {
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
          const res = await Axios.delete(`${CATEGORIES}/${id}`);
          setCategories(prev => prev.filter((item) => item.id !== id))
        } catch (err) {
          console.log(err);
        }
    
    }

 
    return (
      <div className="d-flex flex-column w-100 p-4">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h1 style={{fontWeight:"200"}}>Users Table</h1>
          <Link className="btn btn-third" to='/dashboard/category/create'>Create Category</Link>
        </div>
       
       <TableComponent header={header} data={categories} delete={handleDelete}/>
      </div>
    );
  }