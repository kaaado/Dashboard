import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { User } from "../../website/Context/UserContext";


export default function Products() {
    const [products, setProducts] = useState([]);
    const [runUseEf, setRun] = useState(0);

    const userCont = useContext(User);
    const token = userCont.auth.token;

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/product/show", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((data) => setProducts(data.data))
    }, [runUseEf])

    const productShow = products.map((product, index) => <tr key={index}>
        <td>{index + 1}</td>
        <td>{product.title}</td>
        <td>{product.description}</td>
        <td>
            {/* Displaying the image using the <img> element */}
            <img
                src={product.image}  // Assuming `product.image` contains the URL of the image
                alt={product.title} // You can use the product title as alt text
                style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '5px' }} // Adjust the styling as needed
            />
        </td>
        <td><div className="icon">
            <Link to={`${product.id}`} ><i className="fa-solid fa-pen" style={{ color: 'grey', cursor: 'pointer' }}></i></Link>
            <i onClick={() => dellteProduct(product.id)} className="fa-solid fa-trash" style={{ color: 'red', cursor: 'pointer' }}></i>
        </div></td></tr>)
    async function dellteProduct(id) {
        try {
            let res = await axios.delete(`http://127.0.0.1:8000/api/product/delete/${id}`, {
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
                        <th>Product</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {productShow}
                </tbody>
            </table>
        </div>
    )
}