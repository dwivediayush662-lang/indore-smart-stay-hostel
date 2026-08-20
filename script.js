```javascript id="8b2z4p"
/* =====================================================
   INDORE SMART STAY HOSTEL
   COMPLETE JAVASCRIPT
   ===================================================== */

console.log("Welcome to Indore Smart Stay Hostel");


/* =====================================================
   GALLERY
   ===================================================== */

const galleryImages =
    document.querySelectorAll("#gallery img");

let currentImageIndex = 0;


/* =====================================================
   HORIZONTAL GALLERY SCROLL
   ===================================================== */

function scrollGallery(direction) {

    const slider =
        document.getElementById("gallerySlider");

    if (!slider) {
        return;
    }

    const slide =
        slider.querySelector(".gallery-slide");

    if (!slide) {
        return;
    }

    const slideWidth =
        slide.offsetWidth + 20;

    slider.scrollBy({

        left: direction * slideWidth,

        behavior: "smooth"

    });

}


/* =====================================================
   OPEN FULL-SCREEN IMAGE
   ===================================================== */

function openImage(src, title) {

    const images =
        document.querySelectorAll("#gallery img");

    currentImageIndex =
        Array.from(images).findIndex(
            image => image.src === src
        );

    if (currentImageIndex < 0) {
        currentImageIndex = 0;
    }

    showImage(currentImageIndex);

    const viewer =
        document.getElementById("imageViewer");

    if (viewer) {

        viewer.classList.add("active");

        document.body.style.overflow = "hidden";

    }

}


/* =====================================================
   SHOW IMAGE
   ===================================================== */

function showImage(index) {

    const images =
        document.querySelectorAll("#gallery img");

    if (images.length === 0) {
        return;
    }


    if (index < 0) {

        index = images.length - 1;

    }


    if (index >= images.length) {

        index = 0;

    }


    currentImageIndex = index;


    const image =
        images[currentImageIndex];


    const viewerImage =
        document.getElementById("viewerImage");


    const viewerTitle =
        document.getElementById("viewerTitle");


    const downloadImage =
        document.getElementById("downloadImage");


    if (viewerImage) {

        viewerImage.src = image.src;

        viewerImage.alt = image.alt;

    }


    if (viewerTitle) {

        viewerTitle.textContent =
            image.alt || "Hostel Image";

    }


    if (downloadImage) {

        downloadImage.href = image.src;

        downloadImage.download =
            image.src.split("/").pop();

    }

}


/* =====================================================
   NEXT IMAGE
   ===================================================== */

function nextImage() {

    showImage(currentImageIndex + 1);

}


/* =====================================================
   PREVIOUS IMAGE
   ===================================================== */

function previousImage() {

    showImage(currentImageIndex - 1);

}


/* =====================================================
   CLOSE IMAGE VIEWER
   ===================================================== */

function closeImage() {

    const viewer =
        document.getElementById("imageViewer");

    if (viewer) {

        viewer.classList.remove("active");

    }

    document.body.style.overflow = "";

}


/* =====================================================
   KEYBOARD CONTROLS
   ===================================================== */

document.addEventListener("keydown", function(event) {

    const viewer =
        document.getElementById("imageViewer");

    if (!viewer ||
        !viewer.classList.contains("active")) {

        return;

    }


    /* ESC */

    if (event.key === "Escape") {

        closeImage();

    }


    /* RIGHT ARROW */

    if (event.key === "ArrowRight") {

        nextImage();

    }


    /* LEFT ARROW */

    if (event.key === "ArrowLeft") {

        previousImage();

    }

});


/* =====================================================
   MOUSE WHEEL HORIZONTAL SCROLL
   ===================================================== */

const gallerySlider =
    document.getElementById("gallerySlider");


if (gallerySlider) {

    gallerySlider.addEventListener(
        "wheel",
        function(event) {

            if (event.deltaY !== 0) {

                event.preventDefault();

                gallerySlider.scrollLeft +=
                    event.deltaY;

            }

        },
        {
            passive: false
        }
    );

}


/* =====================================================
   MOUSE DRAG / SWIPE
   ===================================================== */

if (gallerySlider) {

    let isDragging = false;

    let startX = 0;

    let scrollStart = 0;


    /* Mouse Down */

    gallerySlider.addEventListener(
        "mousedown",
        function(event) {

            isDragging = true;

            gallerySlider.style.cursor =
                "grabbing";

            startX =
                event.pageX -
                gallerySlider.offsetLeft;

            scrollStart =
                gallerySlider.scrollLeft;

        }
    );


    /* Mouse Up */

    gallerySlider.addEventListener(
        "mouseup",
        function() {

            isDragging = false;

            gallerySlider.style.cursor =
                "grab";

        }
    );


    /* Mouse Leave */

    gallerySlider.addEventListener(
        "mouseleave",
        function() {

            isDragging = false;

            gallerySlider.style.cursor =
                "grab";

        }
    );


    /* Mouse Move */

    gallerySlider.addEventListener(
        "mousemove",
        function(event) {

            if (!isDragging) {
                return;
            }

            event.preventDefault();


            const x =
                event.pageX -
                gallerySlider.offsetLeft;


            const distance =
                (x - startX) * 1.5;


            gallerySlider.scrollLeft =
                scrollStart - distance;

        }
    );

}


/* =====================================================
   MOBILE TOUCH SWIPE
   ===================================================== */

if (gallerySlider) {

    let touchStartX = 0;

    let touchEndX = 0;


    gallerySlider.addEventListener(
        "touchstart",
        function(event) {

            touchStartX =
                event.touches[0].clientX;

        },
        {
            passive: true
        }
    );


    gallerySlider.addEventListener(
        "touchend",
        function(event) {

            touchEndX =
                event.changedTouches[0].clientX;


            const difference =
                touchStartX - touchEndX;


            /* Swipe Left */

            if (difference > 50) {

                scrollGallery(1);

            }


            /* Swipe Right */

            if (difference < -50) {

                scrollGallery(-1);

            }

        },
        {
            passive: true
        }
    );

}


/* =====================================================
   CLOSE VIEWER WHEN CLICKING BACKGROUND
   ===================================================== */

const imageViewer =
    document.getElementById("imageViewer");


if (imageViewer) {

    imageViewer.addEventListener(
        "click",
        function(event) {

            if (event.target === imageViewer) {

                closeImage();

            }

        }
    );

}


console.log(
    "Indore Smart Stay Gallery Loaded Successfully!"
);
```
