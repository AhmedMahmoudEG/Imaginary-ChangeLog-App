import express from 'express';
//I need to make the api
const app =express();

app.get('/',(req,res)=>{
    console.log('hello from express')
    res.status(200);
    res.json({message:"hello"})
})
export default app;