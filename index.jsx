// Import necessary modules
const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override');

// Middleware setup
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Dummy data
let posts = [
    {
        id: uuidv4(),
        username: "SurjeetKumar",
        content: "I Love Coding!",
       
    },
    {
        id: uuidv4(),
        username: "RahulKumar",
        content: "I Love India!",
        
    },
    {
        id: uuidv4(),
        username: "AmitKumar",
        content: "I Got Selected My first Internship!",
        
    },
    {
        id: uuidv4(),
        content: "I am From Utter Pradesh:",
       
    },
];

// Routes
app.get("/", (req, res) => {
   res.send("Connection Is Working:");  
});
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts: posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find(p => p.id === id);
    res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;

    let postIndex = posts.findIndex(p => p.id === id);
    if (postIndex !== -1) {
        posts[postIndex].content = newContent;
        res.redirect(`/posts`);
    } else {
        res.status(404).send("Post not found");
    }
});




app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find(p => p.id === id);
    res.render("edit.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter(p => p.id !== id);
    res.redirect("/posts");
});

// Server setup
const port = 3000;
app.listen(port, () => {
    console.log(`Listening to Port ${port}`);
});
