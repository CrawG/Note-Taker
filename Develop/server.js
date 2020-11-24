const express = require("express");
const app = express();
const fs = require("fs");
// - needs for path.join
const path = require("path");
var http = require("http");

const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


// Get/notes - returns notes.html
app.get("/notes", (request, response) => {

    response.sendFile(path.join(__dirname, "public", "notes.html"));
    console.log("Your Notes!");
});

// Get * - returns index.html
app.get("/", (request, response) => {

    response.sendFile(path.join(__dirname, "public", "index.html"));
    console.log("Your index!");
});