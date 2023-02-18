import "./rightbar.css"
import { Users } from "../../dummyData";
import Online from "../online/Online";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

export default function Rightbar({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const {user: currentUser} = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);



  useEffect(()=>{
    const getFriends = async () =>{
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);

      } catch (err) {
        console.log(err);
      }

    };
    getFriends();
  }, [user]);

  const handleClick = async ()=>{
    try{
      if(followed){
        await axios.put(`/users/${user._id}/unfollow`, {userId: currentUser._id, });
        
      } else {
        await axios.put(`/users/${user._id}/follow`, {userId: currentUser._id, });
        
      }
      setFollowed(!followed);

    } catch(err){
      console.log(err);
    }
  
  };

  const HomeRightbar = () => {
    return(
      <>
  
      <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="brithdayText"> <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today.</span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map(u=>(
            <Online key={u.id} user={u}/>
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return(
      <>
      {user.username !== currentUser.username
      && ( <button className="rightbarFollowButton" onClick={handleClick}>
        {followed ? "Unfollow" : "Follow"}
        {followed ?  <PersonRemoveIcon/>: <PersonAddIcon/> }
         </button> 
         )}
      <h4 className="rightbarTitle">User information</h4>
      <div className="rightbarInfo">
        <div className="rightInfoItem">
          <span className="rightbarInfoKey">City:</span>
          <span className="rightbarInfoValue">{user.city}</span>
        </div>
        <div className="rightInfoItem">
          <span className="rightbarInfoKey">From:</span>
          <span className="rightbarInfoValue">{user.from}</span>
        </div>
        <div className="rightInfoItem">
          <span className="rightbarInfoKey">Status:</span>
          <span className="rightbarInfoValue">
            {user.relationship === 1 ? 
             " Thammasat student ": 
             user.relationship === 2 ? 
             " lecturer ":
             user.relationship === 3 ?
             " other ": "-"}</span>
        </div>
      </div>
      <h4 className="rightbarTitle">User friends</h4>
      <div className="rightbarFollowings">
        {friends.map((friend)=>(
          <Link to={"/profile/"+ friend.username} style = {{textDecoration:"none"}}>
        <div className="rightbarFollowing">
          <img src={friend.profilePicture ? PF + friend.profilePicture : PF + "person/nopofile.jpg"} alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">{friend.username}</span>
        </div>
        </Link>
        ))}
      </div>
      </>
    )
  } 
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar/> : <HomeRightbar/>}
      </div>
    </div>
  )
}
