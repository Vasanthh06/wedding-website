// ==================== MAIN INITIALIZATION ====================
document.addEventListener("DOMContentLoaded", function () {
  console.log("Website loaded successfully!");

  // Initialize all functions
  updateCountdown();
  initNavigation();
  initGalleryFilter();
  initMobileMenu();
  initRSVPForm();
  initCreatorModal();
  initImageClickHandlers();

  // Set interval for countdown
  setInterval(updateCountdown, 1000);
});

// ==================== COUNTDOWN TIMER ====================
function updateCountdown() {
  const countdownDate = new Date("April 29, 2026 10:00:00").getTime();
  const now = new Date().getTime();
  const distance = countdownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Update display with leading zeros
  document.getElementById("days").innerHTML = days.toString().padStart(2, "0");
  document.getElementById("hours").innerHTML = hours
    .toString()
    .padStart(2, "0");
  document.getElementById("minutes").innerHTML = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("seconds").innerHTML = seconds
    .toString()
    .padStart(2, "0");
}

// ==================== NAVIGATION SYSTEM ====================
function initNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");
  const heroButtons = document.querySelectorAll(".hero-btn");
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinksContainer = document.querySelector(".nav-links");

  // Handle navigation link clicks
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      navigateToSection(targetId);

      // Close mobile menu if open
      if (navLinksContainer.classList.contains("active")) {
        navLinksContainer.classList.remove("active");
        mobileMenuBtn.innerHTML = "☰";
      }
    });
  });

  // Handle hero button clicks
  heroButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const target = this.getAttribute("data-target").substring(1);
      navigateToSection(target);
    });
  });

  // Handle mobile menu toggle
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      navLinksContainer.classList.toggle("active");
      this.innerHTML = navLinksContainer.classList.contains("active")
        ? "✕"
        : "☰";
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (e) {
    if (
      !e.target.closest("nav") &&
      navLinksContainer.classList.contains("active")
    ) {
      navLinksContainer.classList.remove("active");
      mobileMenuBtn.innerHTML = "☰";
    }
  });
}

function navigateToSection(sectionId) {
  const targetSection = document.getElementById(sectionId);
  const navLinks = document.querySelectorAll(".nav-link");

  if (!targetSection) return;

  // Update active navigation link
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${sectionId}`) {
      link.classList.add("active");
    }
  });

  // Hide all sections
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });

  // Show target section
  targetSection.classList.add("active");

  // Smooth scroll to section
  window.scrollTo({
    top: targetSection.offsetTop - 80,
    behavior: "smooth",
  });
}

// ==================== GALLERY FILTER ====================
function initGalleryFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Get filter category
      const filter = this.getAttribute("data-filter");

      // Filter gallery items
      galleryItems.forEach((item) => {
        const category = item.getAttribute("data-category");

        if (filter === "all" || category === filter) {
          item.style.display = "block";
          item.style.opacity = "1";
        } else {
          item.style.display = "none";
          item.style.opacity = "0";
        }
      });

      console.log(`Showing ${filter} photos`);
    });
  });

  // Add click handlers for gallery images
  galleryItems.forEach((item) => {
    item.addEventListener("click", function () {
      const img = this.querySelector("img");
      const alt = img.getAttribute("alt") || "Wedding Photo";
      openFullscreenModal(img.src, alt);
    });
  });
}

// ==================== FULLSCREEN IMAGE MODAL ====================
function openFullscreenModal(imageSrc, caption = "") {
  const modal = document.getElementById("fullscreenModal");
  const modalImage = document.getElementById("fullscreenModalImage");
  const modalCaption = document.getElementById("modalCaption");

  if (!modal || !modalImage) return;

  modalImage.src = imageSrc;
  modalImage.alt = caption;
  modalCaption.textContent = caption;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeFullscreenModal() {
  const modal = document.getElementById("fullscreenModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

// Close modal with ESC key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeFullscreenModal();
    closeSisterModal();
    closeEventModal();
    closeCreatorModal();
  }
});

// ==================== SISTER MODAL ====================
function openSisterModal() {
  const modal = document.getElementById("sisterModal");
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeSisterModal() {
  const modal = document.getElementById("sisterModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

// ==================== EVENT MODAL ====================
function openEventModal(imageSrc, title, description) {
  const modal = document.getElementById("eventModal");
  const modalImage = document.getElementById("eventModalImage");
  const modalTitle = document.getElementById("eventModalTitle");
  const modalDescription = document.getElementById("eventModalDescription");

  if (modal && modalImage) {
    modalImage.src = imageSrc;
    modalImage.alt = title;

    if (modalTitle) modalTitle.textContent = title;
    if (modalDescription) modalDescription.textContent = description;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeEventModal() {
  const modal = document.getElementById("eventModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

// ==================== MOBILE MENU ====================
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (!mobileMenuBtn || !navLinks) return;

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
}

// ==================== RSVP FORM ====================
function initRSVPForm() {
  const rsvpForm = document.getElementById("wedding-rsvp-form");
  const submitBtn = document.getElementById("submit-rsvp");
  const backToFormBtn = document.getElementById("back-to-form");
  const rsvpConfirmation = document.getElementById("rsvp-confirmation");
  const rsvpFormContainer = document.querySelector(".rsvp-form");

  if (!rsvpForm || !submitBtn) return;

  // Update preview in real-time
  const updatePreview = () => {
    const name = document.getElementById("rsvp-name").value;
    const guests = document.getElementById("rsvp-guests").value;
    const attendance = document.querySelector(
      'input[name="attendance"]:checked',
    );
    const events = document.querySelectorAll('input[type="checkbox"]:checked');

    // Update preview elements if they exist
    const previewAttendance = document.querySelector(".preview-attendance");
    const previewEvents = document.querySelector(".preview-events");
    const previewGuests = document.querySelector(".preview-guests");

    if (previewAttendance) {
      if (attendance) {
        previewAttendance.textContent = attendance.value;
      } else {
        previewAttendance.textContent = "Not selected";
      }
    }

    if (previewEvents) {
      if (events.length > 0) {
        const eventNames = Array.from(events).map((cb) => {
          return cb.closest(".event-option").querySelector(".event-name")
            .textContent;
        });
        previewEvents.textContent = eventNames.join(", ");
      } else {
        previewEvents.textContent = "No events selected";
      }
    }

    if (previewGuests) {
      previewGuests.textContent = guests || "0";
    }
  };

  // Add event listeners for real-time updates
  document
    .getElementById("rsvp-name")
    ?.addEventListener("input", updatePreview);
  document
    .getElementById("rsvp-guests")
    ?.addEventListener("input", updatePreview);
  document.querySelectorAll('input[name="attendance"]').forEach((radio) => {
    radio.addEventListener("change", updatePreview);
  });
  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener("change", updatePreview);
  });

  // Initialize preview
  updatePreview();

  // Handle form submission
  submitBtn.addEventListener("click", function (e) {
    e.preventDefault();

    // Basic validation
    const name = document.getElementById("rsvp-name").value.trim();
    const email = document.getElementById("rsvp-email").value.trim();
    const phone = document.getElementById("rsvp-phone").value.trim();
    const attendance = document.querySelector(
      'input[name="attendance"]:checked',
    );

    if (!name || !email || !phone || !attendance) {
      alert("Please fill in all required fields.");
      return;
    }

    // Show celebration effect
    createCelebration();

    // Show confirmation
    if (rsvpFormContainer && rsvpConfirmation) {
      rsvpFormContainer.style.display = "none";
      rsvpConfirmation.style.display = "block";

      // Update confirmation message
      const message = document.getElementById("confirmation-message");
      if (message) {
        message.textContent = `Thank you, ${name}! We're excited to have you with us!`;
      }

      // Scroll to confirmation
      rsvpConfirmation.scrollIntoView({ behavior: "smooth" });
    }

    // Submit the form
    rsvpForm.submit();
  });

  // Handle back to form button
  if (backToFormBtn) {
    backToFormBtn.addEventListener("click", function () {
      if (rsvpFormContainer && rsvpConfirmation) {
        rsvpConfirmation.style.display = "none";
        rsvpFormContainer.style.display = "block";
        rsvpFormContainer.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
}

// ==================== CELEBRATION EFFECT ====================
function createCelebration() {
  const container = document.getElementById("celebration-container");
  if (!container) return;

  container.innerHTML = "";

  // Create hearts
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement("div");
    heart.innerHTML = "❤️";
    heart.style.position = "absolute";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "-20px";
    heart.style.fontSize = Math.random() * 20 + 20 + "px";
    heart.style.opacity = "0.8";
    heart.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
    container.appendChild(heart);

    // Remove after animation
    setTimeout(() => {
      heart.remove();
    }, 5000);
  }

  // Add CSS for falling animation
  if (!document.getElementById("celebration-styles")) {
    const style = document.createElement("style");
    style.id = "celebration-styles";
    style.textContent = `
            @keyframes fall {
                to {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
    document.head.appendChild(style);
  }
}

// ==================== CREATOR MODAL ====================
function initCreatorModal() {
  const creatorLink = document.getElementById("creatorLink");
  const creatorModal = document.getElementById("creatorModal");
  const closeModal = document.getElementById("closeModal");

  if (!creatorLink || !creatorModal) return;

  // Open creator modal
  creatorLink.addEventListener("click", function (e) {
    e.preventDefault();
    openCreatorModal();
  });

  // Close modal
  closeModal.addEventListener("click", closeCreatorModal);

  // Close on outside click
  creatorModal.addEventListener("click", function (e) {
    if (e.target === creatorModal) {
      closeCreatorModal();
    }
  });

  // Clickable image
  const clickableImage = document.getElementById("clickableImage");
  if (clickableImage) {
    clickableImage.addEventListener("click", function (e) {
      e.stopPropagation();
      openFullscreenModal("images/mevasanth.jpg", "Vasanthh - The Developer");
    });
  }
}

function openCreatorModal() {
  const modal = document.getElementById("creatorModal");
  const animatedName = document.getElementById("animatedName");
  const nameUnderline = document.getElementById("nameUnderline");

  if (!modal || !animatedName) return;

  // Show modal
  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  // Clear previous name
  animatedName.innerHTML = "";

  // Create name animation
  const name = "im_Vasanthh";
  const letters = name.split("");

  letters.forEach((letter, index) => {
    const span = document.createElement("span");
    span.className = "name-letter";
    span.textContent = letter === "_" ? " " : letter;
    span.style.opacity = "0";
    span.style.transform = "translateY(20px)";
    animatedName.appendChild(span);

    // Animate each letter
    setTimeout(() => {
      span.style.transition = "all 0.3s ease";
      span.style.opacity = "1";
      span.style.transform = "translateY(0)";
    }, index * 100);
  });

  // Animate underline
  setTimeout(
    () => {
      if (nameUnderline) {
        nameUnderline.style.transition = "width 0.5s ease";
        nameUnderline.style.width = "80%";
      }
    },
    letters.length * 100 + 200,
  );
}

function closeCreatorModal() {
  const modal = document.getElementById("creatorModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";

    // Reset animations
    const nameUnderline = document.getElementById("nameUnderline");
    if (nameUnderline) {
      nameUnderline.style.width = "0";
    }

    const letters = document.querySelectorAll(".name-letter");
    letters.forEach((letter) => {
      letter.style.opacity = "0";
      letter.style.transform = "translateY(20px)";
    });
  }
}

// ==================== IMAGE CLICK HANDLERS ====================
function initImageClickHandlers() {
  // Profile images
  document.querySelectorAll(".profile-small-img").forEach((img) => {
    img.addEventListener("click", function (e) {
      e.stopPropagation();
      const alt = this.getAttribute("alt");
      openFullscreenModal(this.src, alt);
    });
  });

  // About image
  const aboutImage = document.querySelector(".about-image img");
  if (aboutImage) {
    aboutImage.addEventListener("click", function () {
      openFullscreenModal(this.src, "From Stethoscopes 🩺 to Soulmates💝");
    });
  }

  // Event icons
  document.querySelectorAll(".event-icon-image").forEach((icon) => {
    icon.addEventListener("click", function (e) {
      e.stopPropagation();
      const title = this.closest(".event-card").querySelector("h3").textContent;
      const description = this.closest(".event-card").querySelector(
        ".event-description p",
      ).textContent;
      openEventModal(this.src, title, description);
    });
  });
}

// ==================== UTILITY FUNCTIONS ====================
// Prevent image drag
document.addEventListener("dragstart", function (e) {
  if (e.target.tagName === "IMG") {
    e.preventDefault();
  }
});

// Handle window resize
let resizeTimeout;
window.addEventListener("resize", function () {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Reinitialize anything that needs it
    updateCountdown();
  }, 250);
});

// Handle page load errors
window.addEventListener("error", function (e) {
  console.error("Error occurred:", e.error);
});

// ==================== INITIALIZE ON LOAD ====================
// Make sure everything runs after DOM is fully loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initWebsite);
} else {
  initWebsite();
}

function initWebsite() {
  console.log("Wedding website initialized!");
  // All initialization happens in DOMContentLoaded event
}
// ==================== FLOATING IMAGES VISIBILITY ====================
function updateFloatingImages() {
  const homePage = document.getElementById("home");
  const isOnHomePage = homePage && homePage.classList.contains("active");

  if (isOnHomePage) {
    document.body.classList.add("on-home-page");
  } else {
    document.body.classList.remove("on-home-page");
  }
}

// Call this function whenever page changes
function navigateToSection(sectionId) {
  const targetSection = document.getElementById(sectionId);
  const navLinks = document.querySelectorAll(".nav-link");

  if (!targetSection) return;

  // Update active navigation link
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${sectionId}`) {
      link.classList.add("active");
    }
  });

  // Hide all sections
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });

  // Show target section
  targetSection.classList.add("active");

  // Update floating images visibility
  updateFloatingImages();

  // Smooth scroll to section
  window.scrollTo({
    top: targetSection.offsetTop - 80,
    behavior: "smooth",
  });
}
document.addEventListener("DOMContentLoaded", function () {
  console.log("Website loaded successfully!");

  // Initialize all functions
  updateCountdown();
  initNavigation();
  initGalleryFilter(); // This is important!
  initMobileMenu();
  initRSVPForm();
  initCreatorModal();
  initImageClickHandlers();
  updateFloatingImages(); // Initialize floating images visibility

  // Set interval for countdown
  setInterval(updateCountdown, 1000);
});
// ==================== FLOATING IMAGES VISIBILITY ====================
function updateFloatingImages() {
  const homePage = document.getElementById("home");

  // Check if we're on the home page
  if (homePage && homePage.classList.contains("active")) {
    // Show floating images
    document.body.classList.add("show-floating");
  } else {
    // Hide floating images
    document.body.classList.remove("show-floating");
  }
}

// ==================== FULLSCREEN MODAL FUNCTIONS ====================
function openFullscreenModal(imageSrc, caption = "") {
  const modal = document.getElementById("fullscreenModal");
  const modalImage = document.getElementById("fullscreenModalImage");
  const modalCaption = document.getElementById("modalCaption");

  if (!modal || !modalImage) {
    console.error("Modal elements not found!");
    return;
  }

  // Set image and caption
  modalImage.src = imageSrc;
  modalImage.alt = caption;

  if (modalCaption) {
    modalCaption.textContent = caption;
  }

  // Show modal
  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  console.log("Opened fullscreen modal with:", imageSrc);
}

function closeFullscreenModal() {
  const modal = document.getElementById("fullscreenModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

// Close modal with ESC key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeFullscreenModal();
  }
});

// Close modal when clicking overlay
document
  .querySelector(".modal-overlay")
  ?.addEventListener("click", closeFullscreenModal);

// ==================== UPDATE NAVIGATION FUNCTION ====================
function navigateToSection(sectionId) {
  const targetSection = document.getElementById(sectionId);
  const navLinks = document.querySelectorAll(".nav-link");

  if (!targetSection) {
    console.error(`Section ${sectionId} not found!`);
    return;
  }

  // Update active navigation link
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${sectionId}`) {
      link.classList.add("active");
    }
  });

  // Hide all sections
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });

  // Show target section
  targetSection.classList.add("active");

  // Update floating images visibility
  updateFloatingImages();

  // Smooth scroll to section
  window.scrollTo({
    top: targetSection.offsetTop - 80,
    behavior: "smooth",
  });

  console.log(`Navigated to ${sectionId}`);
}

// ==================== INITIALIZATION ====================
document.addEventListener("DOMContentLoaded", function () {
  console.log("Website loaded successfully!");

  // Initialize all functions
  updateCountdown();
  initNavigation();
  initGalleryFilter();
  initMobileMenu();
  initRSVPForm();
  initCreatorModal();
  initImageClickHandlers();
  updateFloatingImages(); // Initialize floating images visibility

  // Set interval for countdown
  setInterval(updateCountdown, 1000);

  // Test modal function
  console.log("Fullscreen modal function ready");
});
// ==================== GALLERY FILTER ====================
function initGalleryFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Get filter category
      const filter = this.getAttribute("data-filter");

      // Filter gallery items
      galleryItems.forEach((item) => {
        const category = item.getAttribute("data-category");

        if (filter === "all" || category === filter) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
          }, 10);
        } else {
          item.style.opacity = "0";
          setTimeout(() => {
            item.style.display = "none";
          }, 300);
        }
      });

      console.log(`Showing ${filter} photos`);
    });
  });

  // Add click handlers for gallery images
  galleryItems.forEach((item) => {
    item.addEventListener("click", function () {
      const img = this.querySelector("img");
      const alt = img.getAttribute("alt") || "Wedding Photo";
      openFullscreenModal(img.src, alt);
    });
  });
}

// ==================== INITIALIZATION ====================
document.addEventListener("DOMContentLoaded", function () {
  console.log("Website loaded successfully!");

  // Initialize all functions
  updateCountdown();
  initNavigation();
  initGalleryFilter(); // This is important!
  initMobileMenu();
  initRSVPForm();
  initCreatorModal();
  initImageClickHandlers();
  updateFloatingImages();

  // Set interval for countdown
  setInterval(updateCountdown, 1000);
});
// ==================== CREATOR MODAL FUNCTIONS ====================
function initCreatorModal() {
  const creatorLink = document.getElementById("creatorLink");
  const creatorModal = document.getElementById("creatorModal");
  const closeModal = document.getElementById("closeModal");

  if (!creatorLink || !creatorModal) {
    console.error("Creator modal elements not found!");
    return;
  }

  // Open creator modal
  creatorLink.addEventListener("click", function (e) {
    e.preventDefault();
    openCreatorModal();
  });

  // Close modal
  closeModal.addEventListener("click", closeCreatorModal);

  // Close on outside click
  creatorModal.addEventListener("click", function (e) {
    if (e.target === creatorModal) {
      closeCreatorModal();
    }
  });

  // Initialize creator buttons
  initCreatorButtons();
}

function initCreatorButtons() {
  // View Full Image button
  const viewFullImageBtn = document.querySelector(".creator-btn:nth-child(1)");
  const closeCreatorBtn = document.querySelector(".creator-btn:nth-child(2)");

  if (viewFullImageBtn) {
    viewFullImageBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      openFullscreenModal("images/mevasanth.jpg", "Vasanthh - The Developer");
    });
  }

  if (closeCreatorBtn) {
    closeCreatorBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      closeCreatorModal();
    });
  }
}

function openFullscreenCreatorImage() {
  openFullscreenModal("images/mevasanth.jpg", "Vasanthh - The Developer");
}

function openCreatorModal() {
  const modal = document.getElementById("creatorModal");
  const animatedName = document.getElementById("animatedName");
  const nameUnderline = document.getElementById("nameUnderline");

  if (!modal) return;

  // Show modal
  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  // Clear previous name
  if (animatedName) {
    animatedName.innerHTML = "";

    // Create name animation
    const name = "im_Vasanthh";
    const letters = name.split("");

    letters.forEach((letter, index) => {
      const span = document.createElement("span");
      span.className = "name-letter";
      span.textContent = letter === "_" ? " " : letter;
      span.style.opacity = "0";
      span.style.transform = "translateY(20px)";
      animatedName.appendChild(span);

      // Animate each letter
      setTimeout(() => {
        span.style.transition = "all 0.3s ease";
        span.style.opacity = "1";
        span.style.transform = "translateY(0)";
      }, index * 100);
    });
  }

  // Animate underline
  setTimeout(() => {
    if (nameUnderline) {
      nameUnderline.style.transition = "width 0.5s ease";
      nameUnderline.style.width = "80%";
    }
  }, 1500);
}

function closeCreatorModal() {
  const modal = document.getElementById("creatorModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";

    // Reset animations
    const nameUnderline = document.getElementById("nameUnderline");
    if (nameUnderline) {
      nameUnderline.style.width = "0";
    }

    const letters = document.querySelectorAll(".name-letter");
    letters.forEach((letter) => {
      letter.style.opacity = "0";
      letter.style.transform = "translateY(20px)";
    });
  }
}

// ==================== FULLSCREEN MODAL FUNCTIONS ====================
function openFullscreenModal(imageSrc, caption = "") {
  const modal = document.getElementById("fullscreenModal");
  const modalImage = document.getElementById("fullscreenModalImage");
  const modalCaption = document.getElementById("modalCaption");

  if (!modal || !modalImage) {
    console.error("Modal elements not found!");
    // Fallback - open image in new tab
    window.open(imageSrc, "_blank");
    return;
  }

  // Set image and caption
  modalImage.src = imageSrc;
  modalImage.alt = caption;

  if (modalCaption) {
    modalCaption.textContent = caption;
  }

  // Show modal
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeFullscreenModal() {
  const modal = document.getElementById("fullscreenModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

// ==================== INITIALIZATION ====================
document.addEventListener("DOMContentLoaded", function () {
  console.log("Website loaded successfully!");

  // Initialize all functions
  updateCountdown();
  initNavigation();
  initGalleryFilter();
  initMobileMenu();
  initRSVPForm();
  initCreatorModal(); // Make sure this is called!
  initImageClickHandlers();
  updateFloatingImages();

  // Set interval for countdown
  setInterval(updateCountdown, 1000);

  console.log("All functions initialized successfully!");
});
// Mobile menu toggle
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const navLinksItems = document.querySelectorAll(".nav-link");

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      // Toggle mobile menu
      navLinks.classList.toggle("active");

      // Change menu icon
      const isActive = navLinks.classList.contains("active");
      mobileMenuBtn.innerHTML = isActive ? "✕" : "☰";
      mobileMenuBtn.setAttribute(
        "aria-label",
        isActive ? "Close menu" : "Open menu",
      );
    });
  }

  // Close mobile menu when clicking a link
  navLinksItems.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      mobileMenuBtn.innerHTML = "☰";
      mobileMenuBtn.setAttribute("aria-label", "Open menu");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (event) {
    const isClickInsideMenu = navLinks.contains(event.target);
    const isClickOnMenuButton = mobileMenuBtn.contains(event.target);

    if (
      !isClickInsideMenu &&
      !isClickOnMenuButton &&
      navLinks.classList.contains("active")
    ) {
      navLinks.classList.remove("active");
      mobileMenuBtn.innerHTML = "☰";
      mobileMenuBtn.setAttribute("aria-label", "Open menu");
    }
  });
});
