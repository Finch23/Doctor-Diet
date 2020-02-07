var betterDocAPIKey = "c570e2001f75afa94675595ad2391528";
var nutriAPIKey = "";

var queryBetterDoctor = "https://api.betterdoctor.com/2016-03-01/doctors?location=35.732,-78.850,10&limit=10&user_key=" + betterDocAPIKey;
doctorList();
//Display doctor's list
function doctorList() {
    $("#docList").empty();
    return $.ajax({
        url: queryBetterDoctor,
        method: "GET"
        }).then(function(res) {
            for(var i=0; i < 10; i++) {
                    //creating card and setting its content
                    var cardDiv = $("<div>").attr("class","card mb-4 ").css("max-width", "720px");
                    var cardRow = $("<div>").attr("class","row no-gutters");
                    var cardImgCol = $("<div>").attr("class","col-4");
                    var imgIcon = $("<img>").attr("class", "card-img m-2").attr("src", "assets/images/docImg.png");
                    var cardInfoCol = $("<div>").attr("class","col-8");
                    var cardBodyDiv =$("<div>").attr("class","card-body text-center");
                    var cardTitle = $("<h3>").attr("class","card-title").text(res.data[i].profile.first_name + " " +res.data[i].profile.last_name); 
                    var text2 = $("<p>").attr("class", "card-text").html("<b>Speciality:</b> " + res.data[i].specialties[0].name);
                    var text1 = $("<h6>").attr("class", "card-text mb-4").text(res.data[i].profile.title);
                    var text3 = $("<p>").attr("class", "card-text").html("<b>Address:</b> " + res.data[i].practices[0].visit_address.street + "," + res.data[i].practices[0].visit_address.city);
                    var text4Icon = $("<i>").attr("class", "fa fa-phone-square");
                    var text4Text = " " + res.data[i].practices[0].phones[0].number;
                    var text4 = $("<p>").attr("class", "card-text");
                    text4.append(text4Icon, text4Text);
                    //Appending CardTitle and its texts into cardBody
                    cardBodyDiv.append(cardTitle, text1, text2, text3, text4);
                    //Appending cardBody into cardInfoCol
                    cardInfoCol.append(cardBodyDiv);
                    //Appending image into cardImgCol
                    cardImgCol.append(imgIcon);
                    ////Appending cardImgCol and cardInfoCol into my cardRow
                    cardRow.append(cardImgCol, cardInfoCol);
                    //finally the cardRow into my Card div
                    cardDiv.append(cardRow);
                    //Adding the Card in the docList div
                    $("#docList").append(cardDiv);   
            }
    });
}
