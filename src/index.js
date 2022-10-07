import express from "express"
import mysql from "mysql"
import cors from "cors"

// creates an express app
const app = express()

// port variable
const PORT = process.env.PORT || 3333

// connects to the database
const db = mysql.createConnection({
    host: "bhycxntnuhrjly665aaj-mysql.services.clever-cloud.com",
    user: "uzk0ofme48afum0s",
    password: "YkK71t9ovXPIjzANCyRa",
    database: "bhycxntnuhrjly665aaj"
})

// allow us to send data to the express
app.use(express.json())

// allow react to comunicate with the api
app.use(cors())

// shows the tasks
app.get("/tasks", (req, res) => {
  const q = "SELECT * FROM Task;"

  db.query(q, (err, data) => {
    if(err) return res.json(err)
    return res.json(data)
  })
})

// creates task
app.post("/create-task", (req, res) => {
  const q = "INSERT INTO Task(`title`, `complete`) VALUES (?);"

  const values = [
    req.body.title,
    req.body.complete
  ]

  db.query(q, [values], (err, data) => {
    if(err) return res.json(err)
    return res.json("Task has been added")
  })
})

// deletes task
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id
  const q = "DELETE FROM Task WHERE id = ?;"

  db.query(q, [id], (err, data) => {
    if(err) return res.json(err)
    return res.json("Task has been deleted")
  })
})

app.post("/update/:id", (req, res) => {
  const id = req.params.id
  const q = "UPDATE Task SET `title` = ?, `complete` = ? WHERE id = ?;"

  const values = [
    req.body.title,
    req.body.complete
  ]

  db.query(q, [...values, id], (err, data) => {
    if(err) return res.json(err)
    return res.json("Task has been updated")
  })
})

app.listen(PORT, () => {
  console.log("Connected to the port: " + PORT)
})
