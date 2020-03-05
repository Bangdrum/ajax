var cars = ["Porsche", "BMW", "Ford", "Audi", "Subaru", "Mclaren", "Chevrolet"];


function renderButtons() {
    $("#car-buttons").empty();
    for (i = 0; i < cars.length; i++) {
        $("#car-buttons").append("<button class='btn btn-success' data-car='" + cars[i] + "'>" + cars[i] + "</button>");
    }
}

renderButtons();




$("button").on("click", function () {
    var car = $(this).attr("data-car");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + car + "&api_key=L0iakG5CnfxMVemWFG2OAufbs2Lyl7SW&limit=3"


    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function (response) {
            var results = response.data;


            for (var i = 0; i < results.length; i++) {
                var carDiv = $("<div>");
                var p = $("<p>").text("Name: " + results[i].title);
                var carImg = $("<img>");

                carImg.attr("src", results[i].images.original_still.url);
                carImg.attr("data-still", results[i].images.original_still.url);
                carImg.attr("data-animate", results[i].images.original.url);
                carImg.attr("data-state", "still");
                carImg.attr("class", "gif");
                carDiv.prepend(p);
                carDiv.prepend(carImg);
                $("#cars").prepend(carDiv);
            }
        });
});

$("#add-car").on("click", function () {
    event.preventDefault();
    var car = $("#car-input").val().trim();
    cars.push(car);
    renderButtons();
    return;
});

function changeState() {
    var state = $(this).attr("data-state");
    var animateImage = $(this).attr("data-animate");
    var stillImage = $(this).attr("data-still");

    if (state == "still") {
        $(this).attr("src", animateImage);
        $(this).attr("data-state", "animate");
    } else if (state == "animate") {
        $(this).attr("src", stillImage);
        $(this).attr("data-state", "still");
    }
}


$(document).on("click", ".gif", changeState);
// $(document).on("click", ".btn", cars);---------->page doesn't work when adding new button to array and clicking.