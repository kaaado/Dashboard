import { useContext, useState } from "react";
import axios from "axios";
import Header from '../../../Components/Header';
import { User } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
export default function SignIn() {
    const [email, setMail] = useState('');
    const [pass, setPass] = useState('');
    const [accept, setAccept] = useState(false);
    const [emailerr, setEmailErr] = useState('');
    const UserNow = useContext(User);
    const cookie = new Cookies();
    const nav = useNavigate();
    async function Submit(e) {
        e.preventDefault();
        setAccept(true); // if first submit => true
        try {
            //send data
            let res = await axios.post("http://127.0.0.1:8000/api/login", {
                email: email,
                password: pass,
            });
            const token = res.data.data.token;
            cookie.set("Bearer", token);
            const userDetails = res.data.data.user;
            UserNow.setAuth({ token, userDetails })
            nav('/dashboard');

        } catch (err) {
            setEmailErr(err.response.status);
        }
    }

    return (
        <div>
            <Header />
            <div className="father d-flex " >
                <form className="parenet d-flex" action="" onSubmit={Submit}>
                    {accept && emailerr === 401 && <p style={{ fontSize: '16px' }}>Oops! invalid email or password ,Please try again</p>}
                    <label htmlFor="mail">Email:</label>
                    <input id="mail" type="email" placeholder="Email" onChange={(e) => setMail(e.target.value)} value={email} required />
                    <label htmlFor="pass">Password :</label>
                    <input id="pass" type="password" placeholder="Password" onChange={(e) => setPass(e.target.value)} value={pass} required />
                    {pass.length < 7 && accept && <p>Password must be bigger then 8 Caractere</p>}
                    <button className="registre-button" type="submit">Login</button>

                </form>
            </div>
        </div>
    )
}