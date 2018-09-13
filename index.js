var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var session = require('express-session')
var moment = require('moment');
var express = require('express'); 
var request = require('request');
var cache = require('memory-cache')
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.use(session({ secret: 'this-is-a-secret-token', cookie: { maxAge: 7*24*60000 }}));

app.set('view engine','ejs');
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res){
  var caches = cache.get('chatApp')
  var day = moment().hour()  
  if(caches != null) {
    var cdata  = []
    for(var i =0;i<caches.length;i++){
      (function(i){
          var dd = caches[i]
          dd.isadd = false
          cdata.push(dd)
      })(i)
    }
    if(day >= 12){
      cdata.push({type:'bot',message:"Hi good aftrenoon welcome back.How can i help you?"})
    }else{
      cdata.push({type:'bot',message:"Hi good mornging welcome back.How can i help you?"})
    }
  }else{
    
    cdata = []
    if(day >= 12){
      cdata.push({type:'bot',message:"Hi good aftrenoon welcome to my world.How can i help you?"})
    }else{
      cdata.push({type:'bot',message:"Hi good mornging welcome to my world.How can i help you?"})
    }
  }
  res.render('index',{
    layout:'layout',
    pagescript:'/default.js',
    chat:cdata,
    moment:moment
	});
});

app.post('/update/session', function(req, res){      
    
     var data = {
       type:req.body.type,
       message:req.body.message
     }
  var caches = cache.get('chatApp')
  if(caches !=null){        
    var olddata = caches
    olddata.push(data)
  }else{
    var olddata = [data]
  }
  
  cache.put('chatApp',olddata,7*24*60000)
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg); 
    if(msg.isadd == undefined){    
      var options = {
        url: 'http://localhost:3333/update/session',
        method: 'POST',
        form: msg
      } 
      request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            console.log(body)
        }
    })
  }
  });
});

http.listen(3333, function(){
  console.log('listening on *:3333');
});
    