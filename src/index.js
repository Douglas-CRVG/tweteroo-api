import express from 'express';
import cors from 'cors';

const server = express();
server.use(cors())
server.use(express.json())

const users = []
const tweets = []
let avatarTweet;

server.post('/sign-up',(req, res)=>{
    const user = req.body;
    let checkRequisition = Object.getOwnPropertyNames(user);
    if ((checkRequisition.length === 2) && checkRequisition.includes("username") && checkRequisition.includes("avatar") && (user.username !== "" && user.avatar !== "")){
        avatarTweet = user.avatar;
        users.push(user)
        res.send("OK")
    } else {
        res.status(400).send("Todos os campos são obrigatórios!")
    }
})

server.post('/tweets',(req, res)=>{
    const tweet = req.body;

    let checkRequisition = Object.getOwnPropertyNames(tweet);
    if ((checkRequisition.length === 2) && checkRequisition.includes("username") && checkRequisition.includes("tweet") && (tweet.username !== "" && tweet.tweet !== "")){
        tweets.push({...tweet, avatarTweet})
        res.send("OK")
    } else {
        res.status(400).send("Todos os campos são obrigatórios!")
    }
})

server.get('/tweets',(req, res)=>{
    let tweetsOnScreen = [];
    if (tweets.length > 10){
        for (let i = 1; i <= 10; i++) {
            tweetsOnScreen.push(tweets[tweets.length - i])
        }
    } else {
        tweetsOnScreen = tweets;
    }
    res.send(tweetsOnScreen)
})

server.listen(5000,() => {
    console.log("API ATIVA")
});