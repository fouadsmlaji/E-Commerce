import { useEffect, useState } from "react";
import { USER, USERS } from "../../Api/Api";
import TableComponent from "../../Components/Dashboard/TableComponent";

import { Link } from "react-router-dom";
import { Axios } from "../../Api/Axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [deleteUser, setDeleteUser] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [noUsers, setNoUsers] = useState(false);

  const header = [
    {
      key: "name",
      name: "Username",
    },
    {
      key: "email",
      name: "Email",
    },
    {
      key: "role",
      name: "Role",
    },
  ];

  async function handleDelete(id) {
 
    try {
      const res = await Axios.delete(`${USER}/${id}`);
      setUsers(prev => prev.filter((item) => item.id !== id))
    } catch (err) {
      console.log(err);
    }

}

  useEffect(() => {
    Axios.get(`${USER}`).then((res) => setCurrentUser(res.data));

    console.log(currentUser);
  }, []);

  useEffect(() => {
    Axios.get(`/${USERS}`)
      .then((data) => setUsers(data.data))
      .then(() => setNoUsers(true));
  }, [deleteUser]);

  return (
    <div className="d-flex flex-column w-100 p-4">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h1 style={{ fontWeight: "200" }}>Users Table</h1>
        <Link className="btn btn-third" to="/dashboard/create">
          Create User
        </Link>
      </div>
      <TableComponent
        header={header}
        data={users}
        currentUser={currentUser} 
        delete={handleDelete}
      />
    </div>
  );
}
