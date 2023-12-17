import { useContext, useEffect, useState } from 'react';
import './ViewPost.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';
import { collection, getDocs, query, where } from 'firebase/firestore';


function ViewPost() {
  const [userDetails, setUserDetails] = useState();
  const { postDetails } = useContext(PostContext);
  const { db } = useContext(FirebaseContext);
  console.log('p: ', postDetails);
  useEffect(() => {
    const userId = postDetails?.userId;
    handleFilter(userId);
  }, []);

  const handleFilter = async (userId) => {
    const q = query(collection(db, "users"), where("id", "==", userId));
    
    const querySnapshot = await getDocs(q);
    console.log('query:', querySnapshot.docs);
    
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      setUserDetails(doc.data());
    });
  }

    return (
      <div className="viewParentDiv">
        <div className="imageShowDiv">
          <img
            src={postDetails.url}
            alt=""
          />
        </div>
        <div className="rightSection">
          <div className="productDetails">
            <p>&#x20B9; {postDetails.price} </p>
            <span>{postDetails.name}</span>
            <p>{postDetails.category}</p>
            <span>{postDetails.createdAt}</span>
          </div>
          { userDetails &&
            <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.userName}</p>
            <p>{userDetails.phone}</p>
          </div>
          }
        </div>
      </div>
    );
  }

  export default ViewPost;