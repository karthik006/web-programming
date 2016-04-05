var main = function() {
    "use strict";
    	var postsList, imgId;
    var user = {
            "id": 0,
            "userName": "",
			"like" : [],
			"notLike" : []
        },
        username, pwd, like = [],
        notLike = [];

    function myfunction() {
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
                    "<img id="+imgId +" src=" + JSON.stringify(reddit.image_link) + "width='70' height='60' class='postimage'>" + "</a>" + "</div>" +
                    "<div class='Content-List'>" +
                    "<a href=" + JSON.stringify(reddit.main_link) + ">" +
                    "<p class='postname'>" + reddit.link_title + "</p>" +
                    "<div class='subtitles'>" + "<p class='username'>By " + reddit.username + "</p>" +
                    "<p class='time'>" + timeSince(new Date(reddit.post_time)) + "</p>" +
                      "</div>" + "</a>" + "<div id=" + reddit.id + " class='imageDivLink' ></div>" +
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
                    // alert(reddit.id);
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
                $("#postform")[0].reset();

            }); //end of foreach function
            if (sessionStorage.getItem('user')) {
                user.id = sessionStorage.getItem('id');
                user.userName = sessionStorage.getItem('user');
                username = sessionStorage.getItem('user');
                pwd = sessionStorage.getItem('password');
                var x, y;
                x = sessionStorage.getItem('like');
                y = sessionStorage.getItem('notLike');
				console.log(sessionStorage);
                            $("#user").text("Welcome, "+username);//adding the username to the header nav bar.
                            $("#logoutTopNav").show();
                            $("#loginTopNav").hide();
							$("#signUp").hide();
							$("#mySavedPosts").show();

console.log(x);
                like=x.split(',');

				//check if the array is empty or not--karthik
                like.forEach(function(element) {
					if(element!=""){
                    $("#" + element + ".voteUpButton").hide();
                    $("#" + element + ".voteUpButtonDisabled").show();
					}});

				 console.log(y);
                notLike=y.split(',');
				console.log(notLike);

                 //check if the array is empty or not--karthik
                notLike.forEach(function(element) {
					if(element!=""){
                    $("#" + element + ".voteDownButton").hide();
                    $("#" + element + ".voteDownButtonDisabled").show();
				} });
			}

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
                    // alert(reddit.id);
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

               });pages(getData.length);
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
                  "<img id="+imgId +" src=" + JSON.stringify(reddit.image_link) + "width='70' height='60' class='postimage'>" + "</a>" + "</div>" +
                  "<div class='Content-List'>" +
                  "<a href=" + JSON.stringify(reddit.main_link) + ">" +
                  "<p class='postname'>" + reddit.link_title + "</p>" +
                  "<div class='subtitles'>" + "<p class='username'>By " + reddit.username + "</p>" +
                  "<p class='time'>" + timeSince(new Date(reddit.post_time)) + "</p>" +
                    "</div>" + "</a>" + "<div id=" + reddit.id + " class='imageDivLink' ></div>" +
                  "<div id=" + reddit.id + " class='contentDivImg'></div>" + "</div>";
               $(postsList).appendTo('div.postsContainer');
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
                                                    
                                               $("img#" + reddit.id + ".postimage").replaceWith("<img id= " + reddit.id + " src=" + link2 + " class='postimage' >");
                                            }
                                        }
                

                if (reddit.image_link != "image/noimage.jpg") {
                    // alert(reddit.id);
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
               });pages(getData.length);
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
                   "<img id="+imgId +" src=" + JSON.stringify(reddit.image_link) + "width='70' height='60' class='postimage'>" + "</a>" + "</div>" +
                   "<div class='Content-List'>" +
                   "<a href=" + JSON.stringify(reddit.main_link) + ">" +
                   "<p class='postname'>" + reddit.link_title + "</p>" +
                   "<div class='subtitles'>" + "<p class='username'>By " + reddit.username + "</p>" +
                   "<p class='time'>" + timeSince(new Date(reddit.post_time)) + "</p>" +
                     "</div>" + "</a>" + "<div id=" + reddit.id + " class='imageDivLink' ></div>" +
                   "<div id=" + reddit.id + " class='contentDivImg'></div>" + "</div>";
                $(postsList).appendTo('div.postsContainer');
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
                    // alert(reddit.id);
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
                });pages(getData.length);
          });
//user posts tab:
     $("#mySavedPosts").on("click",function(){
              // var mypost=getData.concat();//to get a new copy of (getData array) without affecting the original array.
                $('div.postsContainer').empty();
                var userpostsdisplay=[];                                       
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
                    // alert(reddit.id);
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
                     
          });

            //Like event:
            $("img.voteUpButton").on("click", function() {
               var $imgId = this.id,
                    main_link, link_title,post_time,postingUser,image_link,image,video, result = $("#" + this.id + ".votesNum").text();
                                var userposts=[];                                       
                                 getData.forEach(function(reddit) {
                                      if(reddit.username===username){
                                        userposts.push(reddit.id);
                                    }
                                }); //forEach ending
                        var userpostsjson=JSON.stringify(userposts);
                if (username) { // check if the user loged in before letting user to change the Likes status.
                    //if the like button and not like button, both are off:
                    if (!like.includes(this.id) && !notLike.includes(this.id)) {
                        like.push(this.id); // push the post Id to the like list.
                        //write the like array content to the json file.
                        
						if (notLike[0] ===NaN || notLike[0]===null || notLike[0]===""){
                        notLike.shift(1);
                        } // A safety check to avoid null and undefined values
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
                                "notLikes": dt2,
                                 "posts":userpostsjson

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
                        if (notLike[0] ===NaN || notLike[0]===null || notLike[0]===""){
                        notLike.shift(1);
						}
						var dt1 = JSON.stringify(like);
                        var dt2 = JSON.stringify(notLike);
                            console.log("like"+like);
                        $.ajax({
                            type: "PUT",
                            url: "http://localhost:3000/users/" + user.id,
                            data: {
                                "id": user.id,
                                "name": user.userName,
                                "password": pwd,
                                "likes": dt1,
                                "notLikes": dt2,
                                "posts":userpostsjson
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
                    post_time= getData[this.id - 1].post_time;
                    postingUser= getData[this.id - 1].username;
                    image=getData[this.id - 1].image;
                    video=getData[this.id - 1].video;
                   console.log(post_time);
                   console.log(postingUser);
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
							           "post_time" : post_time,
							           "username": postingUser,
                         "image": image,
                            "video":video
                        }
                    });
                } else { //check if not loged in, then it want let the user to do likes or not likes.
                    //alert("OOPs! Sorry, you need to log-in first..");
                    $("#modal2").openModal();
                }
            }); //end of like up event.


            //Not Like event:
            $("img.voteDownButton").on("click", function() {
               var $imgId = this.id,
                    main_link, link_title,post_time,postingUser, image_link,image,video, result = $("#" + this.id + ".votesNum").text();
                    var userposts=[];                                       
                                 getData.forEach(function(reddit) {
                                      if(reddit.username===username){
                                        userposts.push(reddit.id);
                                    }
                                }); //forEach ending
                        var userpostsjson=JSON.stringify(userposts);
                if (username) { // check if the user loged in before letting user to change the Likes status.
                    if (!notLike.includes(this.id) && !like.includes(this.id)) {
                        notLike.push(this.id);
                       // a safety check to avoid null and undefined values
                        if (notLike[0] ===NaN || notLike[0]===null || notLike[0]===""){
                        notLike.shift(1);
                        } //writting the content of notlike array to the json file.
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
                                "notLikes": dt2,
                                "posts":userpostsjson
                            }
                        });
                        $("#" + this.id + ".voteDownButton").hide();
                        $("#" + this.id + ".voteDownButtonDisabled").show();
                        result--; // result is the number of likes after increasing or decreasing
                    } else if (like.includes(this.id)) {
                        like.splice(like.indexOf(this.id), 1);
                        notLike.push(this.id);
                        if (notLike[0] ===NaN || notLike[0]===null || notLike[0]===""){
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
                                "notLikes": dt2,
                                "posts":userpostsjson
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
                    post_time= getData[this.id - 1].post_time;
                    postingUser= getData[this.id - 1].username;
                     image=getData[this.id - 1].image;
                    video=getData[this.id - 1].video;
                    
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
							             "post_time" : post_time,
							             "username": postingUser,
                            "image":image,
                            "video":video

                        }
                    });
                } else {
                    //alert("OOPs! Sorry, you need to log-in first..");
                    $("#modal2").openModal();
                }
            }); //end of like down event.

            pages(getData.length);
        }); //end of $.get function

    } //end of my function
    $(".button-collapse").sideNav();
        $('.modal-trigger').leanModal();
        
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
 
    function login() {
        $("#login").on("click", function() {
            //initilaizing user object to zero.
            username = document.getElementById("username").value;
            pwd = document.getElementById("password").value;
            //console.log(username);
            if (username === "") {
                alert("please enter your username");
            } else if (pwd === "") {
                alert("please enter your password");
            } else {
                var j = JSON.parse('{"name":"' + username + '","password":"' + pwd + '"}');
                $.ajax({
                    url: "http://localhost:3000/users",
                    type: "GET",
                    dataType: "json",
                    data: j,
                    success: function(result) {
                      //  console.log(result.length);
                        if (result.length === 0) {
                            alert("login failed");
                        } else {
                            $('#modal2').closeModal();    //new line
                            $("input#username").val("");  //new line
                            $("input#password").val("");  //new line
                            alert("login Successful");
							//tempObject to store initial get request value, in order to parse it later, then store in in user object.
                            var tempObject = result[0];
							//console.log(result[0]);
                            user.id = tempObject.id;
                            user.userName = tempObject.name;
							//console.log(tempObject.likes);
                            like = JSON.parse(tempObject.likes);
                            notLike = JSON.parse(tempObject.notLikes);
                            //console.log(like);
                            //console.log(notLike);
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

        $("#Register").on("click", function() {
            var username = document.getElementById("reguser").value;
            var pass = document.getElementById("regpass").value;
			var mt;
            //swapnil
			var j1 = JSON.parse('{"name":"' + username + '"}');
            $.ajax({
                    url: "http://localhost:3000/users",
                    type: "GET",
                    dataType: "json",
                    data: j1,
                    success: function(result){
                        console.log(result);
                        if(result.length===0){
                            mt="not_match";
                        }
                        else{  
                            mt="match";
                        }}
            });
            var confirm = document.getElementById("confirmpass").value;
            if (username === "" || pass === "" || confirm === "") {
                alert("please enter the values !!!!");
            } else if (pass !== confirm) {
                alert("password not matching");
            } else if(mt==="not_match") {
				var l1=[],l2=[];
				var st1= JSON.stringify(l1);
				var st2= JSON.stringify(l2);
				console.log("st1"+st1);
                var j = JSON.parse('{"name":"' + username + '","password":"' + pass + '","likes":"' +st1+ '","notLikes":"' +st2+ '"}');
                $.ajax({
                    type: "POST",
                    data: j,
                    url: "http://localhost:3000/users",
                    dataType: "json",
                    success: function() {
                        alert("Registered successfully");
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
							location.reload(true);
							
					});
				
				},
                    failure: function(errMsg) {
                        alert(errMsg);
                    }
                });
				}
				else{
                alert("user already exist");
                document.getElementById("reguser").value="";
                document.getElementById("regpass").value="";
                document.getElementById("confirmpass").value="";
            }
            
        });
    } /// end of login function

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
            console.log("logged out!\n");
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
                myfunction();
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
            
             alert(username+"   "+user.id+" "+pwd +"");
            if ($("#input1").val() === "" || $("#input2").val() == "" ) {
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
                    alert($("#input3").val()+"hsdjkfh"+$("#input4").val());
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
                                    myfunction();
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
                            return false;
                            element.stopImmediatePropagation();
                                
                            });
                            
                        } else if(($("#input3").val() !== undefined)&&($("#input4").val() === undefined)) {
                            var image=$("#input3").val();
                           if (image.match("^https?://(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:/[^/#?]+)+\.(?:gif|.png|.jpg|.jpeg|.tif|.tiff|.bmp)$")) {
                             alert("matched")
                              alert("posting value from image fields");
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
                                myfunction();
                                $('#modal1').closeModal();
                            });
                              }else{
                                 alert("not matched");
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
                            alert(videourl);
                            if ((videourl.match('https?://(www.)?youtube|youtu\.be'))||(videourl.match('https?://(player.)?vimeo\.com'))||(videourl.match("^https?://(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:/[^/#?]+)+\.(?:gifv)$"))) {
                                alert("posting value from video fields");

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
                                myfunction();
                                $('#modal1').closeModal();
                            });
                           element.preventDefault();
                            $("div#imageinput").replaceWith("<div class='addimage'><a class='imgurl btn waves-effect waves-light grey'>Add Image URL</a></div>");
                            $("div#videoinput").replaceWith("<div class='addvideo'><a class='videourl btn waves-effect waves-light grey'>Add Video URL</a></div> ");
                           
                        }else{
                            alert("not matched");
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
    myfunction();
}; //end of main function

$(document).ready(main);