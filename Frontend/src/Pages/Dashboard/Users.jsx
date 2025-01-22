  import { useEffect, useState } from "react";
  import { USER, USERS } from "../../Api/Api";
  import { Table } from "react-bootstrap";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
  import { Link } from "react-router-dom";
  import { Axios } from "../../Api/Axios";

  export default function Users() {
    const [users, setUsers] = useState([]);
    const [deleteUser, setDeleteUser] = useState(false);
    const [currentUser, setCurrentUser] = useState("");
    const [noUsers, setNoUsers] = useState(false)
    

    useEffect(() => {
      Axios.get(`${USER}`).then(res => setCurrentUser(res.data))

      console.log(currentUser);
    }, []);


    useEffect(() => {
      Axios.get(`/${USERS}`)
        .then((data) => setUsers(data.data))
        .then(() => setNoUsers(true))
    }, [deleteUser]);

   
    
    const showUsers =  users.map((user, key) => (
      <tr key={key}>
        <td>{key + 1} </td> 
        <td>{user.name === currentUser.name ? user.name + " (Current User)" : user.name}</td>
        <td>{user.email}</td>
        <td>{user.role === '1995' ? 'Admin' : user.role ==='2011' ? 'User' : 'Editor'}</td>
        <td>
          <div className="d-flex align-items-center gap-2 justify-content-center">
            <Link to={`${user.id}`}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </Link>
            {currentUser.name !== user.name && 
            <FontAwesomeIcon
              icon={faTrash}
              color="Red"
              onClick={() => handleDelete(user.id)}
              cursor="pointer"
            />}
          </div>
        </td>
      </tr>
    ));

    // handle Delete

    async function handleDelete(id) {
      if (id !== currentUser.id){
        try {
          const res = await Axios.delete(`${USER}/${id}`);
          setDeleteUser((prev) =>  !prev);
        } catch (err) {
          console.log(err);
        }
      }
    
      else {
        alert("You Can Not Remove Yourself");
      }
    }

    

    return (
      <div className="d-flex flex-column w-100 p-4">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h1 style={{fontWeight:"200"}}>Users Table</h1>
          <Link className="btn btn-third" to='/dashboard/users/create'>Create User</Link>
        </div>
        <Table striped bordered hover className="text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ?
            (
              <tr>
                <td colSpan={12} className="text-center">
                  Loading...
                </td> 
              </tr>
            ) : users.length <= 1 && noUsers ?(
              <tr>
              <td colSpan={12} className="text-center">
                No Users Found
              </td>
            </tr>
            ): (
              showUsers
            )}
          </tbody>
        </Table>
      </div>
    );
  }
