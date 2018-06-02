const express = require('express');
const app = express()
const path = require('path')
const fs = require("path")
const bodyParser = require("body-parser")
const dom = require("./doc.js")

app.use(bodyParser())

const members = [
  {id:1, nama: 'member1'},
  {id:2, nama: 'member2'},
  {id:3, nama: 'member3'},
  {id:4, nama: 'member4'},
  {id:5, nama: 'member5'},
]

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname+ '/index.html'));
})

//?req Halaman Form
app.get("/form",(req,res)=>{
 //* res.sendFile("form.html",{root:path.join(__dirname+"/public")})
  res.sendFile(path.join(__dirname+"/public/form.html"))
})
app.post("/form",(req,res)=>{
  res.end(JSON.stringify(req.body))
})

//? reques irvanhtml
app.get('/irvan',(req,res)=>{
  res.sendFile(path.join(__dirname+'/public/irvan.html'))
})

//? API
app.get("/api/members",(req,res)=>{
  res.send(members);
})
//* bermain dengan API
app.get('/api/members/:id',(req,res)=>{
  const member = members.find( m => m.id === parseInt(req.params.id))
  if(!member) res.status(404).redirect(__dirname+'/public/404.html')
  res.send(member)
})

//?API github


//?req halaman app
app.get('/app', (req,res)=>{
  res.send("<h1>Ini Dari APP</h1>");
})


//? 404 NotFound!
app.get(/^(.+)$/,(req,res)=>{
  res.sendFile(path.join(__dirname+'/public/404.html'))
})

// const port = process.env.PORT || 3000

app.listen(3001,()=>{
  console.log(`magic happend at http://127.0.0.1:3001 ...`)
}) 