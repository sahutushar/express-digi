// const express =('express') not going to work 
import 'dotenv/config'
import express from 'express'

const app =express()
const port = process.env.PORT || 3000

// basic send the data 

// app.get("/",(req,res)=>{
//     res.send("Hello from tushar and his tea")
// })

// app.get("/ice-tea", (req, res) => {
//   res.send("what ice -tea would you prefer");
// });

// app.get("/twitter", (req, res) => {
//   res.send("tushardotcom");
// });

// Accepting the data 

app.use(express.json())

let teaData =[]

let nextId =1


// add a new tea 
app.post('/teas',(req,res)=>{
  
    const {name,price}=req.body
    const newTea ={id:nextId++,name,price}
    teaData.push(newTea)
    res.status(201).send(newTea)
})


// get a tea with id 
app.get("/teas",(req,res)=>{
    res.status(200).send(teaData)
})

app.get('/teas/:id',(req,res)=>{
 const tea = teaData.find(t => t.id === parseInt(req.params.id))

if(!tea){
    return res.status(404).send('tea not found')
}
res.status(200).send(tea)
});


// update tea 

app.put('/teas/:id',(req,res)=>{
    const tea = teaData.find((t) => t.id === parseInt(req.params.id));
    if(!tea){
    return res.status(404).send('tea not found')
    }

    const {name,price} =req.body
     tea.price = name
    tea.price =price
    res.send(200).send(tea)
})


// Delete a tea

app.delete('/teas/:id', (req, res) => {
  const index = teaData.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send('tea not found');
  }

  teaData.splice(index, 1);
  res.sendStatus(204); 
});



app.listen(port,()=>{
    console.log(`Server is running at port: ${port}...`);
    
})