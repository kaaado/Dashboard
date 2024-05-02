import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { User } from "../../website/Context/UserContext";


export default function Users() {
    const [users, setUsers] = useState([]);
    const [runUseEf, setRun] = useState(0);

    const userCont = useContext(User);
    const token = userCont.auth.token;

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/user/show", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((data) => setUsers(data.data))
    }, [runUseEf])

    const userShow = users.map((user, index) => <tr key={index}>
        <td>{index + 1}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td><div className="icon">
            <Link to={`${user.id}`} ><i className="fa-solid fa-user-pen" style={{ color: 'grey', cursor: 'pointer' }}></i></Link>
            <i onClick={() => dellteUser(user.id)} className="fa-solid fa-trash" style={{ color: 'red', cursor: 'pointer' }}></i>
        </div></td></tr>)
    async function dellteUser(id) {
        try {
            let res = await axios.delete(`http://127.0.0.1:8000/api/user/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (res.status === 200) {
                setRun((i) => i + 1)
            }
        } catch (error) {
        }
    }

    return (
        <div className="users">
            <table className="user-table ">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {userShow}
                </tbody>
            </table>
        </div>
    )
}