const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require("cors")

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host:  "localhost",
    password:"1234",
    database:"customer_income"
})

app.get("/user",(req,res) =>{
    db.query("SELECT * FROM user ORDER BY age DESC", (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});

app.get("/counteachage",(req,res)=>{
    db.query("SELECT age,count(*) as `num` FROM `user` GROUP BY age",(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
})

app.post("/create",(req,res)=>{
    const datalist = req.body.datalist;
    const name = req.body.name;
    const surname = req.body.surname;
    const birth = req.body.birth;
    const profile_picture = req.body.profile_picture;

    db.query(
        `INSERT INTO user (datalist,name,surname,birth,profile_picture) VALUES (?,?,?,?,?)`,
        [datalist,name,surname,birth,profile_picture],
        (err, result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send("Values Inserted");
            }
            
        }
    )
    db.query(
        "UPDATE user SET age = DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), birth)), '%Y') + 0;",
        (err, result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send("age update");
            }
            
        }
    )
    db.query(
        "UPDATE user SET profile_picture = 'default.png' WHERE profile_picture ='' ",
        (err, result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send("age update");
            }
            
        }
    )
})

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM user WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    })
  })
app.listen("3001",()=>{
    console.log("Server is running on port")
})