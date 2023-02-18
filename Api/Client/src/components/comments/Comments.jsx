import "./comments.css"

const comment = () =>{

    return (
        <div className="comments">{
            comment.map(comment=>(
                <div className="comment">
                    <img src={comment.profilePicture} alt=""/>
                    <div className="info">
                        <span>{comment.name}</span>
                        <p>{comment.desc}</p>
                    </div>
                </div>
            ))
        }</div>
    )

};

