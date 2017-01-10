var express = require('express')
var bodyParser = require('body-parser')

var app = express()

// middleware set
app.use(bodyParser.json({ type: 'application/json' }))

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST","PUT");
  next();
});

app.get('/', function(req,res){
  res.send('Hello World')
})

var chatArr = []

app.post('/api/chats',function(req, res){
  if(!req.body) return res.sendStatus(400)
  chatArr.push(req.body)
  console.log(chatArr);
  return res.sendStatus(200)
})

app.get('/api/chats',function(req, res){
  return res.status(200).send(chatArr)
})

app.listen(3000)
