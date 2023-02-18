import "./share.css"
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import RoomIcon from '@mui/icons-material/Room';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import CancelIcon from '@mui/icons-material/Cancel';

export default function Share() {

    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file,setFile] = useState(null);
    
    const submitHandler = async (e)=>{
        e.preventDefault()
        const  newPost ={
            userId: user._id,
            desc: desc.current.value
        };
        if(file){
            const data = new FormData();
            const fileName = file.name
            data.append("file", file);
            data.append("name", fileName)
            newPost.img = fileName;
            try{
                await axios.post("/upload", data)
            } catch(err){
                console.log(err);
            }
        }
        try {
            await axios.post("/posts", newPost);
            window.location.reload()

        } catch(err) {

        }


    };

  return (
    <div className="share">
        <div className="shareWrapper">
            <div className="shareTop">
                <img className="shareProfileImg" src={user.profilePicture ? PF + user.profilePicture : PF + "person/nopofile.jpg"} alt="" />
                <input 
                    placeholder={"What's in your mind" + user.username + " ? " }
                    className="shareInput"
                    ref={desc}
                />
            </div>
            <hr className="shareHr"/>
            {file && (
                <div className="shareImgContainer">
                    <img className="shareImg" src={URL.createObjectURL(file)} alt=""/>
                    <CancelIcon className="shareCancel" onClick={()=>setFile(null)}/>

                </div>
            )}
            <form className="shareBottom" onSubmit={submitHandler}>
                <div className="shareOptions">
                    <div className="shareOption">
                        <label htmlFor="file" className="shareOption">
                        <PermMediaIcon htmlColor="tomato" className="shareIcon"/>
                        <span className="shareOptionText">Photo or Video</span>
                        <input style={{display:"none"}} type="file" id="file" accept=".png, .jepg, .jpg, .pdf, .txt, video/*, audio/*" onChange={(e)=>setFile(e.target.files[0])}/>
                        </label>
                    </div>
                    <div className="shareOption">
                        <LabelIcon htmlColor="blue" className="shareIcon"/>
                        <span className="shareOptionText">Tag</span>
                    </div>
                    <div className="shareOption">
                        <RoomIcon htmlColor="green" className="shareIcon"/>
                        <span className="shareOptionText">Location</span>
                    </div>
                    <div className="shareOption">
                        <EmojiEmotionsIcon htmlColor="gold" className="shareIcon"/>
                        <span className="shareOptionText">Feelings</span>
                    </div>
                    <button className="shareButton" type="sumbit">Share</button>
                </div>
            </form>

        </div>

    </div>
  )
}
