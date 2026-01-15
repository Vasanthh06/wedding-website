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

// Floating Images with Hearts - ONLY FOR HOMEPAGE
function initFloatingImages() {
  // Check if we're on homepage (only run on homepage)
  const isHomePage = document.querySelector(".events-container") !== null;
  if (!isHomePage) {
    console.log("Not homepage, skipping floating images");
    return;
  }

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

// SIMPLE FLOATING BRIDE/GROOM IMAGES (for sidebar)
function initSidebarFloats() {
  const floatingBride = document.querySelector(".floating-bride.right");
  const floatingGroom = document.querySelector(".floating-groom.left");

  if (floatingBride) {
    floatingBride.style.cursor = "pointer";
    floatingBride.addEventListener("click", function (e) {
      e.preventDefault();
      openSimpleFullscreen("images/Lakshmii.JPG", "The Beautiful Bride 💐");
    });
  }

  if (floatingGroom) {
    floatingGroom.style.cursor = "pointer";
    floatingGroom.addEventListener("click", function (e) {
      e.preventDefault();
      openSimpleFullscreen("images/eeee.JPG", "The Handsome Groom 🤵");
    });
  }

  function openSimpleFullscreen(imageSrc, title) {
    // Remove any existing fullscreen
    const existing = document.querySelector(".simple-fullscreen");
    if (existing) existing.remove();

    // Create simple fullscreen div
    const fullscreenDiv = document.createElement("div");
    fullscreenDiv.className = "simple-fullscreen";
    fullscreenDiv.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        `;

    // Create image
    const img = document.createElement("img");
    img.src = imageSrc;
    img.alt = title;
    img.style.cssText = `
            max-width: 90%;
            max-height: 90vh;
            border-radius: 10px;
            box-shadow: 0 0 50px rgba(255, 255, 255, 0.1);
            animation: zoomIn 0.4s ease;
        `;

    // Create close button
    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = "×";
    closeBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            background: white;
            color: black;
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            font-size: 30px;
            cursor: pointer;
            z-index: 10000;
            transition: all 0.3s ease;
        `;
    closeBtn.onmouseenter = function () {
      this.style.background = "#d89cb4";
    };
    closeBtn.onmouseleave = function () {
      this.style.background = "white";
    };

    // Close function
    closeBtn.onclick = function () {
      fullscreenDiv.style.animation = "fadeOut 0.3s ease";
      setTimeout(() => fullscreenDiv.remove(), 300);
    };

    // Close on click outside image
    fullscreenDiv.onclick = function (e) {
      if (e.target === fullscreenDiv) {
        fullscreenDiv.style.animation = "fadeOut 0.3s ease";
        setTimeout(() => fullscreenDiv.remove(), 300);
      }
    };

    // Escape key to close
    const keyHandler = function (e) {
      if (e.key === "Escape") {
        fullscreenDiv.style.animation = "fadeOut 0.3s ease";
        setTimeout(() => fullscreenDiv.remove(), 300);
        document.removeEventListener("keydown", keyHandler);
      }
    };
    document.addEventListener("keydown", keyHandler);

    // Add to page
    fullscreenDiv.appendChild(closeBtn);
    fullscreenDiv.appendChild(img);
    document.body.appendChild(fullscreenDiv);

    // Check if image loads
    img.onerror = function () {
      console.error("Image failed to load:", imageSrc);
      img.alt = "Image failed to load. Path: " + imageSrc;
    };
  }

  // Add CSS animations
  const style = document.createElement("style");
  style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        @keyframes zoomIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        .floating-bride, .floating-groom {
            cursor: pointer !important;
            transition: transform 0.3s ease !important;
        }
    `;
  document.head.appendChild(style);
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

// RSVP Form Enhancement
function initRSVPForm() {
  const rsvpForm = document.querySelector(".rsvp-form");
  if (!rsvpForm) return;

  const rsvpConfirmation = document.getElementById("rsvp-confirmation");
  const celebrationContainer = document.getElementById("celebration-container");
  const previewAttendance = document.querySelector(".preview-attendance");
  const previewEvents = document.querySelector(".preview-events");
  const previewGuests = document.querySelector(".preview-guests");

  // Real-time preview updates
  function updatePreview() {
    // Update attendance
    const selectedAttendance = document.querySelector(
      'input[name="attendance"]:checked'
    );
    if (selectedAttendance) {
      const statusMap = {
        yes: "🎉 Excited to attend!",
        maybe: "🤔 Considering options",
        no: "😢 Unable to attend",
      };
      previewAttendance.textContent = statusMap[selectedAttendance.value];
    }

    // Update events
    const selectedEvents = document.querySelectorAll(
      'input[name="events"]:checked'
    );
    if (selectedEvents.length > 0) {
      const eventNames = Array.from(selectedEvents).map((checkbox) => {
        const eventMap = {
          mehndi: "Mehndi",
          sangeet: "Sangeet",
          wedding: "Wedding",
          reception: "Reception",
        };
        return eventMap[checkbox.value];
      });
      previewEvents.textContent = eventNames.join(", ");
    } else {
      previewEvents.textContent = "No events selected";
    }

    // Update guests
    const guests = document.getElementById("rsvp-guests").value;
    previewGuests.textContent = guests || "0";
  }

  // Add event listeners for real-time updates
  document.querySelectorAll('input[name="attendance"]').forEach((radio) => {
    radio.addEventListener("change", updatePreview);
  });

  document.querySelectorAll('input[name="events"]').forEach((checkbox) => {
    checkbox.addEventListener("change", updatePreview);
  });

  document
    .getElementById("rsvp-guests")
    .addEventListener("input", updatePreview);

  // Celebration quotes
  const yesQuotes = [
    "We're overjoyed that you can join us! 🥳",
    "Can't wait to celebrate with you! 🎉",
    "Your presence makes our day complete! 💖",
  ];

  const maybeQuotes = [
    "Hope you can make it! We'd love to see you! 🤗",
    "Looking forward to celebrating together if you can join! ✨",
  ];

  // Create celebration effects
  function createCelebration() {
    if (!celebrationContainer) return;
    celebrationContainer.innerHTML = "";

    // Create hearts
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.innerHTML = "❤️";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDelay = Math.random() * 2 + "s";
        celebrationContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 3000);
      }, i * 50);
    }

    // Create confetti
    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.animationDelay = Math.random() * 1 + "s";
        celebrationContainer.appendChild(confetti);
        setTimeout(() => confetti.remove(), 3000);
      }, i * 30);
    }
  }

  function getRandomColor() {
    const colors = [
      "#e91e63",
      "#9c27b0",
      "#3f51b5",
      "#03a9f4",
      "#009688",
      "#8bc34a",
      "#ffeb3b",
      "#ff9800",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Get random quote
  function getRandomQuote(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Enhanced form submission
  document
    .getElementById("submit-rsvp")
    .addEventListener("click", function (e) {
      e.preventDefault();

      const name = document.getElementById("rsvp-name").value;
      const email = document.getElementById("rsvp-email").value;
      const attendance = document.querySelector(
        'input[name="attendance"]:checked'
      );
      const selectedEvents = document.querySelectorAll(
        'input[name="events"]:checked'
      );

      // Validation
      if (!name || !email || !attendance) {
        alert(
          "Please fill in required fields: Name, Email, and Attendance status."
        );
        return;
      }

      // Check if at least 2 events are selected when attending
      if (attendance.value === "yes" && selectedEvents.length < 2) {
        alert("Please select at least 2 events you plan to attend.");
        return;
      }

      // Create celebration
      createCelebration();

      // Hide form, show confirmation
      rsvpForm.style.display = "none";
      rsvpConfirmation.style.display = "block";

      // Update confirmation message
      const confirmationMessage = document.getElementById(
        "confirmation-message"
      );
      const confirmationDetails = document.getElementById(
        "confirmation-details"
      );
      const confirmationQuote = document.getElementById("confirmation-quote");

      // Set message based on attendance
      let message = "";
      let quote = "";

      if (attendance.value === "yes") {
        message = `Thank you, ${name}! We're absolutely thrilled that you'll be joining us!`;
        quote = getRandomQuote(yesQuotes);
      } else if (attendance.value === "maybe") {
        message = `Thank you, ${name}! We hope you can make it and will keep you updated.`;
        quote = getRandomQuote(maybeQuotes);
      } else {
        message = `Thank you, ${name}. We'll miss you but appreciate you letting us know.`;
        quote =
          "We'll keep you in our hearts even if you can't be there in person.";
      }

      confirmationMessage.textContent = message;

      // Build details
      let detailsHTML = `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Attendance:</strong> ${
        attendance.value === "yes"
          ? "✅ Attending"
          : attendance.value === "maybe"
          ? "❓ Maybe"
          : "❌ Not Attending"
      }</p>
    `;

      if (selectedEvents.length > 0) {
        const eventList = Array.from(selectedEvents)
          .map((cb) => {
            const eventNames = {
              mehndi: "Mehndi Ceremony (Apr 26)",
              sangeet: "Sangeet Night (Apr 26)",
              wedding: "Wedding Ceremony (Apr 29)",
              reception: "Reception (Apr 28)",
            };
            return `• ${eventNames[cb.value]}`;
          })
          .join("<br>");
        detailsHTML += `<p><strong>Events attending:</strong><br>${eventList}</p>`;
      }

      confirmationDetails.innerHTML = detailsHTML;
      confirmationQuote.innerHTML = `<p>"${quote}"</p>`;

      // Scroll to confirmation
      rsvpConfirmation.scrollIntoView({ behavior: "smooth" });
    });

  // Back to form button
  document
    .getElementById("back-to-form")
    .addEventListener("click", function () {
      rsvpConfirmation.style.display = "none";
      rsvpForm.style.display = "block";
      rsvpForm.scrollIntoView({ behavior: "smooth" });
    });

  // Initialize preview
  updatePreview();
}

// Initialize everything when page loads
document.addEventListener("DOMContentLoaded", function () {
  initFloatingImages();
  initSidebarFloats();
  initMobileMenu();
  initRSVPForm();
});
// Fix Navigation Buttons
function fixNavigation() {
  console.log("Fixing navigation...");

  // Fix Our Story button
  const ourStoryBtn = document.querySelector('a[href="#about"]');
  const aboutSection = document.getElementById("about");

  if (ourStoryBtn && aboutSection) {
    ourStoryBtn.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("Our Story clicked");

      // First show the section if hidden
      aboutSection.style.display = "block";
      aboutSection.style.visibility = "visible";
      aboutSection.style.opacity = "1";

      // Then scroll to it
      aboutSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Also remove any active classes from other sections if needed
      document.querySelectorAll(".page").forEach((page) => {
        page.classList.remove("active");
      });
      aboutSection.classList.add("active");
    });
  }

  // Fix Connect Us button
  const connectUsBtn = document.querySelector('a[href="#contact"]');
  const contactSection = document.getElementById("contact");

  if (connectUsBtn && contactSection) {
    connectUsBtn.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("Connect Us clicked");

      // First show the section if hidden
      contactSection.style.display = "block";
      contactSection.style.visibility = "visible";
      contactSection.style.opacity = "1";

      // Then scroll to it
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Also remove any active classes from other sections if needed
      document.querySelectorAll(".page").forEach((page) => {
        page.classList.remove("active");
      });
      contactSection.classList.add("active");
    });
  }

  // Fix all nav links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          console.log(`Navigating to ${targetId}`);

          // Show section
          targetSection.style.display = "block";
          targetSection.style.visibility = "visible";
          targetSection.style.opacity = "1";

          // Scroll to section
          targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          // Update active state
          document.querySelectorAll(".page").forEach((page) => {
            page.classList.remove("active");
          });
          targetSection.classList.add("active");
        }
      }
    });
  });
}

// Call this function after DOM loads
document.addEventListener("DOMContentLoaded", function () {
  // ... your existing code ...
  fixNavigation(); // Add this line

  // Also try to fix on page load
  setTimeout(fixNavigation, 1000);
});

// Also fix on any dynamic content load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", fixNavigation);
} else {
  fixNavigation();
}
// Add this JavaScript to your script.js file or <script> tag

// ==================== SISTER MODAL FUNCTIONS ====================

// Open sister modal
function openSisterModal() {
  const modal = document.getElementById("sisterModal");
  if (modal) {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  }
}

// Close sister modal
function closeSisterModal() {
  const modal = document.getElementById("sisterModal");
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

// ==================== EVENT MODAL FUNCTIONS ====================

// Open event modal
function openEventModal(imageSrc, title, description) {
  const modal = document.getElementById("eventModal");
  const modalImage = document.getElementById("eventModalImage");
  const modalTitle = document.getElementById("eventModalTitle");
  const modalDescription = document.getElementById("eventModalDescription");

  if (modal && modalImage) {
    // Set modal content
    modalImage.src = imageSrc;
    modalImage.onload = function () {
      modal.style.display = "block";
      document.body.style.overflow = "hidden";
    };

    // Set title and description if available
    if (title) modalTitle.textContent = title;
    if (description) modalDescription.textContent = description;
  }
}

// Close event modal
function closeEventModal() {
  const modal = document.getElementById("eventModal");
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

// ==================== PAGE INITIALIZATION ====================

document.addEventListener("DOMContentLoaded", function () {
  console.log("Initializing wedding website...");

  // 1. SETUP SISTER IMAGE CLICK
  const sisterImage = document.querySelector(".sister-floating-image");
  if (sisterImage) {
    sisterImage.addEventListener("click", openSisterModal);
  }

  // 2. SETUP EVENT ICON CLICKS
  const eventIcons = document.querySelectorAll(".event-icon-image");
  eventIcons.forEach((icon) => {
    icon.addEventListener("click", function () {
      const imageSrc = this.src;
      const eventCard = this.closest(".event-card");
      const eventTitle = eventCard.querySelector("h3")?.textContent || "Event";
      const eventDesc =
        eventCard.querySelector(".event-description")?.textContent || "";

      openEventModal(imageSrc, eventTitle, eventDesc);
    });
  });

  // 3. SETUP MODAL CLOSE ON OUTSIDE CLICK
  const sisterModal = document.getElementById("sisterModal");
  const eventModal = document.getElementById("eventModal");

  if (sisterModal) {
    sisterModal.addEventListener("click", function (e) {
      if (e.target.classList.contains("modal-overlay")) {
        closeSisterModal();
      }
    });
  }

  if (eventModal) {
    eventModal.addEventListener("click", function (e) {
      if (e.target.classList.contains("modal-overlay")) {
        closeEventModal();
      }
    });
  }

  // 4. REMOVE OLD OPEN SISTERS FUNCTION
  // Delete the inline openSisters() function from your HTML
  // since we're using the proper modal now

  console.log("Website initialized successfully!");
});
function openFullscreenSisterImage() {
  const img = document.createElement("div");
  img.innerHTML = `
    <div style="
      position: fixed; 
      top: 0; 
      left: 0; 
      width: 100%; 
      height: 100%;
      background: rgba(0,0,0,0.95); 
      z-index: 10000;
      display: flex; 
      align-items: center; 
      justify-content: center;
      padding: 20px;
    ">
      <button onclick="this.parentElement.remove()" 
              style="
                position: absolute; 
                top: 20px; 
                right: 20px;
                background: white; 
                border: none; 
                width: 50px; 
                height: 50px;
                border-radius: 50%; 
                font-size: 30px; 
                cursor: pointer;
                z-index: 10001;
              ">×</button>
      
      <img src="images\\Sisters.jpg" alt="Sister" 
           style="
             max-width: 90%;
             max-height: 90vh;
             border-radius: 10px;
             object-fit: contain;
           ">
    </div>
  `;
  document.body.appendChild(img.firstElementChild);
}
const creatorLink = document.getElementById("creatorLink");
const creatorModal = document.getElementById("creatorModal");
const closeModal = document.getElementById("closeModal");

creatorLink.addEventListener("click", () => {
  creatorModal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
  creatorModal.style.display = "none";
});

creatorModal.addEventListener("click", (e) => {
  if (e.target === creatorModal) {
    creatorModal.style.display = "none";
  }
});
