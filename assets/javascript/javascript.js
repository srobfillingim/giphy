$( document ).ready(function() {
    
    var shows = ["Game of Thrones", "Cowboy Bebop", "The Office", "Parks and Rec", "Broad City", "Adventure Time", "True Detective", "Fargo", "Letterkenny", "Future Man","That 70's Show", "Samurai Champloo", "It's Always Sunny in Philidelphia", "Arrested Development"];
    
    function displayGifButtons(){
        $("#gifButtonsView").empty(); 
        for (var i = 0; i < shows.length; i++){
            var gifButton = $("<button>");
            gifButton.addClass("show");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", shows[i]);
            gifButton.text(shows[i]);
            $("#gifButtonsView").append(gifButton);
        }
    } action
   
    function addNewButton(){
        $("#addGif").on("click", function(){
        var show = $("#show-input").val().trim();
        if (show == ""){
          return false; 
        }
        shows.push(show);
    
        displayGifButtons();
        return false;
        });
    }

    function removeLastButton(){
        $("removeGif").on("click", function(){
        shows.pop(show);
        displayGifButtons();
        return false;
        });
    }
   
    function displayGifs(){
        var show = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=Tip7fQIODjNvR0DOzrzkrctQuJKlMPL6";
        console.log(queryURL); 
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            console.log(response); 
            $("#gifsView").empty(); 
            var results = response.data; 
            if (results == ""){
              alert("There isn't a gif for this selected button");
            }
            for (var i=0; i<results.length; i++){
    
                var gifDiv = $("<div>"); 
                gifDiv.addClass("gifDiv");
                
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);
                
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
                gifImage.attr("data-state", "still"); // set the image state
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                
                $("#gifsView").prepend(gifDiv);
            }
        });
    }
    
    displayGifButtons(); 
    addNewButton();
    removeLastButton();
    
    $(document).on("click", ".show", displayGifs);
    $(document).on("click", ".image", function(){
        var state = $(this).attr('data-state');
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
    });