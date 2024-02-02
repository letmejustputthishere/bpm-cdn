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

function prefetchImages(imageUrls) {
    $.each(imageUrls, function (index, url) {
        $("<img>")
            .attr("src", url)
            .on("load", function () {
                console.log(`Image ${url} loaded successfully`);
            });
    });
}

function setBackground(url) {
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

function setProjectDetails(forMobile) {
    $(
        forMobile
            ? "#footer-project-description"
            : "#nav-bar-project-description"
    ).text(projects[currentIndex].description);
}

let currentIndex = Math.floor(Math.random() * projects.length);

let landscape = isLandscape();

// set initial background image according to the device width
// and touch capabilities
// prefetch other background images so they are read from cache
function setPage() {
    if ($("body").width() > 497) {
        if (isTouchDevice()) {
            // landscape iphones or ipads

            // make body scrollable
            makeBodyScrollable();
            // set background on background-wrap class instead of body
            setBackground(
                landscape
                    ? projects[currentIndex].desktop
                    : projects[currentIndex].mobile
            );
            setProjectDetails(true);
            // Determine which set of images to prefetch based on 'landscape' flag
            prefetchImages(
                projects.map((item) => (landscape ? item.desktop : item.mobile))
            );
        } else {
            // normal desktop

            // set background
            setBackground(projects[currentIndex].desktop);
            setProjectDetails(false);
            // prefetch
            prefetchImages(projects.map((item) => item.desktop));
        }
    } else {
        // mobile
        makeBodyScrollable();
        // set background on background-wrap class instead of body
        setBackground(projects[currentIndex].mobile);
        // set description
        setProjectDetails(true);
        // prefetch
        prefetchImages(projects.map((item) => item.mobile));
    }

    // when image is clicked user is directed to the corresponding project page
    setClickEvent(projects[currentIndex].url);
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
                if (landscape) {
                    if (currentIndex >= 0) {
                        setBackground(projects[currentIndex].desktop);
                    }
                } else {
                    if (currentIndex >= 0) {
                        setBackground(projects[currentIndex].mobile);
                    }
                }
                setProjectDetails(true);
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
                setBackground(projects[currentIndex].desktop);
                setProjectDetails(false);
                // when image is clicked user is directed to the corresponding project page
                setClickEvent();
            }
        });
    }
});

// register event handler
$(window).on("orientationchange", () => {
    landscape = !landscape;
    setPage();
});

setPage();
