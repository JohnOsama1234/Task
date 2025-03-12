// Image array containing the paths of slideshow images inside "images" folder
const images = [
    "images/thumb1.jpg",
    "images/thumb2.jpg",
    "images/thumb3.jpg",
    "images/thumb2.jpg",
];

let currentIndex = 0;

// Select main image and thumbnail elements
const mainImg = document.getElementById("main-img");
const thumbnails = document.querySelectorAll(".thumb");

// Preload images to prevent flickering issues
const preloadedImages = images.map(src => {
    const img = new Image();
    img.src = src;
    return img;
});

// Function to change image when clicking on a thumbnail
function changeImage(index) {
    currentIndex = index;
    updateImage();
    resetAutoSlide();
}

// Function to show the next image in the slideshow
function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
}

// Function to show the previous image in the slideshow
function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
}

// Function to update the image with animation
function updateImage() {
    console.log("Switching to:", images[currentIndex]); // Debugging

    // Hide image before changing
    mainImg.style.opacity = 0;

    // Change image source & ensure it's loaded before fading in
    mainImg.onload = () => {
        console.log("Loaded:", mainImg.src); // Debugging
        mainImg.style.opacity = 1;
    };

    mainImg.src = images[currentIndex];

    // Update active thumbnail
    updateActiveThumbnail();
}

// Function to highlight the active thumbnail
function updateActiveThumbnail() {
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle("active", index === currentIndex);
    });
}

// Automatically switch images every 3 seconds
let autoSlide = setInterval(nextImage, 3000);

// Function to reset auto-slide when user interacts with buttons
function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextImage, 3000);
}

// Event listeners for navigation buttons
document.getElementById("nextBtn").addEventListener("click", () => {
    nextImage();
    resetAutoSlide();
});

document.getElementById("prevBtn").addEventListener("click", () => {
    prevImage();
    resetAutoSlide();
});

// Event listeners for thumbnail clicks
thumbnails.forEach((thumb, index) => {
    thumb.addEventListener("click", () => changeImage(index));
});
