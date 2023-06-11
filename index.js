$(document).ready(() => {
    loadMainImage();

});

async function loadMainImage() {


    try {
        let response = fetch("https://api.unsplash.com/photos/?client_id=lz0WtbT_YAZdZKUvfjBLkO9Fifnhw6y9S4kYJx7cj0A&per_page=10&order_by=latest&w=100vw&height=70vh");
        let imageData = await response;
        let jsonData = imageData.json();
        let finalData = await jsonData;
        let element = Math.floor(Math.random() * (finalData.length - 0) + 0)
        $(".searchContainer").css("background-image", "url(" + finalData[element].urls.full + ")")
        setTimeout(() => {
            $("#searchBar").addClass("animate__animated animate__rubberBand");
        }, 1000)


    } catch (e) {
        swal("", "Something happened!" + e, "error")
    }
}

if (window.innerWidth < 800) {
    $("#searchBar").attr("placeholder", " 🔍 Search for images!");

}