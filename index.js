$(document).ready(() => {
    loadMainImage();
    setTimeout(fetchPhotos, 1000);

});
var imageData = [];

async function loadMainImage() {


    try {
        let response = fetch("https://api.unsplash.com/photos/?client_id=lz0WtbT_YAZdZKUvfjBLkO9Fifnhw6y9S4kYJx7cj0A&per_page=10&order_by=latest&w=100vw&height=80vh");
        let imageData = await response;
        let jsonData = imageData.json();
        let finalData = await jsonData;
        /*Getting reference to another array for downloading purposes.*/
        imageData = finalData;
        let element = Math.floor(Math.random() * (finalData.length - 0) + 0)
        $(".searchContainer").css("background-image", "url(" + finalData[element].urls.full + ")")


    } catch (e) {
        swal("", "Something happened!" + e, "error")
    }
}


async function fetchPhotos() {
    try {
        let response = fetch("https://api.unsplash.com/photos/?client_id=lz0WtbT_YAZdZKUvfjBLkO9Fifnhw6y9S4kYJx7cj0A&page=30&order_by=latest");
        let imageData = await response;
        let json = imageData.json();
        let finalData = await json;
        /*Looping the array and appending the search results.*/
        imageData = finalData;
        finalData.map((photo) => {
            var childElement = "<div class='child'><img src=" + photo.urls.regular + " data-aos='zoom-in'><button  data-aos='zoom-in' type='button' class='btn btn-success' id='downloadButton'>Download.</button></div>";
            $(".photoContainer").append(childElement);

        });


    } catch (e) {
        swal("", "Something happened!" + e, "error")
    }

}

if (window.innerWidth < 800) {
    $("#searchBar").attr("placeholder", " 🔍 Search for images!");
}
$("#searchBar").on("keydown", (event) => {
    if (event.key === "Enter") {
        searchPhotos($("#searchBar").val())
    }

})

async function searchPhotos(query) {
    try {
        let response = fetch("https://api.unsplash.com/search/photos/?client_id=lz0WtbT_YAZdZKUvfjBLkO9Fifnhw6y9S4kYJx7cj0A&query=" + query);
        let imageData = await response;
        let json = imageData.json();
        let finalData = await json;
        $(".photoContainer").empty();
        /*Assigning the results array to a variable.*/
        let searchedImage = finalData.results;
        /*Looping the array and appending the search results.*/
        searchedImage.map((image) => {
            $(".photoContainer").append("<div class='child'><img   src=" + image.urls.regular + " data-aos = zoom-in" + ">"+"<button data-aos='zoom-in' type='button' class='btn btn-success' id='downloadButton'>Download."+"</button>"+"</div>");
        });


        /*Adding 1000px to the current scroll position.*/
        $(window).scrollTop($(window).scrollTop() + 1000);
        $("#searchBar").val("");
    } catch (e) {
        swal("", "Something happened!" + e, "error")
    }


}

$(".photoContainer").on("click", "#downloadButton", function() {
 swal("","Right click on this image and select open image in new tab and save the image.","info");
});





