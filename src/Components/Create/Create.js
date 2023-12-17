import { useContext, useState } from 'react';
import './Create.css';
import {FirebaseContext, AuthContext} from '../../store/Context'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Create() {
    const navigate = useNavigate();
    const { db, storage } = useContext(FirebaseContext);
    const { user } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState(null);
    const [image, setImage] = useState(null);
    const date = new Date();

    const handleSubmit = async () => {
        const filePath = `image/${image.name}`;
        const storageRef = ref(storage, filePath);
        const uploaded = await uploadBytes(storageRef, image);
        console.log('uploaded: ', uploaded);
        
        if (uploaded) {
          try {
            const url = await getDownloadURL(storageRef);
            console.log('url: ', url);
            await addDoc(collection(db, 'products'), {
                name,
                category,
                price,
                url,
                userId: user.uid,
                createdAt: date.toDateString(),
            });
            navigate('/');
          } catch (error) {
            console.error('Error getting download URL:', error);
          }
        }
      };
    return (
    <>
      {/* <card> */}
        <div className="centerDiv">
     
            <label htmlFor="name">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="Name"
            />
            <br />
            <label htmlFor="category">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              name="category"
  
            />
            <br />
            <label htmlFor="price">Price</label>
            <br />
            <input 
              className="input" 
              type="number" 
              id="price" 
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              name="Price" 
            />
            <br />
          
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : '' }></img>
          
            <br />
            <input type="file" onChange={(e) => setImage(e?.target.files[0])} />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          
        </div>
      {/* </card> */}
    </>
    );
};

export default Create;