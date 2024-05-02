import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { User } from "../../website/Context/UserContext";

export default function EditUser() {
    const [name, setName] = useState('');
    const [email, setMail] = useState('');
    const [pass, setPass] = useState('');
    const [rpass, setRPass] = useState('');
    const [emailerr, setEmailErr] = useState('');
    const [accept, setAccept] = useState(false);

    const context = useContext(User)
    const getToken = context.auth.token;
    const id = window.location.pathname.split("/").slice(-1)[0];
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/user/showbyid/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken}`
            }
        })
            .then(res => res.json())
            .then((data) => {
                setName(data[0].name);
                setMail(data[0].email);
            }
            )
    }, [])
    const nav = useNavigate();
    async function Submit(e) {
        e.preventDefault();
        setAccept(true); // if first submit => true
        try {
            //send data
            let res = await axios.post(`http://127.0.0.1:8000/api/user/update/${id}`, {
                name: name,
                email: email,
                password: pass,
                password_confirmation: rpass
            }, {
                headers: {
                    Authorization: `Bearer ${getToken}`
                }
            });

            nav('/dashboard/users');

        } catch (err) {
            setEmailErr(err.response.status);
        }
    }
    return (
        <div className="father d-flex " >
            <form className="d-flex" action="" onSubmit={Submit}>
                <label htmlFor="user">Username :</label>
                <input id="user" type="text" placeholder="Username" onChange={(e) => setName(e.target.value)} value={name} required />
                {name.length < 3 && accept && <p>Username must be bigger then 3 Caractere</p>}
                <label htmlFor="mail">Email:</label>
                <input id="mail" type="email" placeholder="Email" onChange={(e) => setMail(e.target.value)} value={email} required />
                {accept && emailerr === 422 && <p>Email is already been taken</p>}
                <label htmlFor="pass">Password :</label>
                <input id="pass" type="password" placeholder="Password" onChange={(e) => setPass(e.target.value)} value={pass} required />
                {pass.length < 7 && accept && <p>Password must be bigger then 8 Caractere</p>}
                <label htmlFor="rpass">Repeat Password :</label>
                <input id="rpass" type="password" placeholder="Repeat Password" onChange={(e) => setRPass(e.target.value)} value={rpass} required />
                {rpass !== pass && accept && <p>Password doesn't match</p>}
                <button className="registre-button" type="submit">update</button>
            </form>
        </div>
    )
}