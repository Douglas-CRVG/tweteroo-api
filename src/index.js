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
        res.status(201).send("OK")
    } else {
        res.status(400).send("Todos os campos são obrigatórios!")
    }
})

server.post('/tweets',(req, res)=>{
    let tweet = {
        username: req.headers.user,
        tweet: req.body.tweet
    }
    let checkRequisition = Object.getOwnPropertyNames(tweet);
    if ((checkRequisition.length === 2) && checkRequisition.includes("username") && checkRequisition.includes("tweet") && (tweet.username !== "" && tweet.tweet !== "")){
        let user = users.find( user => user.username === tweet.username);
        tweets.push({...tweet, avatar: user.avatar})
        res.status(201).send("OK")
    } else {
        res.status(400).send("Todos os campos são obrigatórios!")
    }
})

server.get('/tweets',(req, res)=>{
    let tweetsOnScreen = [];
    if (tweets.length > 10){
        for (let i = 10; i >= 1; i--) {
            tweetsOnScreen.push(tweets[tweets.length - i])
        }
    } else {
        tweetsOnScreen = [...tweets];
    }
    res.send(tweetsOnScreen.reverse())
})

server.get('/tweets/:USERNAME', (req, res)=>{
    const username = req.params.USERNAME
    const userTweets = tweets.filter(tweet => tweet.username === username);
    res.send(userTweets)
})

server.listen(5000,() => {
    console.log("API ATIVA")
});