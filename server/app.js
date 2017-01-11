var express = require('express')
var bodyParser = require('body-parser')

var app = express()

// middleware set
app.use(bodyParser.json({
  type: 'application/json'
}))

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header("Allow", "GET, POST");
  next();
});

app.get('/', function(req, res) {
  res.send('Hello World')
})

app.get('/api/call', function(req,res){
  res.send('server call works')
})

var chatArr = []

app.post('/api/chats', function(req, res) {
  if (!req.body) return res.sendStatus(400)
  chatArr.push(req.body)
  return res.sendStatus(200)
})

app.get('/api/chats', function(req, res) {

  const limitLastFours = array => {
    let lengthArray = array.length
    let result = []
    for (let i = lengthArray - 4, len = lengthArray; i < len; i += 1) {
      result = result.concat(array[i])
    }
    return result
  }

  const isMoreThanFour = array => {
    if (array.length > 4) {
      console.log('more than four');
      return limitLastFours(array)
    } else {
      console.log('less than four');
      return array
    }
  }

  let limitedChatArray = isMoreThanFour(chatArr)
  return res.status(200).send(limitedChatArray)
})

app.listen(3000)
