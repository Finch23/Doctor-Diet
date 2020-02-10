var nutriAPIKey = "a9fb6c8edc2b740ab7b9f3d3f9a3eea2";
var nutriAppId = "49764774";
var dietEntry = "low-sodium";

var queryNutrition = "https://api.nutritionix.com/v1_1/search/" + dietEntry + "?results=0:20&fields=item_name,brand_name,item_id,nf_calories&appId=" + nutriAppId + "&appKey=" + nutriAPIKey;

//Ajax call to populate specific diet food-item
function dietList() {
    $("#docImage").hide();
    $(".carousel-item").empty();
    var queryNutrition = "https://api.nutritionix.com/v1_1/search/" + dietEntry + "?results=0:20&fields=item_name,brand_name,item_id,nf_calories&appId=" + nutriAppId + "&appKey=" + nutriAPIKey;
    return $.ajax({
        url: queryNutrition,
        method: "GET"
        }).then(function(res) {
            for(var i=0; i < 10; i++) {
                //creating card and setting its content
                var cardDiv = $("<div>").attr("class","card mb-5 shadow-lg rounded").css("max-width", "18rem");
                //Creating image and star col
                var imgIcon = $("<img>").attr("class", "card-img-top m-2").css("width","90%");
                //Checking the gender of the doctor and displaying the profile icon accordingly
                if((i%2) === 0) {
                    imgIcon.attr("src", "assets/images/low-sodium.jpg");

                } else {
                    imgIcon.attr("src", "assets/images/low-sodium.webp");

                }
                //Creating card body
                var cardBodyDiv =$("<div>").attr("class","card-body text-center");
                // setting body text of card like title, item-name, brand-name and serving size 
                var cardTitle = $("<p>").attr("class","card-title mb-4 p-2 h5 border-bottom rounded-pill border-info").text(res.hits[i].fields.item_name);
                var text1 = $("<p>").attr("class", "card-text mb-4").html("<b>Brand Name:</b>" + res.hits[i].fields.brand_name);
                var text2 = $("<p>").attr("class", "card-text").html("<b>Serving Size:</b> " + res.hits[i].fields.nf_serving_size_qty);
                cardBodyDiv.append(cardTitle, text1, text2);
                cardDiv.append(imgIcon, cardBodyDiv);
                //Adding the Card in the docList div
                if(i < 3) {
                    $(".dietList1").append(cardDiv);
                }else if(i < 6) {
                    $(".dietList2").append(cardDiv);
                }else if(i < 9)
                    $(".dietList3").append(cardDiv);   
            }
    });
}

