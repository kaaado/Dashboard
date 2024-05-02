import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { User } from "../../website/Context/UserContext";
export default function CreateProduct() {
    const [title, settitle] = useState('');
    const [desc, setDesc] = useState('');
    const [image, setImage] = useState(null)
    const [accept, setAccept] = useState(false);

    const nav = useNavigate();

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];

        if (selectedImage) {
            setImage(selectedImage);
        }
    };

    const context = useContext(User)
    const getToken = context.auth.token;
    const formData = new FormData();
    formData.append('title', title)
    formData.append('description', desc)
    formData.append('image', image)
    async function Submit(e) {
        e.preventDefault();
        setAccept(true); // if first submit => true
        try {
            //send data
            let res = await axios.post(`http://127.0.0.1:8000/api/product/create`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${getToken}`
                    }
                });
            nav('/dashboard/products');
        } catch (err) {

        }
    }
    return (
        <div className="father d-flex " >
            <form className="d-flex" action="" onSubmit={Submit}>
                <label htmlFor="title">Title :</label>
                <input id="title" type="text" placeholder="title" onChange={(e) => settitle(e.target.value)} value={title} required />
                {title.length < 1 && accept && <p>Title must be bigger then 3 Caractere</p>}
                <label htmlFor="Desc">Description:</label>
                <textarea id="Desc" type="text" placeholder="Description" onChange={(e) => setDesc(e.target.value)} value={desc} required />
                {/*accept && emailerr === 422 && <p>Email is already been taken</p>*/}
                <label htmlFor="image">Image :</label>
                <div className="image-input-container">
                    <input
                        id="image"
                        type="file"
                        onChange={(e) => handleImageChange(e)}
                        accept="image/*"
                        required
                    />
                    {image && (
                        <div className="d-flex" >
                            <div className="image-preview">
                                <img src={URL.createObjectURL(image)} alt="Preview" />
                                <p>{image.name}</p>
                            </div>
                        </div>
                    )}
                </div>
                {/* {pass.length < 7 && accept && <p>Password must be bigger then 8 Caractere</p>} */}
                <button className="registre-button" type="submit">Create</button>
            </form>
        </div>
    )
}