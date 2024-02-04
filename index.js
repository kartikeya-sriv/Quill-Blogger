import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

let titleList=[];
let contentList =[];

app.get("/", (req, res)=>{
    res.render("index.ejs");
})
app.get("/login", (req,res)=>{
    res.render("login.ejs");
})

app.get("/logged", (req,res)=>{
    const forUser = true;
    const newsign = 1;
    res.render("index.ejs", {forUser, newsign});
})

app.get("/writeBlog", (req,res)=>{
    const forUser = true;
    const newsign = 1;
    res.render("write.ejs", {forUser, newsign});
})

app.post("/submit", (req,res)=>{
    const forUser=true;
    const pastBlogs = true;
    titleList.push(req.body["blogTitle"]);
    contentList.push(req.body["blogContent"]);
    // contentList.length=0;
    // titleList.length=0;
    res.render("index.ejs", {forUser, pastBlogs, contentList, titleList});
})

app.get("/signup", (req,res)=>{
    const newsign = 1;
    res.render("login.ejs", {newsign});
})

app.get("/delete/:index", (req,res)=>{
    const index = parseInt(req.params.index);
    contentList.splice(index, 1);
    titleList.splice(index, 1);
    const forUser=true;
    if(contentList.length != 0){
        const pastBlogs = true;
        res.render("index.ejs", {forUser, pastBlogs, contentList, titleList});
    } else{
        res.render("index.ejs", {forUser, contentList, titleList});
    }  
})

app.get("/update/:index", (req,res)=>{
    const forUser = true;
    const newsign = 1;
    const index = parseInt(req.params.index)+1;
    const currentTitle = titleList[index-1];
    const currentContent = contentList[index-1];
    res.render("write.ejs", {forUser, newsign, index, currentContent, currentTitle});
})

app.post("/showUpdate/:index", (req, res)=>{
    const index = parseInt(req.params.index)-1;
    const forUser=true;
    const pastBlogs = true;
    titleList[index] = req.body["blogTitle"];
    contentList[index] = req.body["blogContent"];
    // contentList.length=0;
    // titleList.length=0;
    res.render("index.ejs", {forUser, pastBlogs, contentList, titleList});
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}.`);
})
