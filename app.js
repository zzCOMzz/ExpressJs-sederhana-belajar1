const express = require('express');
const app = express()
const path = require('path')
const Joi = require('joi')
// const fs = require("path")
const bodyParser = require("body-parser")
const dom = require("./doc.js")

app.use(bodyParser())

app.use(express.json())

const members = []

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname+ '/index.html'));
})
//*#############################################################################################
//todo BELAJAR GET, POST, PUT , DELETE
//? API
app.get("/api/members",(req,res)=>{
  res.send(members);
})

app.post('/api/members',(req,res)=>{
  const {error} = vldMember(req.body) //? result.error
  if(error) return res.status(400).send(error.details[0].message)
   
  const member = {
    id: members.length + 1,
    nama: req.body.nama     
  };
  members.push(member)
  res.send(member);
})

app.put('/api/members/:id',(req,res)=>{
  //todo cek member, jika tidak ada , return 404
  const member = members.find( m => m.id === parseInt(req.params.id))
  if(!member) return res.status(404).redirect(__dirname+'/public/404.html')
  
  //todo validasi, jika invalid , return 400 - bad request
  const {error} = vldMember(req.body) //? result.error
  if(error) return res.status(400).send(error.details[0].message)
  
  //todo update member, return  updatetan member
  member.nama = req.body.nama
  res.send(member);
})

function vldMember(member){
  const vld = {
    nama: Joi.string().min(4).required()
  }
  return Joi.validate(member, vld)
}

app.delete('/api/members/:id', (req, res) => {
  //todo cek member, jika tidak ada return 404
  const member = members.find( m => m.id === parseInt(req.params.id))
  if(!member) return res.status(404).redirect(__dirname+'/public/404.html')
  

  //todo Delete
  const del = members.indexOf(member)
  members.splice(del, 1)

  //todo return member yang sama
  res.send(member)
});

//* bermain dengan API
app.get('/api/members/:id',(req,res)=>{
  const member = members.find( m => m.id === parseInt(req.params.id))
  if(!member) return res.status(404).redirect(__dirname+'/public/404.html')
  res.send(member)
})

//*#################################################################################################
//?req halaman app
app.get('/app', (req,res)=>{
  res.send("<h1>Ini Dari APP</h1>");
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

//? 404 NotFound!
app.get(/^(.+)$/,(req,res)=>{
  res.status(404).sendFile(path.join(__dirname+'/public/404.html'))
})

// const port = process.env.PORT || 3000
app.listen(3000,()=>{
  console.log(`magic happend at http://127.0.0.1:3000 ...`)
}) 