import { NavLink } from "react-router-dom";

export default function SideBar() {
    return (
        <div className="sideBar">
            <NavLink to="/dashboard/users" className="sideItem d-flex"><i className="fa-solid fa-users" ></i>Users</NavLink>
            <NavLink to="/dashboard/user/create" className="sideItem d-flex"><i className="fa-solid fa-user-plus" ></i>New User</NavLink>
            <NavLink to="/dashboard/products" className="sideItem d-flex"><i className="fas fa-shopping-cart" ></i>Products</NavLink>
            <NavLink to="/dashboard/product/create" className="sideItem d-flex"><i className="fas fa-cart-plus" ></i>New Product</NavLink>
        </div>
    )
}