import express from 'express';
import cors from 'cors';

const server = express();
server.use(cors())
server.use(express.json())

const users = []

server.post('/sign-up',(req, res)=>{
    const user = req.body;
    avatarTweet = user.avatar;
    users.push(user)
    res.send("OK")
})

server.listen(5000,() => {
    console.log("API ATIVA")
});