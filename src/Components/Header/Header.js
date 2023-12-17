import React, { useContext } from 'react'
import { AuthContext, FirebaseContext } from '../../store/Context';
import { useNavigate, Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';


import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
function Header() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { auth } = useContext(FirebaseContext);
  const handleLogOut = async() => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };
  const handleLogin = () => {
    navigate('/login');
  }
  const handleCreate = () => {
    navigate('/create');
  };
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
        {user ? (<span>Welcome {user?.displayName}</span>) : (<Link to='/login'><span onClick={()=>handleLogin()}>Log In</span></Link>)}
          <hr />
        </div>

        <div className="sellMenu">
        {user && <Link><span onClick={()=>handleLogOut()}>Log Out</span></Link>}

          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <Link to='/create'><span onClick={()=>handleCreate()}>SELL</span></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
