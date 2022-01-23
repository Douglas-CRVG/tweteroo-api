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
    avatarTweet = user.avatar;
    users.push(user)
    res.send("OK")
})

server.post('/tweets',(req, res)=>{
    const tweet = req.body;
    tweets.push({...tweet, avatarTweet})
    res.send("OK")
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