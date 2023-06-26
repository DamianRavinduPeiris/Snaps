$(document).ready(() => {
    loadMainImage();
    setTimeout(fetchPhotos, 1000);

});
$(".headerText").on("click",()=>{
   window.location.reload();
});
var buttonIndex = [];
var downloadLinks = [];
var searchedImagesLinks = [];
var searchedImagesButtons = [];
var isSearched = false;

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
        var finalData = await json;
    } catch (e) {
        swal("", "Something happened!" + e, "error")
    }
    var btn = 0;
    /*If screen width is > 1028 append small 4tos , else append regular 4tos.*/

    if (window.innerWidth < 800) {
        /*Looping the array and appending the search results.*/
        finalData.map((photo) => {
            var childElement = "<div class='child'><img src=" + photo.urls.small_s3 + " data-aos='zoom-in'><button  data-aos='zoom-in' type='button' class='btn btn-success' id='downloadButton' data-index='" + btn + "'>Download.</button></div>";
            $(".photoContainer").append(childElement);
            /*Adding download links to an array.*/
            downloadLinks.push(photo.links.download);
            buttonIndex.push(btn)
            btn++;

        });


    } else {
        /*Looping the array and appending the search results.*/
        finalData.map((photo) => {
            var childElement = "<div class='child'><img src=" + photo.urls.regular + " data-aos='zoom-in'><button  data-aos='zoom-in' type='button' class='btn btn-success' id='downloadButton' data-index='" + btn + "'>Download.</button></div>";
            $(".photoContainer").append(childElement);
            /*Adding download links to an array.*/
            downloadLinks.push(photo.links.download);
            buttonIndex.push(btn)
            btn++;

        });

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
        isSearched = true;
        let response = fetch("https://api.unsplash.com/search/photos/?client_id=lz0WtbT_YAZdZKUvfjBLkO9Fifnhw6y9S4kYJx7cj0A&query=" + query);
        let imageData = await response;
        let json = imageData.json();
        var finalData = await json;
        /*Assigning the results array to a variable.*/
        var searchedImage = finalData.results;
        $(".photoContainer").empty();
        /*If screen width is > 1028 append small 4tos , else fetch regular 4tos.*/
        if (window.innerWidth < 800) {
            /*Looping the array and appending the search results.*/
            var index = 0;
            searchedImage.map((image) => {
                $(".photoContainer").append("<div class='child'><img   src=" + image.urls.small_s3 + " data-aos = zoom-in" + ">" + "<button data-aos='zoom-in' type='button' class='btn btn-success' id='downloadButton' data-link='" + index + "'>Download." + "</button>" + "</div>");
                /*Getting the relevant download link by getting the button index and matching it to the
        * downloadLinks array.*/
                searchedImagesLinks.push(image.links.download);
                searchedImagesButtons.push(index);
                index++;
            });


            /*Adding 1000px to the current scroll position.*/
            $(window).scrollTop($(window).scrollTop() + 1000);
            $("#searchBar").val("");

        } else {
            /*If screen width is > 1028 append small 4tos , else fetch regular 4tos.*/
            /*Looping the array and appending the search results.*/
            var index = 0;
            searchedImage.map((image) => {
                $(".photoContainer").append("<div class='child'><img   src=" + image.urls.regular + " data-aos = zoom-in" + ">" + "<button data-aos='zoom-in' type='button' class='btn btn-success' id='downloadButton' data-link='" + index + "'>Download." + "</button>" + "</div>");
                /*Getting the relevant download link by getting the button index and matching it to the
        * downloadLinks array.*/
                searchedImagesLinks.push(image.links.download);
                searchedImagesButtons.push(index);
                index++;
            });


            /*Adding 1000px to the current scroll position.*/
            $(window).scrollTop($(window).scrollTop() + 1000);
            $("#searchBar").val("");
        }

    } catch (e) {
        swal("", "Something happened!" + e, "error")
    }

}

$(".photoContainer").on("click", "#downloadButton", function () {
    /*Getting the relevant download link by getting the button index and matching it to the
    * downloadLinks array.Both indexes are same coz , both added at the same time.*/
    /*isSearched doesn't need to make false coz,it will be false when going back to the home page.(When refreshing the page.)*/
    if (isSearched) {
        let urlIndex = $(this).attr("data-link");/*When searching , the button attribute is set to data-link*/
        window.open(searchedImagesLinks[urlIndex], "_blank")

    } else {
        let urlIndex = $(this).attr("data-index");/*If its a normal download , the button attribute is set to data-index.*/
        window.open(downloadLinks[urlIndex], "_blank")
    }


});





