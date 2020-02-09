var betterDocAPIKey = "c570e2001f75afa94675595ad2391528";
var nutriAPIKey = "";
var queryBetterDoctor = "https://api.betterdoctor.com/2016-03-01/doctors?location=37.773,-122.413,100&skip=2&limit=10&user_key=" + betterDocAPIKey;
var btnHouse = $("btnHome");

//various kinds of buttons
//Diabetes buttons
var lowCarb= $("<button>Low Carbs</button>")
var lowCal=$("<button>Low Cal</button>")
var lowFat=$("<button>Low Fat</button>")
//Heart Disease Buttons
var cholFree= $("<button>Cholesterol Free</button>");
var lowSod = $("<button> Low Sodium</button>");
var highFiber = $("<button> High Fiber</button>");
//Food Allergy Buttons
var milkFree= $("<button>Lactose Intolerant</button>");
var nutFree= $("<button> Nut Allergy</button>");
var eggFree= $("<button> Egg Allergy</button>");
//Set all these buttons to share the same class based on what drop down option they came from. As well as an id for the data pull.

$(lowCarb).attr("class", "queryBtn btn btn-primary");
$(lowCarb).attr("id", "low-carb");
$(lowCal).attr("class", "queryBtn btn btn-primary");
$(lowCal).attr("id", "low-calorie");
$(lowFat).attr("class", "queryBtn btn btn-primary");
$(lowFat).attr("id", "low-fat");

$(cholFree).attr("class", "queryBtn btn btn-primary");
$(cholFree).attr("id", "cholesterol-free");
$(lowSod).attr("class", "queryBtn btn btn-primary");
$(lowSod).attr("id", "low-sodium");
$(highFiber).attr("class", "queryBtn btn btn-primary");
$(highFiber).attr("id", "high-fiber");

$(milkFree).attr("class", "queryBtn btn btn-primary");
$(milkFree).attr("id", "no-milk-ingredients");
$(nutFree).attr("class", "queryBtn btn btn-primary");
$(nutFree).attr("id", "no-tree-nut-ingredients");
$(eggFree).attr("class", "queryBtn btn btn-primary");
$(eggFree).attr("id", "no-egg-ingredients");



function diet(){
    location.replace('file:///C:/Users/Gabe/Desktop/Class_Stuff/Project%20%231/Project1/Nutrition.html')
};

function jsFunction(m){
    console.log(m);
    $("#btnHome").innerHTML="";
    //$("#btnHome").html("");
    if (m<=1){
        //var r= $("<");
        $("#btnHome").empty();
        $("#btnHome").append(lowCal);
        $("#btnHome").append("<br>");
        $("#btnHome").append(lowCarb);
        $("#btnHome").append("<br>");
        $("#btnHome").append(lowFat);
    } else if(m<=2){
        $("#btnHome").empty();
        $("#btnHome").append(cholFree);
        $("#btnHome").append("<br>");
        $("#btnHome").append(lowSod);
        $("#btnHome").append("<br>");
        $("#btnHome").append(highFiber);
    }else if(m=3){
        $("#btnHome").empty();
        $("#btnHome").append(milkFree);
        $("#btnHome").append("<br>");
        $("#btnHome").append(nutFree);
        $("#btnHome").append("<br>");
        $("#btnHome").append(eggFree);
    }
};

//Notes:

//style the buttons according to css for buttons
//Add a home page function that will take you back to the Doctors Page
//Fill out the rest of the links coresponding buttons 
//Add functionality to the buttons (communicate with Rashmi about this)



//Work on wireframe box layout on Monday
