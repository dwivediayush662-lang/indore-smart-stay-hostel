```javascript
/* =====================================================
   INDORE SMART STAY HOSTEL
   COMPLETE GALLERY JAVASCRIPT
   ===================================================== */

"use strict";

console.log("Welcome to Indore Smart Stay Hostel");


/* =====================================================
   GLOBAL VARIABLES
   ===================================================== */

let currentImageIndex = 0;

let gallerySlider = null;

let galleryImages = [];


/* =====================================================
   INITIALIZE GALLERY
   ===================================================== */

function initializeGallery() {

    gallerySlider =
        document.getElementById("gallerySlider");

    galleryImages =
        Array.from(
            document.querySelectorAll("#gallery img")
        );


    if (!gallerySlider) {

        console.warn(
            "Gallery slider not found."
        );

        return;

    }


    if (galleryImages.length === 0) {

        console.warn(
            "No gallery images found."
        );

        return;

    }


    /* =================================================
       MOUSE WHEEL
       ================================================= */

    gallerySlider.addEventListener(
        "wheel",
        function(event) {

            /*
             * Convert vertical mouse wheel
             * into horizontal scrolling.
             */

            if (Math.abs(event.deltaY) >
                Math.abs(event.deltaX)) {

                event.preventDefault();

                gallerySlider.scrollBy({

                    left: event.deltaY,

                    behavior: "smooth"

                });

            }

        },
        {
            passive: false
        }
    );


    /* =================================================
       MOUSE DRAG
       ================================================= */

    let isDragging = false;

    let startX = 0;

    let startScrollLeft = 0;


    gallerySlider.addEventListener(
        "mousedown",
        function(event) {

            isDragging = true;

            startX =
                event.pageX -
                gallerySlider.offsetLeft;

            startScrollLeft =
                gallerySlider.scrollLeft;

            gallerySlider.style.cursor =
                "grabbing";

            gallerySlider.style.userSelect =
                "none";

        }
    );


    gallerySlider.addEventListener(
        "mousemove",
        function(event) {

            if (!isDragging) {

                return;

            }

            event.preventDefault();


            const currentX =
                event.pageX -
                gallerySlider.offsetLeft;


            const distance =
                (currentX - startX) * 1.5;


            gallerySlider.scrollLeft =
                startScrollLeft - distance;

        }
    );


    function stopDragging() {

        isDragging = false;

        gallerySlider.style.cursor =
            "grab";

        gallerySlider.style.userSelect =
            "";

    }


    gallerySlider.addEventListener(
        "mouseup",
        stopDragging
    );


    gallerySlider.addEventListener(
        "mouseleave",
        stopDragging
    );


    /* =================================================
       MOBILE TOUCH SWIPE
       ================================================= */

    let touchStartX = 0;

    let touchStartScrollLeft = 0;


    gallerySlider.addEventListener(
        "touchstart",
        function(event) {

            if (!event.touches ||
                event.touches.length === 0) {

                return;

            }


            touchStartX =
                event.touches[0].clientX;


            touchStartScrollLeft =
                gallerySlider.scrollLeft;

        },
        {
            passive: true
        }
    );


    gallerySlider.addEventListener(
        "touchmove",
        function(event) {

            if (!event.touches ||
                event.touches.length === 0) {

                return;

            }


            const currentX =
                event.touches[0].clientX;


            const distance =
                touchStartX - currentX;


            /*
             * Move the gallery while
             * finger is dragging.
             */

            gallerySlider.scrollLeft =
                touchStartScrollLeft +
                distance;

        },
        {
            passive: true
        }
    );


    console.log(
        "Gallery initialized successfully."
    );

}


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
        slider.querySelector(
            ".gallery-slide"
        );


    if (!slide) {

        return;

    }


    const gap = 20;


    const slideWidth =
        slide.offsetWidth + gap;


    slider.scrollBy({

        left:
            direction * slideWidth,

        behavior:
            "smooth"

    });

}


/* =====================================================
   OPEN IMAGE VIEWER
   ===================================================== */

function openImage(src, title) {

    const images =
        Array.from(
            document.querySelectorAll(
                "#gallery img"
            )
        );


    if (images.length === 0) {

        return;

    }


    /*
     * Find clicked image.
     */

    currentImageIndex =
        images.findIndex(
            function(image) {

                return image.src === src;

            }
        );


    /*
     * If image wasn't found,
     * start from first image.
     */

    if (currentImageIndex < 0) {

        currentImageIndex = 0;

    }


    showImage(
        currentImageIndex
    );


    const viewer =
        document.getElementById(
            "imageViewer"
        );


    if (!viewer) {

        console.warn(
            "Image viewer not found."
        );

        return;

    }


    viewer.classList.add("active");


    document.body.style.overflow =
        "hidden";

}


/* =====================================================
   SHOW IMAGE
   ===================================================== */

function showImage(index) {

    const images =
        Array.from(
            document.querySelectorAll(
                "#gallery img"
            )
        );


    if (images.length === 0) {

        return;

    }


    /*
     * Loop to last image.
     */

    if (index < 0) {

        index =
            images.length - 1;

    }


    /*
     * Loop to first image.
     */

    if (index >= images.length) {

        index = 0;

    }


    currentImageIndex =
        index;


    const image =
        images[currentImageIndex];


    const viewerImage =
        document.getElementById(
            "viewerImage"
        );


    const viewerTitle =
        document.getElementById(
            "viewerTitle"
        );


    const downloadImage =
        document.getElementById(
            "downloadImage"
        );


    /* =================================================
       SET VIEWER IMAGE
       ================================================= */

    if (viewerImage) {

        viewerImage.src =
            image.src;

        viewerImage.alt =
            image.alt ||
            "Hostel Image";

    }


    /* =================================================
       SET IMAGE TITLE
       ================================================= */

    if (viewerTitle) {

        viewerTitle.textContent =
            image.alt ||
            "Hostel Image";

    }


    /* =================================================
       SET DOWNLOAD LINK
       ================================================= */

    if (downloadImage) {

        downloadImage.href =
            image.src;


        /*
         * Extract filename.
         */

        const imageURL =
            image.src.split("/");


        const fileName =
            imageURL[
                imageURL.length - 1
            ] || "hostel-image.jpg";


        downloadImage.download =
            fileName;

    }

}


/* =====================================================
   NEXT IMAGE
   ===================================================== */

function nextImage() {

    showImage(
        currentImageIndex + 1
    );

}


/* =====================================================
   PREVIOUS IMAGE
   ===================================================== */

function previousImage() {

    showImage(
        currentImageIndex - 1
    );

}


/* =====================================================
   CLOSE IMAGE VIEWER
   ===================================================== */

function closeImage() {

    const viewer =
        document.getElementById(
            "imageViewer"
        );


    if (viewer) {

        viewer.classList.remove(
            "active"
        );

    }


    document.body.style.overflow =
        "";

}


/* =====================================================
   KEYBOARD CONTROLS
   ===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        const viewer =
            document.getElementById(
                "imageViewer"
            );


        /*
         * Don't do anything if
         * viewer is not open.
         */

        if (!viewer ||
            !viewer.classList.contains(
                "active"
            )) {

            return;

        }


        /* ESC */

        if (event.key === "Escape") {

            closeImage();

            return;

        }


        /* RIGHT ARROW */

        if (event.key === "ArrowRight") {

            nextImage();

            return;

        }


        /* LEFT ARROW */

        if (event.key === "ArrowLeft") {

            previousImage();

            return;

        }

    }
);


/* =====================================================
   CLOSE VIEWER BY BACKGROUND CLICK
   ===================================================== */

function initializeViewer() {

    const imageViewer =
        document.getElementById(
            "imageViewer"
        );


    if (!imageViewer) {

        return;

    }


    imageViewer.addEventListener(
        "click",
        function(event) {

            /*
             * Close only when the dark
             * background itself is clicked.
             */

            if (
                event.target ===
                imageViewer
            ) {

                closeImage();

            }

        }
    );

}


/* =====================================================
   PREVENT IMAGE DRAGGING
   ===================================================== */

function preventImageDragging() {

    const images =
        document.querySelectorAll(
            "#gallery img"
        );


    images.forEach(
        function(image) {

            image.addEventListener(
                "dragstart",
                function(event) {

                    event.preventDefault();

                }
            );

        }
    );

}


/* =====================================================
   INITIALIZE EVERYTHING
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        initializeGallery();

        initializeViewer();

        preventImageDragging();


        console.log(
            "Indore Smart Stay Gallery Loaded Successfully!"
        );

    }
);
```
