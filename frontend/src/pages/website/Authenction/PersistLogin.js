import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { User } from "../Context/UserContext";
import axios from "axios";
import LoadingScreen from "../../../Components/LoadingScreen";
import Cookies from "universal-cookie";

export default function PersistLogin() {
    // get current user && token 
    const UserNow = useContext(User);
    const token = UserNow.auth.token;
    const [loading, setLoading] = useState(true);

    // cookie 
    const cookie = new Cookies();
    const getToken = cookie.get('Bearer');

    //send refresh token 
    useEffect(() => {
        async function refreshToken() {
            try {
                await axios.post("http://127.0.0.1:8000/api/refresh", null, {
                    headers: {
                        Authorization: `Bearer ${getToken}`
                    }
                }).then(data => {
                    cookie.set("Bearer", data.data.token);
                    UserNow.setAuth(() => ({ userDetails: data.data.user, token: data.data.token }));

                })

            } catch (err) {
                console.error("Error:", err);
            } finally {
                setLoading(false);
            }
        }

        !token ? refreshToken() : setLoading(false);
    }, [])

    return !loading ? <Outlet /> : <LoadingScreen />;
}
