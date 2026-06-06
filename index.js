const express=require("express")
const app=express()
const {v4:uuidv4}=require("uuid");
const methodOverride=require("method-override");
const port=3000

const path=require("path")
app.use(methodOverride('_method'));
let posts=[
    {id:uuidv4(),
    username :"shradhakhapra",
    content:"hi!hard work definitely make your dreams come true"},
    {id:uuidv4(),
    username :"saanyamittal",
    content:"i will one day become what i am thinking for"},
    {id:uuidv4(),
    username :"rahulkumar",
    content:"i grabbed an internship!"}
]

app.use(express.urlencoded({extended:true}))

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))

app.use(express.static(path.join(__dirname,"public")))

app.get("/posts",(req,res) => {
    res.render("index.ejs",{posts});
})




app.get("/posts/new",(req,res) => {
    res.render("new.ejs");
})


app.post("/posts",(req,res) => {
    let id=uuidv4();
    let {username,content}=req.body;
    posts.push({username,content,id});
    res.redirect("/posts");
});

app.delete("/posts/:id",(req,res) => {
    let {id} = req.params;
     posts=posts.filter(p => id != p.id);
    res.redirect("/posts");
})

app.get("/posts/:id",(req,res) => {
    let {id}=req.params;
    let post=posts.find(p => id === p.id);
    res.render("detail.ejs",{post});
})
app.patch("/posts/:id",(req,res) => {
    let content=req.body.content;
    let {id}=req.params;
    let post=posts.find(p => id === p.id);
    post.content=content;
    res.redirect("/posts");
})
app.get("/posts/:id/edit",(req,res) => {
     let {id}=req.params;
    let post=posts.find(p => id === p.id);
    res.render("edit.ejs",{id,post});
});

app.listen(port,() => {
    console.log("app is listening on port",port)
});

