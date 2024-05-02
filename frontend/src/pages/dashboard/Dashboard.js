import { Outlet } from "react-router-dom";
import SideBar from "../../Components/SideBar";
import TopBar from "../../Components/TopBar";

export default function Dashboard() {
    return (
        <div className="dash">
            <TopBar />
            <div className="flex">
                <div className="sidebar-container "><SideBar /></div>
                <div className="main">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
