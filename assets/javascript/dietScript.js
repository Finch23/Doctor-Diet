//API key and App id of Nutrinix
var nutriAPIKey = "a9fb6c8edc2b740ab7b9f3d3f9a3eea2";
var nutriAppId = "49764774";
var dietEntry = "";
//Rendering Specific diet buttons depending on user's input condition

function renderDietBtns() {
    $("#btnHome").html("");
    console.log("it works");
    var userCondition = $("#userCondition").val();
    if(userCondition == 1) {
       //create buttons for "low-fat, low-calorie, low-carb"  
       var btn1 = $("<button>").attr("class", "border btn btn-lg mb-2 text-center queryBtn").attr('onClick', 'openClickedDiet(id)').attr('id', "low-fat").css('display','block').text("Low Fat"); 
       var btn2 = $("<button>").attr("class", "border btn btn-lg mb-2 text-center queryBtn").attr('onClick', 'openClickedDiet(id)').attr('id', "low-calorie").css('display','block').text("Low Calorie"); 
       var btn3 = $("<button>").attr("class", "border btn btn-lg mb-2 text-center queryBtn").attr('onClick', 'openClickedDiet(id)').attr('id', "low-carb").css('display','block').text("Low Carb");                           
    } else if(userCondition == 2) {
        //create buttons for "Low-cholesterol, low-sodium, high-fiber"
        var btn1 = $("<button>").attr("class", "border btn btn-lg mb-2 text-center queryBtn").attr('onClick', 'openClickedDiet(id)').attr('id', "low-cholesterol").css('display','block').text("Cholesterol Free"); 
        var btn2 = $("<button>").attr("class", "border btn btn-lg mb-2 text-center queryBtn").attr('onClick', 'openClickedDiet(id)').attr('id', "low-sodium").css('display','block').text("Low Sodium"); 
        var btn3 = $("<button>").attr("class", "border btn btn-lg mb-2 text-center queryBtn").attr('onClick', 'openClickedDiet(id)').attr('id', "high-fiber").css('display','block').text("High Fiber"); 
    } else if(userCondition == 3) {
        //create buttons for "vegan, ketogenic-diet, mediterranean-diet"
        var btn1 = $("<button>").attr("class", "border btn btn-lg mb-2 text-center queryBtn").attr('onClick', 'openClickedDiet(id)').attr('id', "vegan").css('display','block').text("Vegan"); 
        var btn2 = $("<button>").attr("class", "border btn btn-lg mb-2 text-center queryBtn").attr('onClick', 'openClickedDiet(id)').attr('id', "ketogenic-diet").css('display','block').text("Ketogenic"); 
        var btn3 = $("<button>").attr("class", "border btn btn-lg mb-2 text-center queryBtn").attr('onClick', 'openClickedDiet(id)').attr('id', "mediterranean-diet").css('display','block').text("Mediterranean");
    }
    $("#btnHome").append(btn1, btn2, btn3);
}

//function when a city is clicked on search history
function openClickedDiet(id){
    dietEntry = id;
    dietList();
}
//Ajax call to populate specific diet food-item
function dietList() {
    $("#docImage").hide();
    $(".dietList1").empty();
    $(".dietList2").empty();
    $(".dietList3").empty();
    var queryNutrition = "https://api.nutritionix.com/v1_1/search/" + dietEntry + "?results=0:20&fields=item_name,brand_name,item_id,nf_calories&appId=" + nutriAppId + "&appKey=" + nutriAPIKey;
    return $.ajax({
        url: queryNutrition,
        method: "GET"
        }).then(function(res) {
            for(var i=0; i < 9; i++) {
                //creating card and setting its content
                var cardDiv = $("<div>").attr("class","card mb-2 shadow-lg rounded").css("max-width", "15rem");
                //Creating image and star col
                var imgIcon = $("<img>").attr("class", "card-img-top pl-4").css("width","90%");
                //Checking the gender of the doctor and displaying the profile icon accordingly
                if((i%2) === 0) {
                    var srcImg1 = "assets/images/" + dietEntry +".jpg";
                    imgIcon.attr("src", srcImg1);
                } else {
                    var srcImg2 = "assets/images/" + dietEntry +".png";
                    imgIcon.attr("src", srcImg2);
                }
                //Creating card body
                var cardBodyDiv =$("<div>").attr("class","card-body text-center");
                // setting body text of card like title, item-name, brand-name and serving size 
                var cardTitle = $("<p>").attr("class","card-title mb-2 p-2 h5 border-bottom rounded-pill border-info").text(res.hits[i].fields.item_name);
                var text1 = $("<p>").attr("class", "card-text mb-2").html("<b>Brand Name:</b>" + res.hits[i].fields.brand_name);
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

