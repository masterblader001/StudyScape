//declare variable 
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var dotenv = require("dotenv");
var helmet = require("helmet");
var morgan = require("morgan");

var userRoute = require("./routes/users");
var authRoute = require("./routes/auth");
var postRoute = require("./routes/posts");

var path = require("path");
var multer = require("multer")


//use dotenv
dotenv.config();

//connect to MongoDB
mongoose.connect(process.env.mongodb_url, function(){
    console.log("Connecting to MongoDB");
    
});

app.use('/images', express.static(path.join(__dirname, "public/images")));

//middleware
app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination:(req,file, cb)=>{
        cb(null, 'public/images');
    },
    filename: (req, file, cb)=>{
        
        cb(null, Date.now() + file.originalname);

    },
});

const upload = multer({storage: storage});

app.post('/api/upload', upload.single("file"), (req,res)=>{ 
    try {
        const file = req.file;
        return res.status(200).json(file)
    } catch(err){
        console.log(err);
    }

});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.use(express.static(path.join(__dirname, '/Api/Client/build')));

app.get("*", (req,res)=>{
    res.sendFile(path.join(__dirname, "Api/Client/build/index.html"))
});




//try listen from app
const PORT = process.env.PORT || 8800;

app.listen(PORT,function(){
    console.log("Server is starting....");
}) 