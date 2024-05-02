import { Link } from "react-router-dom";

export default function TopBar() {
    return (
        <div className="d-flex-sps-btwn topBar " >
            <h1>Store</h1>
            <Link to="/"><button className="registre-button" type="submit">Website</button></Link>
        </div>

    )
}