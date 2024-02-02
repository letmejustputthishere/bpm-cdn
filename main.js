let projects = [
    {
        url: "projects#item-magazin-4",
        mobile: "https://uploads-ssl.webflow.com/65bcc9611f29c99b6ba68602/65bcc9611f29c99b6ba687c6_archive_image_101.jpg",
        desktop:
            "https://uploads-ssl.webflow.com/65bcc9611f29c99b6ba68602/65bcc9611f29c99b6ba687c6_archive_image_101.jpg",
    },
    {
        url: "projects#michael-mueller-catalogue-raisonné",
        mobile: "https://uploads-ssl.webflow.com/65bcc9611f29c99b6ba68602/65bcc9611f29c99b6ba687c5_archive_image_103.jpg",
        desktop:
            "https://uploads-ssl.webflow.com/65bcc9611f29c99b6ba68602/65bcc9611f29c99b6ba687c5_archive_image_103.jpg",
    },
    {
        url: "projects#item-magazin-3",
        mobile: "https://uploads-ssl.webflow.com/65bcc9611f29c99b6ba68602/65bcc9611f29c99b6ba687c4_archive_image_104.jpg",
        desktop:
            "https://uploads-ssl.webflow.com/65bcc9611f29c99b6ba68602/65bcc9611f29c99b6ba687c4_archive_image_104.jpg",
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

let currentIndex = Math.floor(Math.random() * projects.length);

let landscape = isLandscape();

// set initial background image according to the device width
// and touch capabilities
// prefetch other background images so they are read from cache
function setPage() {
    if ($("body").width() > 497) {
        // landscape iphones or ipads
        if (isTouchDevice()) {
            // make body scrollable
            $("body").css({
                height: "500vh",
                backgroundImage: "none",
                backgrundColor: "black",
            });
            // set background on background-wrap class instead of body
            // this css does not exist for width > 497, thus we set it manually
            $(".background-wrap").css({
                "background-image": `url(${
                    landscape
                        ? projects[currentIndex].desktop
                        : projects[currentIndex].mobile
                })`,
                // position: "fixed",
                // left: "0%",
                // top: "0%",
                // right: "auto",
                // bottom: "auto",
                // zIndex: 0,
                // width: "100vw",
                // height: "100%",
                // paddingRight: "0px",
                // paddingBottom: "0px",
                // backgroundPosition: "center",
                // backgroundSize: "cover",
                // backgroundRepeat: "no-repeat",
                // backgroundAttachment: "fixed",
                // cursor: "pointer",
            });
            // prefetch
            // Determine which set of images to prefetch based on 'landscape' flag
            const imageUrls = projects.map((item) =>
                landscape ? item.desktop : item.mobile
            );

            // Prefetch each image
            $.each(imageUrls, function (index, url) {
                $("<img>")
                    .attr("src", url)
                    .on("load", function () {
                        console.log(`Image ${url} loaded successfully`);
                        // Optionally, perform actions after each image is successfully loaded
                    })
                    .appendTo("body")
                    .css("display", "none"); // Append to the body to ensure loading, but hide it
            });
        } else {
            // normal desktop
            $(".background-wrap").css({
                "background-image": `url(${projects[currentIndex].desktop})`,
                // position: "fixed",
                // left: "0%",
                // top: "0%",
                // right: "auto",
                // bottom: "auto",
                // zIndex: 0,
                // width: "100vw",
                // height: "100%",
                // paddingRight: "0px",
                // paddingBottom: "0px",
                // backgroundPosition: "center",
                // backgroundSize: "cover",
                // backgroundRepeat: "no-repeat",
                // backgroundAttachment: "fixed",
                // cursor: "pointer",
            });
            // $("body").css("background-image", "url(" + imageLinksDesktop[Math.floor(Math.random() * (imageLinksDesktop.length))] + ")");
            // prefetch
            $.each(
                projects.map((item) => item.desktop),
                function (index, url) {
                    $("<img>")
                        .attr("src", url)
                        .on("load", function () {
                            console.log(`Image ${url} loaded successfully`);
                            // Optionally, perform actions after each image is successfully loaded
                        })
                        .appendTo("body")
                        .css("display", "none"); // Append to the body to ensure loading, but hide it
                }
            );
        }
        // mobile
    } else {
        $("body").css({
            height: "500vh",
            backgroundImage: "none",
            backgrundColor: "black",
        });
        // set background on background-wrap class instead of body
        $(".background-wrap").css({
            "background-image": `url(${projects[currentIndex].mobile})`,
            // position: "fixed",
            // left: "0%",
            // top: "0%",
            // right: "auto",
            // bottom: "auto",
            // zIndex: 0,
            // width: "100vw",
            // height: "100%",
            // paddingRight: "0px",
            // paddingBottom: "0px",
            // backgroundPosition: "center",
            // backgroundSize: "cover",
            // backgroundRepeat: "no-repeat",
            // backgroundAttachment: "fixed",
            // cursor: "pointer",
        });
        // prefetch
        $.each(
            projects.map((item) => item.mobile),
            function (index, url) {
                $("<img>")
                    .attr("src", url)
                    .on("load", function () {
                        console.log(`Image ${url} loaded successfully`);
                        // Optionally, perform actions after each image is successfully loaded
                    })
                    .appendTo("body")
                    .css("display", "none"); // Append to the body to ensure loading, but hide it
            }
        );
    }

    // when image is clicked user is directed to the corresponding project page
    $(".background-wrap").click(function (event) {
        window.location = projects[currentIndex].url;
    });
}

// add event listener
$(document).ready(function () {
    // desktop
    if (!isTouchDevice()) {
        $("body").mousemove(function (event) {
            let bodyWidth = $("body").width();
            let pageX = event.pageX;
            let sectionSize = bodyWidth / projects.length;
            currentIndex = Math.floor(pageX / sectionSize);
            $(".background-wrap").css(
                "background-image",
                `url(${projects[currentIndex].desktop})`
            );
            // when image is clicked user is directed to the corresponding project page
            $(".background-wrap").click(function (event) {
                window.location = projects[currentIndex].url;
            });
        });
    } else {
        // touch devices
        $(window).scroll(function (event) {
            let bodyHeight = $("body").height() - $(window).height();
            let scrolledY = $(window).scrollTop();
            let sectionSize = Math.floor(bodyHeight / (projects.length - 1));
            currentIndex = Math.floor(scrolledY / sectionSize);

            if (landscape) {
                if (currentIndex >= 0) {
                    $(".background-wrap").css(
                        "background-image",
                        `url(${projects[currentIndex].desktop})`
                    );
                }
            } else {
                console.log(currentIndex);
                if (currentIndex >= 0) {
                    $(".background-wrap").css(
                        "background-image",
                        `url(${projects[currentIndex].mobile})`
                    );
                }
            }
            // when image is clicked user is directed to the corresponding project page
            $(".background-wrap").click(function (event) {
                window.location = projects[currentIndex].url;
            });
        });
    }
});

// register event handler
$(window).on("orientationchange", () => {
    landscape = !landscape;
    setPage();
});

setPage();
