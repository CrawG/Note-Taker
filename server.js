const express = require("express");
const app = express();
const fs = require("fs");
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
    console.log("Your Notes");
});

// Get * - returns index.html
app.get("/", (request, response) => {

    response.sendFile(path.join(__dirname, "public", "index.html"));
    console.log("Your index!");
});

// GET /api/notes - Should read the db.json file and return all saved notes as JSON
app.get("/api/notes", (request, response) => {

    fs.readFile(path.join(__dirname, "db", "db.json"), 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        console.log('File data:', jsonString)
        response.json(JSON.parse(jsonString));
    })
});

// POST /api/notes -  Should recieve a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
app.post("/api/notes", function (request, response) {

    fs.readFile(path.join(__dirname, "db", "db.json"), 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        console.log('File data:', jsonString);
        var notes = JSON.parse(jsonString);

        // Note objects
        let newNote = {
            title: request.body.title,
            text: request.body.text,
            id: Math.random().toString(36).substr(2, 9)
        };

        notes.push(newNote);

        let NotesJSON = JSON.stringify(notes);

        fs.writeFile(path.join(__dirname, "db", "db.json"), NotesJSON, (err) => {
            if (err) {
                return console.log(err);
            }
            console.log("Success", NotesJSON);
            return NotesJSON;
        });

    })

});

// DELETE /api/notes/:id - Should recieve a query paramter containing the id of a note to delete.
app.delete('/api/notes/:id', function (request, response) {
    fs.readFile(path.join(__dirname, "db", "db.json"), 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        console.log('File data:', jsonString);

        var notes = JSON.parse(jsonString);

        // Note object 
        let newNote = {
            title: request.body.title,
            text: request.body.text,
            id: Math.random().toString(36).substr(2, 9)
        };

        // Target note object by id and remove from notes array
        let id = request.params.id;

        var indexOfNote = notes.findIndex(i => i.id === id);

        notes.splice(indexOfNote, 1);
        

        let NotesJSON = JSON.stringify(notes);
        
        fs.writeFile(path.join(__dirname, "db", "db.json"), NotesJSON, (err) => {
            if (err) {
                return console.log(err);
            }
            console.log("Success", NotesJSON);
            return NotesJSON;
        });

    })

});


// Confirm server listening
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });