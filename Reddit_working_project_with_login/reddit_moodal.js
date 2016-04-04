var main = function() {
    "use strict";
    	var i = 1,
        totalnumofitems, jsondata, postsList, imgId;
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
                
                if (reddit.image_link != "image/noimage.jpg") {
                    // alert(reddit.id);
                    $("#" + reddit.id + ".imageDivLink").html("<i class='material-icons thumbdown'>play_circle_filled</i>");
                }

                $("#" + reddit.id + ".imageDivLink").on("click", function() {
                    if ($("#" + this.id + ".contentDivImg").css('display') === 'none') {
                        $(".contentDivImg").hide();
                        $("#" + this.id + ".contentDivImg").html("<iframe id=" + reddit.id + " src=" + JSON.stringify(reddit.image_link) + " width='auto' height='auto' frameborder='0' allowfullscreen></iframe>");
                        $("#" + this.id + ".contentDivImg").css('display', 'block');
                        $("#" + reddit.id + ".imageDivLink").html("<i class='material-icons thumbdown'>pause_circle_filled</i>");
                    } else {
                        $("#" + this.id + ".contentDivImg").css('display', 'none');
                        $("#" + reddit.id + ".imageDivLink").html("<i class='material-icons thumbdown'>play_circle_filled</i>");
                    }
                });
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
                     "<img autoplay='false' src=" + JSON.stringify(reddit.image_link) + "width='70' height='60' class='postimage'>" + "</a>" + "</div>" +
                     "<div class='Content-List'>" +
                     "<a href=" + JSON.stringify(reddit.main_link) + ">" +
                     "<p class='postname'>" + reddit.link_title + "</p>" +
                     "<div class='subtitles'>" + "<p class='username'>By " + reddit.username + "</p>" +
                     "<p class='time'>" + timeSince(new Date(reddit.post_time)) + "</p>" +
                     "<p class='share'> share" + "</p>" + "</div>" + "</a>" + "<div id=" + reddit.id + " class='imageDivLink' ></div>" +
                     "<div id=" + reddit.id + " class='contentDivImg'></div>" + "</div>";
                 $(postsList).prependTo('div.postsContainer');
               });
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
               });
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
                });
          });
            //Like event:
            $("img.voteUpButton").on("click", function() {
                var $imgId = this.id,
                    main_link, link_title,post_time,username,image_link, result = $("#" + this.id + ".votesNum").text();
					
                if (username) { // check if the user loged in before letting user to change the Likes status.
                    //if the like button and not like button, both are off:
                    if (!like.includes(this.id) && !notLike.includes(this.id)) {
                        like.push(this.id); // push the post Id to the like list.
                        //write the like array content to the json file.
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
							"username": username
							
							
                        }
                    });
                } else { //check if not loged in, then it want let the user to do likes or not likes.
                    alert("OOPs! Sorry, you need to log-in first..");
                }
            }); //end of like up event.


            //Not Like event:
            $("img.voteDownButton").on("click", function() {
                var $imgId = this.id,
                    main_link, link_title,post_time,username, image_link, result = $("#" + this.id + ".votesNum").text();
					
                if (username) { // check if the user loged in before letting user to change the Likes status.
                    if (!notLike.includes(this.id) && !like.includes(this.id)) {
                        notLike.push(this.id);
                        //writting the content of notlike array to the json file.
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
							"username": username
								
                        }
                    });
                } else {
                    alert("OOPs! Sorry, you need to log-in first..");
                }
            }); //end of like down event.
            
            pages(getData.length);
        }); //end of $.get function
        
    } //end of my function
    $(".button-collapse").sideNav();
        $('.modal-trigger').leanModal();
        $('.tooltipped').tooltip({
            delay: 50
        });
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
							console.log(result[0]);
                            user.id = tempObject.id;
                            user.userName = tempObject.name;
							console.log(tempObject.likes);
                            like = JSON.parse(tempObject.likes);
                            notLike = JSON.parse(tempObject.notLikes);
                            console.log(like);
                            console.log(notLike);
                            sessionStorage.setItem('id', user.id);
                            sessionStorage.setItem('user', username);
                            sessionStorage.setItem('password', pwd);
                            sessionStorage.setItem('like', like);
                            sessionStorage.setItem('notLike', notLike);
							$("#user").text("Welcome, "+username);//adding the username to the header nav bar.
                            $("#logoutTopNav").show();
                            $("#loginTopNav").hide();

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
            var confirm = document.getElementById("confirmpass").value;
            if (username === "" || pass === "" || confirm === "") {
                alert("please enter the values !!!!");
            } else if (pass !== confirm) {
                alert("password not matching");
            } else {
                var j = JSON.parse('{"name":"' + username + '","password":"' + pass + '"}');
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
                    },
                    failure: function(errMsg) {
                        alert(errMsg);
                    }
                });
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
    $("div").on("mouseover", "i.material-icons.thumbup ", function() {
        $(this).css("color", "black");
    });
    $("div").on("mouseleave", "i.material-icons.thumbup", function() {
        $(this).css("color", "darkgrey");
    });
    $("div").on("mouseover", "i.material-icons.thumbdown ", function() {
        $(this).css("color", "black");
    });
    $("div").on("mouseleave", "i.material-icons.thumbdown", function() {
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
        debug: true,
        success: "valid"
    });
    $("#postform").validate({
        rules: {
            field: {
                required: true,
                url: true
            }
        }
    });
     $("a.postnews").on("click", function() {
        var form = $("#postform");
        form.validate(); //End- post form validation
        //Start- JQuery code for post fields
        $('#input1').val("");$("#input2").val('');
        $("div#imageinput").replaceWith("<div class='addimage'><a class='imgurl btn waves-effect waves-light grey'>Add Image URL</a></div>");
        $("div#videoinput").replaceWith("<div class='addvideo'><a class='videourl btn waves-effect waves-light grey'>Add Video URL</a></div> ");
        if(username){
        $("#postbutton").click(function(element) {

           
                if ($("#input1").val() === "" || $("#input2").val() == "" || $("#input3").val() == "") {
                    element.preventDefault();
                    setTimeout(fade_out, 5000);
                    $("#spanbutton").css({
                        "visibility": "visible",
                        "display": "inline"
                    }).text("Enter input");
                        function fade_out() {
                        $("#spanbutton").fadeOut().empty();
                    }
                } /*else if ($("#input1").val() !== "" || $("#input2").val() !== "" || $("#input3").val() !== "") {

                    jsondata.forEach(function(reddit1) {
                        if ((reddit1.link_title === $("#input1").val())) {
                            alert(JSON.stringify(reddit1.main_link)+"\\\\   "+$("#input2").val() );
                            console.log(reddit1.main_link);
                            element.preventDefault();
                            setTimeout(fade_out2, 5000);
                            $("#spanbutton").css({
                        "visibility": "visible",
                        "display": "inline"
                        }).text("Post Title already exists in the site");

                            function fade_out2() {
                        $("#spanbutton").fadeOut().empty();
                        $("#postform")[0].reset();
                            }
                        }
                        else if(JSON.stringify(reddit1.main_link) === $("#input2").val()){
                            alert("in second if");
                            element.preventDefault();
                            setTimeout(fade_out4, 5000);
                            $("#spanbutton").css({
                        "visibility": "visible",
                        "display": "inline"
                    }).text("URL already exists in the site");
                            
                            function fade_out4() {
                        $("#spanbutton").fadeOut().empty();
                        $("#postform")[0].reset();
                            }
                        }
                        else if($("#input3").val()!==undefined){
                            if(JSON.stringify(reddit1.image_link) === $("#input3").val()){
                            alert($("#input3").val());
                            element.preventDefault();
                            setTimeout(fade_out3, 5000);
                            $("#spanbutton").css({
                        "visibility": "visible",
                        "display": "inline"
                    }).text("Image/Video URL already exists in the site");
                            function fade_out3() {
                        $("#spanbutton").fadeOut().empty();
                        $("#postform")[0].reset();
                            }
                        }
                        }

                    });
                   
              } */
              else
              {
                if (form.valid() === true) {
                        var date = new Date();
                        $("#spanbutton").css({
                            "visibility": "visible"
                        }).text("");
                        if (($("#input3").val() === undefined)&&($("#input4").val() === undefined)) {
                            alert("posting only 2 fields");
                            $.post("http://localhost:3000/reddit", {
                                "link_title": $("#input1").val(),
                                "main_link": $("#input2").val(),
                                "image_link": "image/noimage.jpg",
                                "likes": 0,
                                "post_time": date
                            }, function() {
                                myfunction();

                            });
                        } else if(($("#input3").val() !== undefined)&&($("#input4").val() === undefined)) {
                            var image=$("#input3").val(),
                                regex="([^\s]+(\.(?i)(jpg|png|gif|bmp|jpeg|tif|tiff))$)";
                            if(image.match(regex)){
                                alert("matched")
                              alert("posting value from image fields");
                            $.post("http://localhost:3000/reddit", {
                                "link_title": $("#input1").val(),
                                "main_link": $("#input2").val(),
                                "image_link": $("#input3").val(),
                                "image":1,
                                "video":0,
                                "likes": 0,
                                "post_time": date
                            }, function() {
                                myfunction();
                            });
                            $('#modal1').closeModal();

                                }else{
                                 alert("not matched");
                                 element.preventDefault();
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
                                "post_time": date
                            }, function() {
                                myfunction();

                            });
                            $('#modal1').closeModal();
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
        $("div.addimage").replaceWith("<div id='imageinput'><input class='input-field validate' placeholder='Image URL' name='input3' type='url' id='input3'></div>");
    });
    $("div").on("click",".addvideo",function(){
        $("div#imageinput").replaceWith("<div class='addimage'><a class='imgurl btn waves-effect waves-light grey'>Add Image URL</a></div>");
        $("div.addvideo").replaceWith("<div id='videoinput'><input class='input-field validate' placeholder='Video URL' name='input4' type='url' id='input4'></div>");
    });


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
