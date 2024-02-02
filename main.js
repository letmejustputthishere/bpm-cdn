let projects = [
    {
        url: "projects#sechs-monate-amerika",
        mobile: "https://uploads-ssl.webflow.com/65bcc9611f29c99b6ba68602/65bcc9611f29c99b6ba687c6_archive_image_101.jpg",
        desktop:
            "https://uploads-ssl.webflow.com/65bcc9611f29c99b6ba68602/65bcc9611f29c99b6ba687c6_archive_image_101.jpg",
        description: "Sechs Monate Amerika",
    },
    {
        url: "projects#am-abgrund-der-bilder",
        mobile: "https://uploads-ssl.webflow.com/65bcc9611f29c99b6ba68602/65bcc9611f29c99b6ba687c5_archive_image_103.jpg",
        desktop:
            "https://uploads-ssl.webflow.com/65bcc9611f29c99b6ba68602/65bcc9611f29c99b6ba687c5_archive_image_103.jpg",
        description: "Am Abgrund der Bilder",
    },
    {
        url: "projects#kunstsaele",
        mobile: "https://uploads-ssl.webflow.com/65bcc9611f29c99b6ba68602/65bcc9611f29c99b6ba687c4_archive_image_104.jpg",
        desktop:
            "https://uploads-ssl.webflow.com/65bcc9611f29c99b6ba68602/65bcc9611f29c99b6ba687c4_archive_image_104.jpg",
        description: "Kunstsaele",
    },
];

function isTouchDevice() {
    return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
    );
}

function isLandscape() {
    return window.innerWidth > window.innerHeight;
}

function prefetchImages() {
    let imageUrls = landscape
        ? projects.map((item) => item.desktop)
        : projects.map((item) => item.mobile);
    $.each(imageUrls, function (index, url) {
        $("<img>")
            .attr("src", url)
            .on("load", function () {
                console.log(`Image ${url} loaded successfully`);
            });
    });
}

function setBackground() {
    const url = landscape
        ? projects[currentIndex].desktop
        : projects[currentIndex].mobile;
    $(".background-wrap").css("background-image", `url(${url})`);
}

function makeBodyScrollable() {
    $("body").css({
        height: "500vh",
        backgroundImage: "none",
        backgrundColor: "white",
    });
}

function setClickEvent() {
    $(".background-wrap").click(function (event) {
        window.location = projects[currentIndex].url;
    });
}

function setProjectDetails() {
    $("#footer-project-description").text(projects[currentIndex].description);
    $("#nav-bar-project-description")
        .text(projects[currentIndex].description)
        .attr("href", projects[currentIndex].url);
}

let currentIndex = Math.floor(Math.random() * projects.length);

let landscape = isLandscape();

// set initial background image according to the device width
// and touch capabilities
// prefetch other background images so they are read from cache
function setPage() {
    landscape = isLandscape();

    if (isTouchDevice()) {
        makeBodyScrollable();
    }

    setBackground();
    setProjectDetails();
    prefetchImages();
    setClickEvent();
}

// add event listener
$(document).ready(function () {
    if (isTouchDevice()) {
        // mobile
        $(window).scroll(function (event) {
            let bodyHeight = $("body").height() - $(window).height();
            let scrolledY = $(window).scrollTop();
            let sectionSize = Math.floor(bodyHeight / (projects.length - 1));
            let newIndex = Math.floor(scrolledY / sectionSize);

            if (newIndex !== currentIndex) {
                currentIndex = newIndex;
                if (currentIndex >= 0) {
                    setBackground();
                }
                setProjectDetails();
                // when image is clicked user is directed to the corresponding project page
                setClickEvent();
            }
        });
    } else {
        // desktop
        $("body").mousemove(function (event) {
            let bodyWidth = $("body").width();
            let pageX = event.pageX;
            let sectionSize = bodyWidth / projects.length;
            let newIndex = Math.floor(pageX / sectionSize);
            if (newIndex !== currentIndex) {
                currentIndex = newIndex;
                setBackground();
                setProjectDetails();
                // when image is clicked user is directed to the corresponding project page
                setClickEvent();
            }
        });
    }
});

function debounce(func, wait) {
    let timeout;
    return function () {
        const context = this,
            args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Debounced resize event handler
const handleResize = debounce(function () {
    console.log("Window resized!");
    // Your resize logic here
    setPage();
}, 100); // Wait for 250ms of no resize event activity before firing

window.addEventListener("resize", handleResize);

setPage();
