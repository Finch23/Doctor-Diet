var betterDocAPIKey = "c570e2001f75afa94675595ad2391528";
var cityAPIKey = "2a29d28596f5b969578c8d643d9842b5";
var docSpeciality = "";

//function gets triggered when search button is clicked
function searchDoctor() {
    docArea = $("#searchDoctor").val();
    if(docArea == 1) docSpeciality = "specialty_uid=internist%2Cfamily-practitioner";
    if(docArea == 2) 
    docSpeciality = "specialty_uid=pediatrician%2Callergist%2Cobstetrics-gynecologist%2Cfoot-ankle-orthopedist%2C";
    city =  $("#city").val().trim();
    if($.isNumeric(city) == false){
        //call Ajax call function for city details, five day forecast and add city in the list
        cityDetails();
    } else {
        $("#errorModal").modal('show');
    }
}

//Ajax call to weatherAPI to get the latitude and longitude of a city where the user is searching for doctor
function cityDetails() {
    var queryCityURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + cityAPIKey;
    var queryBetterDoctorPart1 = "https://api.betterdoctor.com/2016-03-01/doctors?" + docSpeciality + "&location=" 
    var queryBetterDoctorPart2 = ",10&limit=10&user_key=" + betterDocAPIKey;
    $.ajax({
        url: queryCityURL,
        method: "GET"
    }).then(function(data) {
        //Getting latitude and longitude of a city
        queryBetterDoctor = queryBetterDoctorPart1 + data.coord.lat + "," + data.coord.lon + queryBetterDoctorPart2;
       //call function to display UVindex, fivedayforecast and display city searched in the list
        doctorList(queryBetterDoctor);
    },function(error){
        //For invalid input show the error message
       $('#errorModal').modal('show');
    });
}
//Display doctor's list
function doctorList(queryBetterDoctor) {
    $("#docImage").hide();
    $(".carousel-item").empty();
    return $.ajax({
        url: queryBetterDoctor,
        method: "GET"
        }).then(function(res) {
            for(var i=0; i < 9; i++) {
               //creating card and setting its content
                var cardDiv = $("<div>").attr("class","card mb-2 shadow-lg bg-white rounded").css("max-width", "35rem");
                var cardRow = $("<div>").attr("class","row no-gutters");
                //Creating image and star col
                var cardImgCol = $("<div>").attr("class","col-4");
                var imgIcon = $("<img>").attr("class", "card-img m-2");
                //Checking the gender of the doctor and displaying the profile icon accordingly
                if(res.data[i].profile.gender === 'female') {
                    imgIcon.attr("src", "assets/images/femaleDocImg.jpg");

                } else {
                    imgIcon.attr("src", "assets/images/maleDocImg.jpg");

                }
                //Creating star div and span and calling star function to convert numeric rating into stars
                var starDiv = $("<div>").attr("class","text-center");
                if (res.data[i].ratings.length !== 0) {
                    var starSpan = $("<span>").attr("class", "stars").attr("data-rating", res.data[i].ratings[0].rating);
                    $(".stars").stars();    
                }
                //appending star span in star div
                starDiv.append(starSpan);
                //Creating Information col of the card
                var cardInfoCol = $("<div>").attr("class","col-8");
                var cardBodyDiv =$("<div>").attr("class","card-body text-center");
                //displaying first and lastname and displaying them as title
                var cardTitle = $("<p>").attr("class","card-title mb-4 h3").text(res.data[i].profile.first_name + " " +res.data[i].profile.last_name);
                // setting body text of card like title, speciality, Address and phone number 
                var text1 = $("<p>").attr("class", "card-text mb-4 h6").text(res.data[i].profile.title);
                var text2 = $("<p>").attr("class", "card-text").html("<b>Speciality:</b> " + res.data[i].specialties[0].name);
                var text3 = $("<p>").attr("class", "card-text").html("<b>Address:</b> " + res.data[i].practices[0].visit_address.street + "," + res.data[i].practices[0].visit_address.city);
                var text4Icon = $("<i>").attr("class", "fa fa-phone-square");
                var text4Text = " " + res.data[i].practices[0].phones[0].number;
                var text4 = $("<p>").attr("class", "card-text h6");
                text4.append(text4Icon, text4Text);
                //Appending CardTitle and its texts into cardBody
                cardBodyDiv.append(cardTitle, text1, text2, text3, text4);
                //Appending cardBody into cardInfoCol
                cardInfoCol.append(cardBodyDiv);
                //Appending image into cardImgCol
                cardImgCol.append(imgIcon, starDiv);
                ////Appending cardImgCol and cardInfoCol into my cardRow
                cardRow.append(cardImgCol, cardInfoCol);
                //finally the cardRow into my Card div
                cardDiv.append(cardRow);
                //Adding the Card in the docList div
                if(i < 3) {
                    $(".docList1").append(cardDiv);
                }else if(i < 6) {
                    $(".docList2").append(cardDiv);
                }else if(i < 9)
                    $(".docList3").append(cardDiv);
            }
    });
}

//function to convert numeric rating into star rating
$.fn.stars = function() {
    return $(this).each(function() {
        //getting actual rating and total number of stars
        const rating = $(this).data("rating");
        const numStars = 5;
        //rendering the star
        const fullStar = '<i class="fas fa-star"></i>'.repeat(Math.floor(rating));
        //checking if it is fully divisible by 1 and accordingly setting it to half or not
        const halfStar = (rating%1!== 0) ? '<i class="fas fa-star-half-alt"></i>': '';
        //if it is fully divisible by '1' then fill the whole star
        const noStar = '<i class="far fa-star"></i>'.repeat(Math.floor(numStars-rating));
        $(this).html(`${fullStar}${halfStar}${noStar}`);
    });
}
