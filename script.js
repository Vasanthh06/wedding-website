// Countdown Timer
function updateCountdown() {
  const countdownDate = new Date("April 27, 2026 15:00:00").getTime();
  const now = new Date().getTime();
  const distance = countdownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;
}

// Start countdown
setInterval(updateCountdown, 1000);
updateCountdown();

// GALLERY FILTER - SIMPLE AND WORKING
document.addEventListener("DOMContentLoaded", function () {
  // Filter buttons functionality
  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active from all
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active to clicked
      this.classList.add("active");

      // Get filter
      const filter = this.getAttribute("data-filter");

      // Show/hide items
      galleryItems.forEach((item) => {
        const category = item.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  console.log("Gallery ready! Items:", galleryItems.length);
});

// SHOW IMAGE IN MODAL
function showImage(src) {
  document.getElementById("modalImage").src = src;
  document.getElementById("imageModal").style.display = "flex";
}

// CLOSE IMAGE MODAL
function closeImage() {
  document.getElementById("imageModal").style.display = "none";
}

// Close modal with ESC key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeImage();
  }
});
// Floating Images with Hearts
function initFloatingImages() {
  // Initialize all floating images
  const images = [
    { container: ".couple-image-container", heartCount: 8 },
    { container: ".bride-image-container", heartCount: 6 },
    { container: ".groom-image-container", heartCount: 6 },
  ];

  images.forEach((config) => {
    const container = document.querySelector(config.container);
    if (!container) return;

    const heartsContainer = container.querySelector(".hearts-container");

    // Create hearts on hover
    container.addEventListener("mouseenter", function () {
      createHearts(this, config.heartCount);
    });

    // Optional: Create hearts periodically
    setInterval(() => {
      if (Math.random() > 0.7) {
        createHearts(container, Math.floor(config.heartCount / 2));
      }
    }, 6000);
  });

  function createHearts(container, count) {
    const heartsContainer = container.querySelector(".hearts-container");
    if (!heartsContainer) return;

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.innerHTML = "❤️";

        // Starting position around the image (center is 80px for 160px container)
        const startX = 80 + (Math.random() * 60 - 30);
        const startY = 80 + (Math.random() * 60 - 30);

        // Random movement direction
        const tx = container.classList.contains("bride-image-container")
          ? Math.random() * 80 + 20 // Right for bride
          : -(Math.random() * 80 + 20); // Left for groom/couple
        const ty = -(Math.random() * 80 + 50);

        heart.style.left = startX + "px";
        heart.style.top = startY + "px";
        heart.style.setProperty("--tx", tx + "px");
        heart.style.setProperty("--ty", ty + "px");

        heartsContainer.appendChild(heart);

        // Remove heart after animation
        setTimeout(() => {
          if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
          }
        }, 3000);
      }, i * 100);
    }
  }

  // Click to enlarge image
  document
    .querySelectorAll(
      ".couple-image-container, .bride-image-container, .groom-image-container"
    )
    .forEach((container) => {
      container.addEventListener("click", function () {
        const imgSrc = this.querySelector("img").src;
        const imgAlt = this.querySelector("img").alt;

        const modal = document.createElement("div");
        modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.95);
                z-index: 10000;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
            `;

        const img = document.createElement("img");
        img.src = imgSrc;
        img.alt = imgAlt;
        img.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                border-radius: 10px;
                box-shadow: 0 0 30px rgba(255,255,255,0.1);
            `;

        modal.appendChild(img);
        document.body.appendChild(modal);

        // Close on click
        modal.addEventListener("click", function () {
          document.body.removeChild(modal);
        });

        // Close with ESC key
        const closeModal = function (e) {
          if (e.key === "Escape") {
            document.body.removeChild(modal);
            document.removeEventListener("keydown", closeModal);
          }
        };
        document.addEventListener("keydown", closeModal);
      });
    });
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", function () {
  initFloatingImages();
});

// Click to enlarge image
coupleContainer.addEventListener("click", function () {
  const modal = document.createElement("div");
  modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            z-index: 10000;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        `;

  const img = document.createElement("img");
  img.src = coupleContainer.querySelector("img").src;
  img.alt = "Amar & Lakshmi";
  img.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 10px;
            box-shadow: 0 0 30px rgba(255,255,255,0.1);
        `;

  modal.appendChild(img);
  document.body.appendChild(modal);

  // Close on click
  modal.addEventListener("click", function () {
    document.body.removeChild(modal);
  });

  // Close with ESC key
  const closeModal = function (e) {
    if (e.key === "Escape") {
      document.body.removeChild(modal);
      document.removeEventListener("keydown", closeModal);
    }
  };
  document.addEventListener("keydown", closeModal);
});

// Initialize when page loads
document.addEventListener("DOMContentLoaded", function () {
  initFloatingCouple();
});
// Floating Images Functions
function initFloatingImages() {
  const imageContainers = document.querySelectorAll(".image-container");

  imageContainers.forEach((container) => {
    // Hover: Create hearts
    container.addEventListener("mouseenter", function () {
      createHearts(this);
    });
  });

  // Create floating hearts
  function createHearts(container) {
    const heartsContainer = container.querySelector(".hearts-container");
    if (!heartsContainer) return;

    // Clear existing hearts
    heartsContainer.innerHTML = "";

    // Create 3-5 hearts
    const heartCount = Math.floor(Math.random() * 3) + 3;

    for (let i = 0; i < heartCount; i++) {
      setTimeout(() => {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.innerHTML = "❤️";
        heart.style.color = container.classList.contains("bride")
          ? "#ffb6c1"
          : "#ff6b8b";

        // Random starting position
        const startX = 50 + (Math.random() * 30 - 15);
        const startY = 50 + (Math.random() * 30 - 15);

        // Random movement
        const tx = Math.random() * 40 - 20;
        const ty = -(Math.random() * 30 + 20);

        heart.style.left = startX + "px";
        heart.style.top = startY + "px";
        heart.style.setProperty("--tx", tx + "px");
        heart.style.setProperty("--ty", ty + "px");

        heartsContainer.appendChild(heart);

        // Remove after animation
        setTimeout(() => {
          if (heart.parentNode === heartsContainer) {
            heartsContainer.removeChild(heart);
          }
        }, 2000);
      }, i * 150);
    }
  }
}

// Open Fullscreen Image
function openFullscreenImage(src, alt) {
  console.log("Opening image:", src); // Debug log

  const modal = document.getElementById("fullscreenModal");
  const modalImage = document.getElementById("modalImage");

  if (!modal || !modalImage) {
    console.error("Modal elements not found!");
    return;
  }

  // Set image source and alt
  modalImage.src = src;
  modalImage.alt = alt || "Wedding Photo";

  // Show modal
  modal.style.display = "flex";
  document.body.style.overflow = "hidden"; // Prevent scrolling

  console.log("Modal should be visible now");
}

// Close Fullscreen Image
function closeFullscreenImage() {
  const modal = document.getElementById("fullscreenModal");
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Restore scrolling
  }
}

// Close modal with ESC key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeFullscreenImage();
  }
});

// Close modal when clicking outside image
document.addEventListener("click", function (e) {
  const modal = document.getElementById("fullscreenModal");
  if (modal && modal.style.display === "flex") {
    if (e.target === modal || e.target.classList.contains("fullscreen-modal")) {
      closeFullscreenImage();
    }
  }
});

// Initialize when page loads
document.addEventListener("DOMContentLoaded", function () {
  console.log("Initializing floating images...");
  initFloatingImages();
});
// Hide floating images on Our Story page
function hideFloatingImagesOnOurStory() {
  const floatingImages = document.querySelectorAll(".floating-image");
  const aboutPage = document.getElementById("about");

  if (aboutPage && aboutPage.classList.contains("active")) {
    // Hide floating images when on Our Story page
    floatingImages.forEach((img) => {
      img.style.opacity = "0";
      img.style.pointerEvents = "none";
      img.style.transition = "opacity 0.3s ease";
    });
  } else {
    // Show floating images on other pages
    floatingImages.forEach((img) => {
      img.style.opacity = "1";
      img.style.pointerEvents = "auto";
    });
  }
}
// Mobile menu toggle
function initMobileMenu() {
  const mobileMenuBtn = document.createElement("button");
  mobileMenuBtn.className = "mobile-menu-btn";
  mobileMenuBtn.innerHTML = "☰";

  const nav = document.querySelector("nav");
  const navLinks = document.querySelector(".nav-links");

  if (nav && navLinks) {
    nav.appendChild(mobileMenuBtn);

    mobileMenuBtn.addEventListener("click", function () {
      navLinks.classList.toggle("active");
      this.innerHTML = navLinks.classList.contains("active") ? "✕" : "☰";
    });

    // Close menu when clicking a link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", function () {
        navLinks.classList.remove("active");
        mobileMenuBtn.innerHTML = "☰";
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
      if (
        !nav.contains(event.target) &&
        navLinks.classList.contains("active")
      ) {
        navLinks.classList.remove("active");
        mobileMenuBtn.innerHTML = "☰";
      }
    });
  }
}

// Call this in your DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  initMobileMenu();
});
