module.exports = function(io) {

    var mongoose = require('mongoose');
    var express = require('express');
    var router = express.Router();
    var passport = require('passport');
    var jwt = require('express-jwt');
    var path = require('path');
    var User = mongoose.model('User');
    var Posts =  mongoose.model('Posts');
    var Chats =  mongoose.model('Chats');

    var socket;
    var chat_username;
    var assert = require('assert');
    
    var r = [];
    var x = [];
    var y = [];
    var h;
    
    var auth = jwt({
        secret: 'SECRET',
        userProperty: 'payload'
    });

    var trial = [];
    
    /* GET home page. */
    router.get('/', function(req, res, next) {
        res.render('savTrack');
    });


    router.get('/index.html', function(req, res, next) {
        res.render('index');
    });


    router.get('/savTrack.html', function(req, res, next) {
        res.render('savTrack');
    });


    router.get('/home.html', function(req, res, next) {
        res.render('home');
    });


    router.get('/login.html', function(req, res, next) {
        res.render('login');
    });


    io.on('connection', function(socket) {
        
        socket.on('chat message', function(msg) {
            //console.log("usermessage" + msg.username);
            io.emit('chat message', {
                "message": msg.message,
                "username": msg.username
            });
            
            var chat = new Chats();

            chat.msg = msg.message;
            chat.username = msg.username
            chat.roomnumber = h;
            
           
            chat.save(function(err, chat){
                if(err){ return next(err); }
            });

        });

        socket.on('sktEvent', function(data) {
            //console.log("usermessage" + msg.username);
            socket.broadcast.emit("currentPausePlayResult", {
                "currTime": data.currTime,
                "currSongSrc": data.currSongSrc,
                "currentPausePlay": data.currentPausePlay
            });

        });
    });

    //io.emit('some event', { for: 'everyone' });
    router.get('/chats', function(req, res) {

        var roomNo = h; 
        //console.log(roomNo);
        
        var postData = Chats.find({ roomnumber: roomNo});

        postData.exec(function (err, pt){
            if (err) { return next(err); }
        //    if (!answerChoice) { return next(new Error("can't find answer")); }
            res.json(pt);
            //console.log(pt);
        });
    });


    router.get('/room/:id', function(req, res) {

        var id1 = req.params.id;
        h = id1;
        res.sendfile(path.join(__dirname, '../views', 'home.html'));

    });

    router.get('/posts', function(req, res) {
        
        Posts.find(function(err, posts){
            if(err){ 
              return next(err);
            }
            res.json(posts);
        });

    });


    // register users
    router.post('/register', function(req, res, next) {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({
                message: 'Please fill out all fields'
            });
        }
        chat_username = req.body.username;
        //checking for similar username
        User.findOne({
            username: req.body.username
        }, function(err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {

                var user = new User();
                user.username = req.body.username;
                user.setPassword(req.body.password);

                user.save(function(err) {
                    if (err) {
                        return next(err);
                    }
                    return res.json({
                        token: user.generateJWT()
                    })
                });
            } else {
                return res.json({
                    message: 'User already present'
                });
            }
        });

    });

    //create room
    router.post("/room_info", function(req, res) {
    
        var roomId = JSON.stringify(req.body._id);
        var roomname = req.body.roomname;
        var username = req.body.username;

        var post = new Posts();

        post.username = username;
        post.roomId = roomId
        post.room_link = "http://localhost:3000/room";
        post.roomname = roomname;
        post.likes = "0";
        
       
        post.save(function(err, post){
            if(err){ return next(err); }
            res.json(post);
            //console.log(res.json(post));
        });
  
    });


    //ALL rooms
    router.get("/get_info", function(req, res) {
      //  console.log("inside get_info");
        
        Posts.find(function(err, posts){
            if(err){ 
              return next(err);
            }

            res.json(posts);
            //console.log(Posts);
        });

    });

    //get room based on id
    router.get("/getUserRoom", function(req, res) {
        
        var roomId = req.query.roomNo; 
        var postData = Posts.find({ roomId: roomId});

        postData.exec(function (err, pt){
            if (err) { return next(err); }
        //    if (!answerChoice) { return next(new Error("can't find answer")); }
            res.json(pt);
        });

    });


    // login for user
    router.post('/login', function(req, res, next) {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({
                message: 'Please fill out all fields'
            });
        }
        chat_username = req.body.username;
       // console.log("myusernamelogin" + chat_username);
        passport.authenticate('local', function(err, user, info) {
            if (err) {
                return next(err);
            }

            if (user) {
                return res.json({
                    token: user.generateJWT()
                });
            } else {
                return res.json({
                    message: 'No such user present'
                });
            }
        })(req, res, next);

    });

    return router;
}