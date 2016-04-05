/*globals $:false , jQuery:false*/
var main = function() {
    "use strict";
    	
    var user = {
            "id": 0,
            "userName": "",
			"like" : [],
			"notLike" : []
        },
        username, pwd, like = [],
        notLike = [];

    function postFunction() {
	$("#logoutTopNav").hide();
    $("#loginTopNav").show();
    $("#mySavedPosts").hide();
    $.get("http://localhost:3000/reddit", function(getData) {
       $("div.postsContainer").empty();
			 getData.forEach(function(reddit) {
				var imgId = reddit.id;
                var postsList = "<div class ='postContent z-depth-1'>" +
                    "<div class = 'votes'>" +
                    "<img  id=" + imgId + " class='voteUpButton' src='image/up.png'>" +
                    "<img  id=" + imgId + " class='voteUpButtonDisabled' src='image/upDisabled.png' style='opacity:0.4; display: none;'>" + "<br>" +
                    "<strong id =" + reddit.id + " class='votesNum'>" + reddit.likes + "</strong>" + "<br>" +
                    "<img  id=" + imgId + " class='voteDownButton' src='image/down.png'>" +
                    "<img  id=" + imgId + " class='voteDownButtonDisabled' src='image/downDisabled.png' style='opacity:0.4; display: none;'>" +
                    "</div>" + "<div class='image'>" + "<a href=" + JSON.stringify(reddit.main_link) + ">" +
                    "<img autoplay='false' src=" + JSON.stringify(reddit.image_link) + "width='70' height='60' class='postimage'>" + "</a>" + "</div>" +
                    "<div class='Content-List'>" +
                    "<a href=" + JSON.stringify(reddit.main_link) + ">" +
                    "<p class='postname'>" + reddit.link_title + "</p>" +
                    "<div class='subtitles'>" + "<p class='username'>By " + reddit.username + "</p>" +
                    "<p class='time'>" + timeSince(new Date(reddit.post_time)) + "</p>" +
                    "<p class='share'> share" + "</p>" + "</div>" + "</a>" + "<div id=" + reddit.id + " class='imageDivLink' ></div>" +
                    "<div id=" + reddit.id + " class='contentDivImg'></div>" + "</div>";
                $(postsList).appendTo('div.postsContainer');
                //$("#" + reddit.id + ".votesNum").text(reddit.likes);
				//image thumbnail display if video
                if(reddit.video===1){
                                 var mediatype1={};
                                 mediatype1=imageurlvalidation(reddit.image_link);
                                           if(mediatype1.type==="youtube"){
                                                var link="https://www.youtube.com/embed/"+mediatype1.id; 
                                                $("img#"+reddit.id+".postimage").replaceWith("<iframe id=" + reddit.id + " src=" + link + " class='postimage' scrolling='no' frameborder='0' allowfullscreen></iframe>");                                            
                                            }else if(mediatype1.type==="vimeo"){
                                                var link1="https://player.vimeo.com/video/"+mediatype1.id;
                                                $("img#" + reddit.id + ".postimage").replaceWith("<iframe id=" + reddit.id + " src=" + link1 + " class='postimage' scrolling='no' frameborder='0' allowfullscreen></iframe>");
                                            }else{
                                                var res = reddit.image_link.length-5;
                                                    res=reddit.image_link.substring(0, res);
                                                    var link2=res+"h.jpeg";
                                               $("img#" + reddit.id + ".postimage").replaceWith("<img id=" + reddit.id + " src=" + link2 + " class='postimage' >");
                                            }
                                        }
                 if (reddit.image_link != "image/noimage.jpg") {
                    
                    $("#" + reddit.id + ".imageDivLink").html("<i class='material-icons play'>play_circle_filled</i>");
                }

                //for image/video button click and popup
                            $("div").on("click", "#" + reddit.id + ".imageDivLink", function() {

                                    if ($("#" + this.id + ".contentDivImg").css('display') === 'none') {
                                        $("div.imageDivLink i.pause").not(this).text("play_circle_filled");
                                        $(".contentDivImg").not(this).hide();
                                        
                                        if (reddit.image === 1) {
                                            
                                            $("#" + this.id + ".contentDivImg").html("<img id=" + reddit.id + " src=" + JSON.stringify(reddit.image_link) + " width='100%' height='auto' />");
                                            $("#" + this.id + ".contentDivImg").css('display', 'block');
                                            $("#" + reddit.id + ".imageDivLink").html("<i class='material-icons pause'>pause_circle_filled</i>");
                                        } else if(reddit.video===1){
                                            $("#" + this.id + ".contentDivImg").css('display', 'block');
                                            $("#" + reddit.id + ".imageDivLink").html("<i class='material-icons pause'>pause_circle_filled</i>");
                                           var mediatype=imageurlvalidation(reddit.image_link);
                                           if(mediatype.type==="youtube"){
                                                var link="https://www.youtube.com/embed/"+mediatype.id; 
                                                $("#" + this.id + ".contentDivImg").html("<iframe id=" + reddit.id + " src=" + link + " width='100%' height='300' frameborder='0' allowfullscreen></iframe>");
                                              
                                            }else if(mediatype.type==="vimeo"){
                                                var link1="https://player.vimeo.com/video/"+mediatype.id;
                                                $("#" + this.id + ".contentDivImg").html("<iframe id=" + reddit.id + " src=" + link1 + " width='100%' height='300' frameborder='0' allowfullscreen></iframe>");
                                            }else{
                                                $("#" + this.id + ".contentDivImg").html("<iframe id=" + reddit.id + " src=" + reddit.image_link + " width='100%' height='300' frameborder='0' allowfullscreen></iframe>");
                                            }
                                        }
                                    }else {
                                            $("#" + this.id + ".contentDivImg").css('display', 'none');
                                            $("#" + reddit.id + ".imageDivLink").html("<i class='material-icons play'>play_circle_filled</i>");
                                        }
                                    
                            }); //End-image display
                $("#postform")[0].reset();

            }); //end of foreach function
//session storage variable
            if (sessionStorage.getItem('user')) {
                user.id = sessionStorage.getItem('id');
                user.userName = sessionStorage.getItem('user');
                username = sessionStorage.getItem('user');
                pwd = sessionStorage.getItem('password');
                var a,b,x, y;
                a = sessionStorage.getItem('like');
                b = sessionStorage.getItem('notLike');

       
        x= a.replace(/^,|,$/g,'');
        y= b.replace(/^,|,$/g,'');
        //console.log(y);
                            $("#user").text("Welcome, "+username);//adding the username to the header nav bar.
                            $("#logoutTopNav").show();
                            $("#loginTopNav").hide();
							$("#signUp").hide();
							$("#mySavedPosts").show();

                like=x.split(',');


                 
        //check if the array is empty or not--karthik
                like.forEach(function(element) {
          if(element!==""){
                    $("#" + element + ".voteUpButton").hide();
                    $("#" + element + ".voteUpButtonDisabled").show();
          }});


                notLike=y.split(',');


                 //check if the array is empty or not--karthik
                notLike.forEach(function(element) {
          if(element!==""){
                    $("#" + element + ".voteDownButton").hide();
                    $("#" + element + ".voteDownButtonDisabled").show();
        } });
      }


            function clickLike(){//like functionality
                  $("img.voteUpButton").on("click", function() {
                    
                      var $imgId = this.id,
                          main_link, link_title,timePost,imageValue,videoValue,postingUser,image_link, result = $("#" + this.id + ".votesNum").text();
					  
                      if (username) { // check if the user loged in before letting user to change the Likes status.
                          //if the like button and not like button, both are off:
                          if (!like.includes(this.id) && !notLike.includes(this.id)) {

                              like.push(this.id); // push the post Id to the like list.
                              //write the like array content to the json file.
                              if (like[0] ===isNaN || like[0]===null || like[0]===""){
                              like.shift(1);
                            }
                               
                              var dt1 = JSON.stringify(like);
                              var dt2 = JSON.stringify(notLike);

            //var result = test.slice(1,-1);
                              
                              $.ajax({
                                  type: "PUT",
                                  url: "http://localhost:3000/users/" + user.id,
                                  data: {
                                      "id": user.id,
                                      "name": user.userName,
                                      "password": pwd,
                                      "likes": dt1,
                                      "notLikes": dt2,
                                  }
                              });
                              //hide the like button and show the blurrd like button:
                              $("#" + this.id + ".voteUpButton").hide();
                              $("#" + this.id + ".voteUpButtonDisabled").show();
                              result++; // result is the number of likes after increasing or decreasing
                          }

                          //if the post is already not liked before:
                          else if (notLike.includes(this.id)) {
                              notLike.splice(notLike.indexOf(this.id), 1); //take the id from not like list.
                              like.push(this.id); //push the id to the like list.
                              //writting the like array to the json file.
                              if (like[0] ===isNaN || like[0]===null || like[0]===""){
                              like.shift(1);
                            }
                              var dt4 = JSON.stringify(like);
                              var dt5 = JSON.stringify(notLike);
                                  
                              $.ajax({
                                  type: "PUT",
                                  url: "http://localhost:3000/users/" + user.id,
                                  data: {
                                      "id": user.id,
                                      "name": user.userName,
                                      "password": pwd,
                                      "likes": dt4,
                                      "notLikes": dt5,

                                  }
                              });
                              $("#" + this.id + ".voteUpButton").hide();
                              $("#" + this.id + ".voteUpButtonDisabled").show();
                              $("#" + this.id + ".voteDownButton").show();
                              $("#" + this.id + ".voteDownButtonDisabled").hide();
                              result++;
                              result++;
                          }
                          sessionStorage.setItem('like', like);
                          sessionStorage.setItem('notLike', notLike);
                          $("#" + this.id + ".votesNum").text(result); //updating the html with the new "Likes" value
                          //get request to get other reddit.json elements by using only the ID:
                          main_link = getData[this.id - 1].main_link;
                          link_title = getData[this.id - 1].link_title;
                          image_link = getData[this.id - 1].image_link;
                          timePost= getData[this.id - 1].post_time;
                          postingUser= getData[this.id - 1].username;
						  imageValue = getData[this.id - 1].image;
						  videoValue = getData[this.id - 1].video;
                         
                         $.ajax({
                              type: "PUT",
                              url: "http://localhost:3000/reddit/" + $imgId,
                              data: {
                                  "id": $imgId,
                                  "image_link": image_link,
                                  "likes": result,
                                  "link_title": link_title,
                                  "main_link": main_link,
                                  "post": "submitted",
                               "post_time" : timePost,
                               "username": postingUser,
							   "image"  : imageValue,
							   "video" : videoValue
							   
                              }
                          });
                      } else { //check if not loged in, then it want let the user to do likes or not likes.
                          alert("OOPs! Sorry, you need to log-in first..");
                      }
                  });
                   //end of like up event.
            }//end of clickLike function.

            function clickNotLike(){//unlike functionality
              $("img.voteDownButton").on("click", function() {
                  var $imgId = this.id,
                      main_link, link_title,imageValue,videoValue,timePost,postingUser, image_link, result = $("#" + this.id + ".votesNum").text();

                  if (username) { // check if the user loged in before letting user to change the Likes status.
                      if (!notLike.includes(this.id) && !like.includes(this.id)) {
                          notLike.push(this.id);
                          //writting the content of notlike array to the json file.

                          if (notLike[0] ===isNaN || notLike[0]===null || notLike[0]===""){
                          notLike.shift(1);
                          }

                          var dt1 = JSON.stringify(like);
                          var dt2 = JSON.stringify(notLike);
                          $.ajax({
                              type: "PUT",
                              url: "http://localhost:3000/users/" + user.id,
                              data: {
                                  "id": user.id,
                                  "name": user.userName,
                                  "password": pwd,
                                  "likes": dt1,
                                  "notLikes": dt2
                              }
                          });
                          $("#" + this.id + ".voteDownButton").hide();
                          $("#" + this.id + ".voteDownButtonDisabled").show();
                          result--; // result is the number of likes after increasing or decreasing
                      } else if (like.includes(this.id)) {
                          like.splice(like.indexOf(this.id), 1);
                          notLike.push(this.id);
                          if (notLike[0] ===isNaN || notLike[0]===null || notLike[0]===""){
                          notLike.shift(1);
                          }

                          var dt5 = JSON.stringify(like);
  						            var dt6 = JSON.stringify(notLike);
                          $.ajax({
                              type: "PUT",
                              url: "http://localhost:3000/users/" + user.id,
                              data: {
                                  "id": user.id,
                                  "name": user.userName,
                                  "password": pwd,
                                  "likes": dt5,
                                  "notLikes": dt6
                              }
                          });
                          $("#" + this.id + ".voteDownButton").hide();
                          $("#" + this.id + ".voteDownButtonDisabled").show();
                          $("#" + this.id + ".voteUpButton").show();
                          $("#" + this.id + ".voteUpButtonDisabled").hide();
                          result--;
                          result--;
                      }
                      sessionStorage.setItem('like', like);
                      sessionStorage.setItem('notLike', notLike);

                      $("#" + this.id + ".votesNum").text(result); //updating the html with the new "Likes" value
                      //get request to get other reddit.json elements by using only the ID:
                          main_link = getData[this.id - 1].main_link;
                          link_title = getData[this.id - 1].link_title;
                          image_link = getData[this.id - 1].image_link;
                          timePost= getData[this.id - 1].post_time;
                          postingUser= getData[this.id - 1].username;
						  imageValue = getData[this.id - 1].image;
						  videoValue = getData[this.id - 1].video;
                         
                         $.ajax({
                              type: "PUT",
                              url: "http://localhost:3000/reddit/" + $imgId,
                              data: {
                                  "id": $imgId,
                                  "image_link": image_link,
                                  "likes": result,
                                  "link_title": link_title,
                                  "main_link": main_link,
                                  "post": "submitted",
								"post_time" : timePost,
                               "username": postingUser,
							   "image"  : imageValue,
							   "video" : videoValue
							   
                              }
                          });
                  } else {
                      alert("OOPs! Sorry, you need to log-in first..");
                  }
              }); //end of like down event.
            }//end of clickNotLike function.
pages(getData.length);
$(".button-collapse").sideNav();
    $('.modal-trigger').leanModal();
    $('.tooltipped').tooltip({
        delay: 50
    });




//Newest tab click event:
          $("ul.tabs li:nth-child(1) a").on("click",function(){
               var newest=getData;
               $('div.postsContainer').empty();
               newest.forEach(function(reddit){
                var imgId = reddit.id;
               var postsList = "<div class ='postContent z-depth-1'>" +
                     "<div class = 'votes'>" +
                     "<img  id=" + imgId + " class='voteUpButton' src='image/up.png'>" +
                     "<img  id=" + imgId + " class='voteUpButtonDisabled' src='image/upDisabled.png' style='opacity:0.4; display: none;'>" + "<br>" +
                     "<strong id =" + reddit.id + " class='votesNum'>" + reddit.likes + "</strong>" + "<br>" +
                     "<img  id=" + imgId + " class='voteDownButton' src='image/down.png'>" +
                     "<img  id=" + imgId + " class='voteDownButtonDisabled' src='image/downDisabled.png' style='opacity:0.4; display: none;'>" +
                     "</div>" + "<div class='image'>" + "<a href=" + JSON.stringify(reddit.main_link) + ">" +
                     "<img autoplay='false' src=" + JSON.stringify(reddit.image_link) + "width='70' height='60' class='postimage'>" + "</a>" + "</div>" +
                     "<div class='Content-List'>" +
                     "<a href=" + JSON.stringify(reddit.main_link) + ">" +
                     "<p class='postname'>" + reddit.link_title + "</p>" +
                     "<div class='subtitles'>" + "<p class='username'>By " + reddit.username + "</p>" +
                     "<p class='time'>" + timeSince(new Date(reddit.post_time)) + "</p>" +
                     "<p class='share'> share" + "</p>" + "</div>" + "</a>" + "<div id=" + reddit.id + " class='imageDivLink' ></div>" +
                     "<div id=" + reddit.id + " class='contentDivImg'></div>" + "</div>";
                 $(postsList).prependTo('div.postsContainer');
				 if(reddit.video===1){
                                 var mediatype1={};
                                 mediatype1=imageurlvalidation(reddit.image_link);
                                           if(mediatype1.type==="youtube"){
                                                var link="https://www.youtube.com/embed/"+mediatype1.id; 
                                                $("img#"+reddit.id+".postimage").replaceWith("<iframe id=" + reddit.id + " src=" + link + " class='postimage' scrolling='no' frameborder='0' allowfullscreen></iframe>");                                            
                                            }else if(mediatype1.type==="vimeo"){
                                                var link1="https://player.vimeo.com/video/"+mediatype1.id;
                                                $("img#" + reddit.id + ".postimage").replaceWith("<iframe id=" + reddit.id + " src=" + link1 + " class='postimage' scrolling='no' frameborder='0' allowfullscreen></iframe>");
                                            }else{
                                                var res = reddit.image_link.length-5;
                                                    res=reddit.image_link.substring(0, res);
                                                    var link2=res+"h.jpeg";
                                               $("img#" + reddit.id + ".postimage").replaceWith("<img id=" + reddit.id + " src=" + link2 + " class='postimage' >");
                                            }
                                        }
                

                if (reddit.image_link != "image/noimage.jpg") {
                  
                    $("#" + reddit.id + ".imageDivLink").html("<i class='material-icons play'>play_circle_filled</i>");
                }

                //image/video popup
                            $("div").on("click", "#" + reddit.id + ".imageDivLink", function() {

                                    if ($("#" + this.id + ".contentDivImg").css('display') === 'none') {
                                        $("div.imageDivLink i.pause").not(this).text("play_circle_filled");
                                        $(".contentDivImg").not(this).hide();
                                        
                                        if (reddit.image === 1) {
                                            
                                            $("#" + this.id + ".contentDivImg").html("<img id=" + reddit.id + " src=" + JSON.stringify(reddit.image_link) + " width='100%' height='auto' />");
                                            $("#" + this.id + ".contentDivImg").css('display', 'block');
                                            $("#" + reddit.id + ".imageDivLink").html("<i class='material-icons pause'>pause_circle_filled</i>");
                                        } else if(reddit.video===1){
                                            $("#" + this.id + ".contentDivImg").css('display', 'block');
                                            $("#" + reddit.id + ".imageDivLink").html("<i class='material-icons pause'>pause_circle_filled</i>");
                                           var mediatype=imageurlvalidation(reddit.image_link);
                                           if(mediatype.type==="youtube"){
                                                var link="https://www.youtube.com/embed/"+mediatype.id; 
                                                $("#" + this.id + ".contentDivImg").html("<iframe id=" + reddit.id + " src=" + link + " width='100%' height='300' frameborder='0' allowfullscreen></iframe>");
                                              
                                            }else if(mediatype.type==="vimeo"){
                                                var link1="https://player.vimeo.com/video/"+mediatype.id;
                                                $("#" + this.id + ".contentDivImg").html("<iframe id=" + reddit.id + " src=" + link1 + " width='100%' height='300' frameborder='0' allowfullscreen></iframe>");
                                            }else{
                                                $("#" + this.id + ".contentDivImg").html("<iframe id=" + reddit.id + " src=" + reddit.image_link + " width='100%' height='300' frameborder='0' allowfullscreen></iframe>");
                                            }
                                        }
                                    }else {
                                            $("#" + this.id + ".contentDivImg").css('display', 'none');
                                            $("#" + reddit.id + ".imageDivLink").html("<i class='material-icons play'>play_circle_filled</i>");
                                        }
                                    
                            }); //End-image display

          
          });
               like.forEach(function(element) {
                  if(element!==""){
                     $("#" + element + ".voteUpButton").hide();
                     $("#" + element + ".voteUpButtonDisabled").show();
               }});
               notLike.forEach(function(element) {
                 if(element!==""){
                   $("#" + element + ".voteDownButton").hide();
                   $("#" + element + ".voteDownButtonDisabled").show();
               } });
              clickLike();
              clickNotLike();
          });

         //Oldest tab click event:
          $("ul.tabs li:nth-child(2) a").on("click",function(){
              var oldest=getData;
              $('div.postsContainer').empty();
               oldest.forEach(function(reddit){
               var imgId = reddit.id;
             var postsList = "<div class ='postContent z-depth-1'>" +
                  "<div class = 'votes'>" +
                  "<img  id=" + imgId + " class='voteUpButton' src='image/up.png'>" +
                  "<img  id=" + imgId + " class='voteUpButtonDisabled' src='image/upDisabled.png' style='opacity:0.4; display: none;'>" + "<br>" +
                  "<strong id =" + reddit.id + " class='votesNum'>" + reddit.likes + "</strong>" + "<br>" +
                  "<img  id=" + imgId + " class='voteDownButton' src='image/down.png'>" +
                  "<img  id=" + imgId + " class='voteDownButtonDisabled' src='image/downDisabled.png' style='opacity:0.4; display: none;'>" +
                  "</div>" + "<div class='image'>" + "<a href=" + JSON.stringify(reddit.main_link) + ">" +
                  "<img autoplay='false' src=" + JSON.stringify(reddit.image_link) + "width='70' height='60' class='postimage'>" + "</a>" + "</div>" +
                  "<div class='Content-List'>" +
                  "<a href=" + JSON.stringify(reddit.main_link) + ">" +
                  "<p class='postname'>" + reddit.link_title + "</p>" +
                  "<div class='subtitles'>" + "<p class='username'>By " + reddit.username + "</p>" +
                  "<p class='time'>" + timeSince(new Date(reddit.post_time)) + "</p>" +
                  "<p class='share'> share" + "</p>" + "</div>" + "</a>" + "<div id=" + reddit.id + " class='imageDivLink' ></div>" +
                  "<div id=" + reddit.id + " class='contentDivImg'></div>" + "</div>";
               $(postsList).appendTo('div.postsContainer');
			   if(reddit.video===1){
                                 var mediatype1={};
                                 mediatype1=imageurlvalidation(reddit.image_link);
                                           if(mediatype1.type==="youtube"){
                                                var link="https://www.youtube.com/embed/"+mediatype1.id; 
                                                $("img#"+reddit.id+".postimage").replaceWith("<iframe id=" + reddit.id + " src=" + link + " class='postimage' scrolling='no' frameborder='0' allowfullscreen></iframe>");                                            
                                            }else if(mediatype1.type==="vimeo"){
                                                var link1="https://player.vimeo.com/video/"+mediatype1.id;
                                                $("img#" + reddit.id + ".postimage").replaceWith("<iframe id=" + reddit.id + " src=" + link1 + " class='postimage' scrolling='no' frameborder='0' allowfullscreen></iframe>");
                                            }else{
                                                var res = reddit.image_link.length-5;
                                                    res=reddit.image_link.substring(0, res);
                                                    var link2=res+"h.jpeg";
                                               $("img#" + reddit.id + ".postimage").replaceWith("<img id=" + reddit.id + " src=" + link2 + " class='postimage' >");
                                            }
                                        }
                

                if (reddit.image_link != "image/noimage.jpg") {
                  
                    $("#" + reddit.id + ".imageDivLink").html("<i class='material-icons play'>play_circle_filled</i>");
                }

                //image/video popup
                            $("div").on("click", "#" + reddit.id + ".imageDivLink", function() {

                                    if ($("#" + this.id + ".contentDivImg").css('display') === 'none') {
                                        $("div.imageDivLink i.pause").not(this).text("play_circle_filled");
                                        $(".contentDivImg").not(this).hide();
                                        
                                        if (reddit.image === 1) {
                                            
                                            $("#" + this.id + ".contentDivImg").html("<img id=" + reddit.id + " src=" + JSON.stringify(reddit.image_link) + " width='100%' height='auto' />");
                                            $("#" + this.id + ".contentDivImg").css('display', 'block');
                                            $("#" + reddit.id + ".imageDivLink").html("<i class='material-icons pause'>pause_circle_filled</i>");
                                        } else if(reddit.video===1){
                                            $("#" + this.id + ".contentDivImg").css('display', 'block');
                                            $("#" + reddit.id + ".imageDivLink").html("<i class='material-icons pause'>pause_circle_filled</i>");
                                           var mediatype=imageurlvalidation(reddit.image_link);
                                           if(mediatype.type==="youtube"){
                                                var link="https://www.youtube.com/embed/"+mediatype.id; 
                                                $("#" + this.id + ".contentDivImg").html("<iframe id=" + reddit.id + " src=" + link + " width='100%' height='300' frameborder='0' allowfullscreen></iframe>");
                                              
                                            }else if(mediatype.type==="vimeo"){
                                                var link1="https://player.vimeo.com/video/"+mediatype.id;
                                                $("#" + this.id + ".contentDivImg").html("<iframe id=" + reddit.id + " src=" + link1 + " width='100%' height='300' frameborder='0' allowfullscreen></iframe>");
                                            }else{
                                                $("#" + this.id + ".contentDivImg").html("<iframe id=" + reddit.id + " src=" + reddit.image_link + " width='100%' height='300' frameborder='0' allowfullscreen></iframe>");
                                            }
                                        }
                                    }else {
                                            $("#" + this.id + ".contentDivImg").css('display', 'none');
                                            $("#" + reddit.id + ".imageDivLink").html("<i class='material-icons play'>play_circle_filled</i>");
                                        }
                                    
                            }); //End-image display

          
         
               });
               like.forEach(function(element) {
                  if(element!==""){
                     $("#" + element + ".voteUpButton").hide();
                     $("#" + element + ".voteUpButtonDisabled").show();
               }});
               notLike.forEach(function(element) {
                 if(element!==""){
                   $("#" + element + ".voteDownButton").hide();
                   $("#" + element + ".voteDownButtonDisabled").show();
               } });
              clickLike();
              clickNotLike();
          });

          //trending tab click event:
          $("ul.tabs li:nth-child(3) a").on("click",function(){
               var trending=getData.concat();//to get a new copy of (getData array) without affecting the original array.
               trending.sort(function(a, b){
                  return b.likes-a.likes;
               });
               $('div.postsContainer').empty();
                trending.forEach(function(reddit){
                var imgId = reddit.id;
             var postsList = "<div class ='postContent z-depth-1'>" +
                   "<div class = 'votes'>" +
                   "<img  id=" + imgId + " class='voteUpButton' src='image/up.png'>" +
                   "<img  id=" + imgId + " class='voteUpButtonDisabled' src='image/upDisabled.png' style='opacity:0.4; display: none;'>" + "<br>" +
                   "<strong id =" + reddit.id + " class='votesNum'>" + reddit.likes + "</strong>" + "<br>" +
                   "<img  id=" + imgId + " class='voteDownButton' src='image/down.png'>" +
                   "<img  id=" + imgId + " class='voteDownButtonDisabled' src='image/downDisabled.png' style='opacity:0.4; display: none;'>" +
                   "</div>" + "<div class='image'>" + "<a href=" + JSON.stringify(reddit.main_link) + ">" +
                   "<img autoplay='false' src=" + JSON.stringify(reddit.image_link) + "width='70' height='60' class='postimage'>" + "</a>" + "</div>" +
                   "<div class='Content-List'>" +
                   "<a href=" + JSON.stringify(reddit.main_link) + ">" +
                   "<p class='postname'>" + reddit.link_title + "</p>" +
                   "<div class='subtitles'>" + "<p class='username'>By " + reddit.username + "</p>" +
                   "<p class='time'>" + timeSince(new Date(reddit.post_time)) + "</p>" +
                   "<p class='share'> share" + "</p>" + "</div>" + "</a>" + "<div id=" + reddit.id + " class='imageDivLink' ></div>" +
                   "<div id=" + reddit.id + " class='contentDivImg'></div>" + "</div>";
                $(postsList).appendTo('div.postsContainer');
				if(reddit.video===1){
                                 var mediatype1={};
                                 mediatype1=imageurlvalidation(reddit.image_link);
                                           if(mediatype1.type==="youtube"){
                                                var link="https://www.youtube.com/embed/"+mediatype1.id; 
                                                $("img#"+reddit.id+".postimage").replaceWith("<iframe id=" + reddit.id + " src=" + link + " class='postimage' scrolling='no' frameborder='0' allowfullscreen></iframe>");                                            
                                            }else if(mediatype1.type==="vimeo"){
                                                var link1="https://player.vimeo.com/video/"+mediatype1.id;
                                                $("img#" + reddit.id + ".postimage").replaceWith("<iframe id=" + reddit.id + " src=" + link1 + " class='postimage' scrolling='no' frameborder='0' allowfullscreen></iframe>");
                                            }else{
                                                var res = reddit.image_link.length-5;
                                                    res=reddit.image_link.substring(0, res);
                                                    var link2=res+"h.jpeg";
                                               $("img#" + reddit.id + ".postimage").replaceWith("<img id=" + reddit.id + " src=" + link2 + " class='postimage' >");
                                            }
                                        }
                

                if (reddit.image_link != "image/noimage.jpg") {
                  
                    $("#" + reddit.id + ".imageDivLink").html("<i class='material-icons play'>play_circle_filled</i>");
                }

                //image/video popup
                            $("div").on("click", "#" + reddit.id + ".imageDivLink", function() {

                                    if ($("#" + this.id + ".contentDivImg").css('display') === 'none') {
                                        $("div.imageDivLink i.pause").not(this).text("play_circle_filled");
                                        $(".contentDivImg").not(this).hide();
                                        
                                        if (reddit.image === 1) {
                                            
                                            $("#" + this.id + ".contentDivImg").html("<img id=" + reddit.id + " src=" + JSON.stringify(reddit.image_link) + " width='100%' height='auto' />");
                                            $("#" + this.id + ".contentDivImg").css('display', 'block');
                                            $("#" + reddit.id + ".imageDivLink").html("<i class='material-icons pause'>pause_circle_filled</i>");
                                        } else if(reddit.video===1){
                                            $("#" + this.id + ".contentDivImg").css('display', 'block');
                                            $("#" + reddit.id + ".imageDivLink").html("<i class='material-icons pause'>pause_circle_filled</i>");
                                           var mediatype=imageurlvalidation(reddit.image_link);
                                           if(mediatype.type==="youtube"){
                                                var link="https://www.youtube.com/embed/"+mediatype.id; 
                                                $("#" + this.id + ".contentDivImg").html("<iframe id=" + reddit.id + " src=" + link + " width='100%' height='300' frameborder='0' allowfullscreen></iframe>");
                                              
                                            }else if(mediatype.type==="vimeo"){
                                                var link1="https://player.vimeo.com/video/"+mediatype.id;
                                                $("#" + this.id + ".contentDivImg").html("<iframe id=" + reddit.id + " src=" + link1 + " width='100%' height='300' frameborder='0' allowfullscreen></iframe>");
                                            }else{
                                                $("#" + this.id + ".contentDivImg").html("<iframe id=" + reddit.id + " src=" + reddit.image_link + " width='100%' height='300' frameborder='0' allowfullscreen></iframe>");
                                            }
                                        }
                                    }else {
                                            $("#" + this.id + ".contentDivImg").css('display', 'none');
                                            $("#" + reddit.id + ".imageDivLink").html("<i class='material-icons play'>play_circle_filled</i>");
                                        }
                                    
                            }); //End-image display

          
         
                });
                like.forEach(function(element) {
                   if(element!=-""){
                      $("#" + element + ".voteUpButton").hide();
                      $("#" + element + ".voteUpButtonDisabled").show();
                }});
                notLike.forEach(function(element) {
                  if(element!==""){
                    $("#" + element + ".voteDownButton").hide();
                    $("#" + element + ".voteDownButtonDisabled").show();
                } });
                clickLike();
                clickNotLike();
          });
//mypost clickevent
$("#mySavedPosts").on("click",function(){
              // var mypost=getData.concat();//to get a new copy of (getData array) without affecting the original array.
                $('div.postsContainer').empty();
                                        
                getData.forEach(function(reddit) {
                   if(reddit.username===username){
                   var imgId = reddit.id;
                   var postsList = "<div class ='postContent z-depth-1'>" +
                   "<div class = 'votes'>" +
                   "<img  id=" + imgId + " class='voteUpButton' src='image/up.png'>" +
                   "<img  id=" + imgId + " class='voteUpButtonDisabled' src='image/upDisabled.png' style='opacity:0.4; display: none;'>" + "<br>" +
                   "<strong id =" + reddit.id + " class='votesNum'>" + reddit.likes + "</strong>" + "<br>" +
                   "<img  id=" + imgId + " class='voteDownButton' src='image/down.png'>" +
                   "<img  id=" + imgId + " class='voteDownButtonDisabled' src='image/downDisabled.png' style='opacity:0.4; display: none;'>" +
                   "</div>" + "<div class='image'>" + "<a href=" + JSON.stringify(reddit.main_link) + ">" +
                   "<img id="+imgId +" src=" + JSON.stringify(reddit.image_link) + "width='70' height='60' class='postimage'>" + "</a>" + "</div>" +
                   "<div class='Content-List'>" +
                   "<a href=" + JSON.stringify(reddit.main_link) + ">" +
                   "<p class='postname'>" + reddit.link_title + "</p>" +
                   "<div class='subtitles'>" + "<p class='username'>By " + reddit.username + "</p>" +
                   "<p class='time'>" + timeSince(new Date(reddit.post_time)) + "</p>" +
                     "</div>" + "</a>" + "<div id=" + reddit.id + " class='imageDivLink' ></div>" +
                   "<div id=" + reddit.id + " class='contentDivImg'></div>" + "</div>";
                $(postsList).prependTo('div.postsContainer');
				

				
                //image thumbnail display if video
                if(reddit.video===1){
                                 var mediatype1={};
                                 mediatype1=imageurlvalidation(reddit.image_link);
                                           if(mediatype1.type==="youtube"){
                                                var link="https://www.youtube.com/embed/"+mediatype1.id; 
                                                $("img#"+reddit.id+".postimage").replaceWith("<iframe id=" + reddit.id + " src=" + link + " class='postimage' scrolling='no' frameborder='0' allowfullscreen></iframe>");                                            
                                            }else if(mediatype1.type==="vimeo"){
                                                var link1="https://player.vimeo.com/video/"+mediatype1.id;
                                                $("img#" + reddit.id + ".postimage").replaceWith("<iframe id=" + reddit.id + " src=" + link1 + " class='postimage' scrolling='no' frameborder='0' allowfullscreen></iframe>");
                                            }else{
                                                var res = reddit.image_link.length-5;
                                                    res=reddit.image_link.substring(0, res);
                                                    var link2=res+"h.jpeg"; 
                                                  
                                               $("img#" + reddit.id + ".postimage").replaceWith("<img id=" + reddit.id + " src=" + link2 + " class='postimage' >");
                                            }
                                        }
                

                if (reddit.image_link != "image/noimage.jpg") {
                    
                    $("#" + reddit.id + ".imageDivLink").html("<i class='material-icons play'>play_circle_filled</i>");
                }

                //image/video popup
                            $("div").on("click", "#" + reddit.id + ".imageDivLink", function() {

                                    if ($("#" + this.id + ".contentDivImg").css('display') === 'none') {
                                        $("div.imageDivLink i.pause").not(this).text("play_circle_filled");
                                        $(".contentDivImg").not(this).hide();
                                        
                                        if (reddit.image === 1) {
                                            
                                            $("#" + this.id + ".contentDivImg").html("<img id=" + reddit.id + " src=" + JSON.stringify(reddit.image_link) + " width='100%' height='auto' />");
                                            $("#" + this.id + ".contentDivImg").css('display', 'block');
                                            $("#" + reddit.id + ".imageDivLink").html("<i class='material-icons pause'>pause_circle_filled</i>");
                                        } else if(reddit.video===1){
                                            $("#" + this.id + ".contentDivImg").css('display', 'block');
                                            $("#" + reddit.id + ".imageDivLink").html("<i class='material-icons pause'>pause_circle_filled</i>");
                                           var mediatype=imageurlvalidation(reddit.image_link);
                                           if(mediatype.type==="youtube"){
                                                var link="https://www.youtube.com/embed/"+mediatype.id; 
                                                $("#" + this.id + ".contentDivImg").html("<iframe id=" + reddit.id + " src=" + link + " width='100%' height='300' frameborder='0' allowfullscreen></iframe>");
                                              
                                            }else if(mediatype.type==="vimeo"){
                                                var link1="https://player.vimeo.com/video/"+mediatype.id;
                                                $("#" + this.id + ".contentDivImg").html("<iframe id=" + reddit.id + " src=" + link1 + " width='100%' height='300' frameborder='0' allowfullscreen></iframe>");
                                            }else{
                                                $("#" + this.id + ".contentDivImg").html("<iframe id=" + reddit.id + " src=" + reddit.image_link + " width='100%' height='300' frameborder='0' allowfullscreen></iframe>");
                                            }
                                        }
                                    }else {
                                            $("#" + this.id + ".contentDivImg").css('display', 'none');
                                            $("#" + reddit.id + ".imageDivLink").html("<i class='material-icons play'>play_circle_filled</i>");
                                        }
                                    
                            }); //End-image display
                           }$("ul.pagination").empty();
                           pages(getData.length);
                   }); //forEach ending
                //$("ul.pagination").empty();
              like.forEach(function(element) {
                  if(element!==""){
                     $("#" + element + ".voteUpButton").hide();
                     $("#" + element + ".voteUpButtonDisabled").show();
               }});
               notLike.forEach(function(element) {
                 if(element!==""){
                   $("#" + element + ".voteDownButton").hide();
                   $("#" + element + ".voteDownButtonDisabled").show();
               } });
              clickLike();
              clickNotLike();       
          });
clickLike();
clickNotLike();

            //pages(getData.length);
        }); //end of $.get function

    } //end of my function

    /*$(".button-collapse").sideNav();
        $('.modal-trigger').leanModal();
        $('.tooltipped').tooltip({
            delay: 50
        });*/

    //For video validation
          function imageurlvalidation(image_link){
                var media={};
                 if(image_link.match('https?://(www.)?youtube|youtu\.be')){
                       var youtube_id;
                    if (image_link.match('embed')) { youtube_id = image_link.split(/embed\//)[1].split('"')[0];}
                       else { youtube_id = image_link.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[0]; }
                        media.type="youtube";
                        media.id=youtube_id;
                        return media;
                      }else if(image_link.match('https?://(player.)?vimeo\.com')) {
                         var regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/,
                            parseUrl = regExp.exec(image_link);
                           media.id=parseUrl[5];
                           media.type  = "vimeo";
                           return media;
                       }else{
                        media.type="imgur";
                        return media;
                       }
            }
        //End ----
 //function login
    function login() {
        $("#login").on("click", function() {
            //initilaizing user object to zero.
            username = document.getElementById("username").value;
            pwd = document.getElementById("password").value;
            
            if (username === "") {
                alert("OOPS! Please enter your username");
            } else if (pwd === "") {
                alert("OOPS! Please enter your password");
            } else {
                var j = JSON.parse('{"name":"' + username + '","password":"' + pwd + '"}');
                $.ajax({
                    url: "http://localhost:3000/users",
                    type: "GET",
                    dataType: "json",
                    data: j,
                    success: function(result) {
                      
                        if (result.length === 0) {
                            alert("Sorry! login failed, Please check your username and password");
                        } else {
                            $('#modal2').closeModal();    //new line
                            $("input#username").val("");  //new line
                            $("input#password").val("");  //new line
                            alert("Welcome !login Successful");
							//tempObject to store initial get request value, in order to parse it later, then store in in user object.
                            var tempObject = result[0];
							
                            user.id = tempObject.id;
                            user.userName = tempObject.name;
							
                            like = JSON.parse(tempObject.likes);
                            notLike = JSON.parse(tempObject.notLikes);
                            
                            sessionStorage.setItem('id', user.id);
                            sessionStorage.setItem('user', username);
                            sessionStorage.setItem('password', pwd);
                            sessionStorage.setItem('like', like);
                            sessionStorage.setItem('notLike', notLike);
							$("#user").text("Welcome, "+username);//adding the username to the header nav bar.
                            $("#mySavedPosts").show();
							$("#logoutTopNav").show();
                            $("#loginTopNav").hide();
							$("#signUp").hide();
                      //for usertab after log in
                        
                          //end
                            function showUserHistory() {
                                //reflect the data from reddit.json file, into the html page:
								
                                like.forEach(function(element) {
                                    $("#" + element + ".voteUpButton").hide();
                                    $("#" + element + ".voteUpButtonDisabled").show();
                                });
                                notLike.forEach(function(element) {
                                    $("#" + element + ".voteDownButton").hide();
                                    $("#" + element + ".voteDownButtonDisabled").show();
                                });
                            }
                            showUserHistory();
                        }
                    },
                    failure: function(errMsg) {
                        alert(errMsg);
                    }
                });
            }

        });
//register functionality
        $("#Register").on("click", function() {
            var username = document.getElementById("reguser").value;
            var pass = document.getElementById("regpass").value;
            var confirm = document.getElementById("confirmpass").value;
            if (username === "" || pass === "" || confirm === "") {
                alert("OOPS! Please fill up the missing values !!");
            } else if (pass !== confirm) {
                alert("Sorry passwords doesnt match");
            }
            else if(username!=="" && pass !== "" && confirm !==""){
               
                var us=document.getElementById("reguser").value;
                var pass1 = document.getElementById("regpass").value;
            var j1 = JSON.parse('{"name":"' + us + '"}');
            $.ajax({
                    url: "http://localhost:3000/users",
                    type: "GET",
                    dataType: "json",
                    data: j1,
                    success: function(result){
                        
                        if(result.length===0){
                            var l1=[],l2=[];
				            var st1= JSON.stringify(l1);
				            var st2= JSON.stringify(l2);
				         
                        var j2 = JSON.parse('{"name":"' + us + '","password":"' + pass1 + '","likes":"' +st1+ '","notLikes":"' +st2+ '"}');
                $.ajax({
                    type: "POST",
                    data: j2,
                    url: "http://localhost:3000/users",
                    dataType: "json",
                    success: function() {
                        alert("Congrats!!Registered successfully");
                        document.getElementById("reguser").value = "";
                        document.getElementById("regpass").value = "";
                        document.getElementById("confirmpass").value = "";
                        $('#modal3').closeModal();
					    $.get("http://localhost:3000/users/", function(data){
						var length = data.length;
						
						    sessionStorage.setItem('id', length);
                            sessionStorage.setItem('user', username);
                            sessionStorage.setItem('password', pass);
                            sessionStorage.setItem('like', like);
                            sessionStorage.setItem('notLike', notLike);
                            $("#signUp").hide();
							location.reload(true);
							
					});
				
				},
                });
                        }
                        else{  
                            alert("Sorry,It looks like the user already exist");
                            document.getElementById("reguser").value="";
                            document.getElementById("regpass").value="";
                            document.getElementById("confirmpass").value="";
                        }}
                });
               
            
                }
        });
    }
	//logout function
    function logout() {
        $("#logoutTopNav").on("click", function() {
            //clearing user data befor loging out & refreshing the page.
            username = "";
            user.id = 0;
            user.userName = "";
            like = [];
            notLike = [];
            sessionStorage.clear();
            location.reload(true);
            
             $("#mySavedPosts").hide(); //Removing of user posts tab
        });
    } //end of logout function

    //Start- hovering action on posts
    $("div").on("mouseover", "div.postContent", function() {
        $(this).addClass("z-depth-2");
    });

    $("div").on("mouseleave", "div.postContent", function() {
        $(this).removeClass("z-depth-2");
    });
    //End- hovering action on posts

    //Start- thumb up/down hovering
    $("div").on("mouseover", "i.material-icons.play ", function() {
        $(this).css("color", "black");
    });
    $("div").on("mouseleave", "i.material-icons.play", function() {
        $(this).css("color", "lightgrey");
    });
    $("div").on("mouseover", "i.material-icons.pause ", function() {
        $(this).css("color", "black");
    });
    $("div").on("mouseleave", "i.material-icons.pause", function() {
        $(this).css("color", "darkgrey");
    });
//dynamic search function
    function search() {
        $("#search").keyup(function() {

            // Retrieve the input field text and reset the count to zero
            var filter = $(this).val(),
                count = 0;

            // Loop through the comment list
            $(".postContent").each(function() {

                // If the list item does not contain the text phrase fade it out
                if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                    $(this).fadeOut();

                    // Show the list item if the phrase matches and increase the count by 1
                } else {

                    $(this).show();
                    count++;
                }
             });
            if (filter === "") {
                $('.postsContainer').empty();
                postFunction();
            }
        });

    } //end of search function

    function timeSince(date) {

        var seconds = Math.floor((new Date() - date) / 1000);

        var interval = Math.floor(seconds / 31536000);

        if (interval > 1) {
            return interval + " years ago";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months ago";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " days ago";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours ago";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " minutes ago";
        }
        return Math.floor(seconds) + " seconds ago";
    } //end of function timesince

       //Start- for postform validation

    jQuery.validator.setDefaults({
        ignore: ".ignore",
        debug: true,
        success: "valid"
        
    });
    $("#postform").validate({
        rules: {
            field: {
                required: false,
                url: true
            }
        }
         
    });
$("#postform").submit(function() {
    $(this).submit(function() {

        return false;
    });
    $(this).find("input[type='submit']").attr('disabled', 'disabled').val('submiting'); 
        return true; 
    });


     $("a.postnews").on("click", function() {
        var form = $("#postform");
       form.validate(); //End- post form validation
        //Start- JQuery code for post fields
        $('#input1').val("");$("#input2").val('');
        $("div#imageinput").replaceWith("<div class='addimage'><a class='imgurl btn waves-effect waves-light grey'>Add Image URL</a></div>");
        $("div#videoinput").replaceWith("<div class='addvideo'><a class='videourl btn waves-effect waves-light grey'>Add Video URL</a></div> ");
        if(username){
           $("#postbutton").unbind("click").click(function(element) {
            
             
            if ($("#input1").val() === "" || $("#input2").val() === "" ) {
                    element.preventDefault();
                    setTimeout(fade_out, 5000);
                    $("#spanbutton").css({
                        "visibility": "visible",
                        "display": "inline"
                    }).text("Enter input");
                        function fade_out() {
                        $("#spanbutton").fadeOut().empty();
                    }
                } 
              else
              {
                if (form.valid() === true) {
                    
                        var date = new Date();
                        $("#spanbutton").css({
                            "visibility": "visible"
                        }).text("");
                        if ((($("#input3").val() === undefined)||($("#input3").val() === "")) && ((($("#input4").val() === undefined)||$("#input4").val() === ""))) {
                            element.preventDefault();
                            
                            $.post("http://localhost:3000/reddit", {
                                "link_title": $("#input1").val(),
                                "main_link": $("#input2").val(),
                                "image_link": "image/noimage.jpg",
                                "likes": 0,
                                "post_time": date,
                                "image":0,
                                "video":0,
                                "username":username
                            }, function() {
                                    postFunction();
                                    $.get("http://localhost:3000/reddit", function(getData) {
                                   var userposts=[];                                       
                                    getData.forEach(function(reddit) {
                                            if(reddit.username===username){
                                                userposts.push(reddit.id);
                                            }
                                        }); //forEach ending
                            var li=JSON.stringify(like), disli=JSON.stringify(notLike), userpostsJson=JSON.stringify(userposts);
                         $.ajax({
                            type: "PUT",
                            url: "http://localhost:3000/users/" + user.id,
                            data: {
                                "id": user.id,
                                "name": user.userName,
                                "password": pwd,
                                "likes": li,
                                "notLikes": disli,
                                "posts":userpostsJson
                                }
                        });//ajax PUT ending
                    }); //getData ending
                            $('#modal1').closeModal();
                            
                            element.stopImmediatePropagation();
                             return false;   
                            });
                            
                        } else if(($("#input3").val() !== undefined)&&($("#input4").val() === undefined)) {
                           var image=$("#input3").val();
                           if (image.match("^https?://(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:/[^/#?]+)+\.(?:gif|.png|.jpg|.jpeg|.tif|.tiff|.bmp)$")) {
                             
                              
                            $.post("http://localhost:3000/reddit", {
                                "link_title": $("#input1").val(),
                                "main_link": $("#input2").val(),
                                "image_link": $("#input3").val(),
                                "image":1,
                                "video":0,
                                "likes": 0,
                                "post_time": date,
                                "username":username
                            }, function() {
                                 $.get("http://localhost:3000/reddit", function(getData) {
                                   var userposts=[];                                       
                                    getData.forEach(function(reddit) {
                                            if(reddit.username===username){
                                                userposts.push(reddit.id);
                                            }
                                        }); //forEach ending
                            var li=JSON.stringify(like), disli=JSON.stringify(notLike), userpostsJson=JSON.stringify(userposts);
                         $.ajax({
                            type: "PUT",
                            url: "http://localhost:3000/users/" + user.id,
                            data: {
                                "id": user.id,
                                "name": user.userName,
                                "password": pwd,
                                "likes": li,
                                "notLikes": disli,
                                "posts":userpostsJson
                                }
                        });//ajax PUT ending
                    }); //getData ending
                            element.preventDefault();
                                postFunction();
                                $('#modal1').closeModal();
                            });
                              }else{
                                 
                                // element.preventDefault();
                                setTimeout(fade_out2, 5000);

                                function fade_out2() {
                                $("#spanbutton").fadeOut().empty();
                                }
                                $("#spanbutton").css({
                                "visibility": "visible",
                                "display": "inline"}).text("Accepts only gif/.png/.jpeg/.jpg/.tif/.tiff/.bmp image formats");
                            }
                        }
                        else{
                            var videourl=$("#input4").val();
                            
                            if ((videourl.match('https?://(www.)?youtube|youtu\.be'))||(videourl.match('https?://(player.)?vimeo\.com'))||(videourl.match("^https?://(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:/[^/#?]+)+\.(?:gifv)$"))) {
                                

                            $.post("http://localhost:3000/reddit", {
                                "link_title": $("#input1").val(),
                                "main_link": $("#input2").val(),
                                "image_link": $("#input4").val(),
                                "image":0,
                                "video":1,
                                "likes": 0,
                                "post_time": date,
                                "username":username
                            }, function() {
                                $.get("http://localhost:3000/reddit", function(getData) {
                                   var userposts=[];                                       
                                    getData.forEach(function(reddit) {
                                            if(reddit.username===username){
                                                userposts.push(reddit.id);
                                            }
                                        }); //forEach ending
                            var li=JSON.stringify(like), disli=JSON.stringify(notLike), userpostsJson=JSON.stringify(userposts);
                              $.ajax({
                                type: "PUT",
                                url: "http://localhost:3000/users/" + user.id,
                                data: {
                                "id": user.id,
                                "name": user.userName,
                                "password": pwd,
                                "likes": li,
                                "notLikes": disli,
                                "posts":userpostsJson
                                    }
                                    });//ajax PUT ending
                                }); //getData ending
                                element.preventDefault();
                                postFunction();
                                $('#modal1').closeModal();
                            });
                           element.preventDefault();
                            $("div#imageinput").replaceWith("<div class='addimage'><a class='imgurl btn waves-effect waves-light grey'>Add Image URL</a></div>");
                            $("div#videoinput").replaceWith("<div class='addvideo'><a class='videourl btn waves-effect waves-light grey'>Add Video URL</a></div> ");
                           
                        }else{
                            
                                 element.preventDefault();
                                setTimeout(fade_out3, 5000);

                                function fade_out3() {
                                $("#spanbutton").fadeOut().empty();
                                }
                                $("#spanbutton").css({
                                "visibility": "visible",
                                "display": "inline"}).text("Accepts Video URL's only from youtube/vimeo/.gifv formats");
                            }
                        }
                        }
                    }
        });
        
        }else {
                //element.preventDefault();
               
                 $('#modal2').openModal();
                  $('#modal1').closeModal();
            }
    });
        //End-code for post fields

  $("div").on("click",".addimage" , function() {
        $("div#videoinput").replaceWith("<div class='addvideo'><a class='videourl btn waves-effect waves-light grey'>Add Video URL</a></div> ");
        $("div.addimage").replaceWith("<div id='imageinput'><input class='input-field ignore' required='false' placeholder='Image URL' name='input3' type='url' id='input3'></div>");
    });
    $("div").on("click",".addvideo",function(){
        $("div#imageinput").replaceWith("<div class='addimage'><a class='imgurl btn waves-effect waves-light grey'>Add Image URL</a></div>");
        $("div.addvideo").replaceWith("<div id='videoinput' ><input class='input-field ignore' required='false' placeholder='Video URL' name='input4' type='url' id='input4'></div>");
    });

//Pagination start
    function pages(totalnumofitems) {
        var numofitems_page = 10,
            numofpages = Math.ceil(totalnumofitems / numofitems_page),
            pagenumbers;
        //  $("div.postsContainer").children().hide();
            $("ul.pagination").empty();
        for (var i = 1; i <= numofpages; i++) {
            pagenumbers = "<li class='waves-effect'>" + i + "</li>";
            $(pagenumbers).appendTo("ul.pagination");
        }
        $("div.postsContainer").children().hide();
        $("div.postsContainer div:nth-child(-n+10)").slice(0).show();
        $("ul.pagination").on("click", "li", function() {
            var page = $(this).text(),
                x = page * 10,
                y = (page - 1) * 10;
            $("li").removeClass("pages");
            $(this).addClass("pages");
            $("div.postsContainer").children().hide();
            $("div.postsContainer div.postContent").slice(y, x).show();
        });
    }    //End of Pagination

    search();
    login();
    logout();
    postFunction();
}; //end of main function

$(document).ready(main);