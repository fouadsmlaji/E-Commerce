import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function TableComponent(props) {

  const currentUser = props.currentUser || {
    name : ''
  };

  //Header Show
  const headerShow = props.header.map((item) => <th>{item.name}</th>);

  //BodyShow
  const roleMapping = {
    "1995": "Admin",
    "2001": "User",
    "1996": "Editor",
    "1999": "Product Manager",
  };

  const dataShow = props.data.map((item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      {props.header.map((header, idx) => (
        <td key={idx}>
          {header.key === "role" 
            ? roleMapping[item[header.key]] 
            : header.key === "image" 
            ? <img width={200} src={item[header.key]} alt="item" /> 
            : item[header.key]
          }
          {currentUser && item[header.key] === currentUser.name && "(You)"}
        </td>
      ))}
      <td>
        <div className="d-flex align-items-center gap-2 justify-content-center">
          <Link to={`${item.id}`}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </Link>
          {currentUser.name !== item.name && 
            <FontAwesomeIcon
              icon={faTrash}
              color="Red"
              onClick={() => props.delete(item.id)}
              cursor="pointer"
            />}
        </div>
      </td>
    </tr>
  ));
  


  return (
    <Table striped bordered hover className="text-center">
      <thead>
        <tr>
          <th>Id</th>
          {headerShow}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      {props.data.length === 0 && <td colSpan={6} style={{padding:'10px', backgroundColor:"rgb(222, 226, 230)"}}>Loading... </td>}
        {dataShow}
        </tbody>
    </Table>
  );
}
