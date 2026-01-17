// Countdown Timer
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

  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;
}

// Start countdown
setInterval(updateCountdown, 1000);
updateCountdown();

// Simple function to open fullscreen image
function openFullscreenImage(imageSrc, title) {
  const modal = document.createElement("div");
  modal.innerHTML = `
    <div style="position:fixed; top:0; left:0; width:100%; height:100%;
               background:rgba(0,0,0,0.95); z-index:10000;
               display:flex; align-items:center; justify-content:center;">
      <button onclick="this.parentElement.parentElement.remove()" 
              style="position:absolute; top:20px; right:20px;
                     background:white; border:none; width:50px; height:50px;
                     border-radius:50%; font-size:30px; cursor:pointer;">×</button>
      <img src="${imageSrc}" alt="${title}" 
           style="max-width:90%; max-height:90vh; border-radius:10px;">
    </div>
  `;
  document.body.appendChild(modal);
}

// ==================== SISTER MODAL FUNCTIONS ====================

// Open sister modal
function openSisterModal() {
  const modal = document.getElementById("sisterModal");
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

// Close sister modal
function closeSisterModal() {
  const modal = document.getElementById("sisterModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

// Open fullscreen sister image
function openFullscreenSisterImage() {
  const modal = document.createElement("div");
  modal.innerHTML = `
    <div style="position:fixed; top:0; left:0; width:100%; height:100%;
               background:rgba(0,0,0,0.95); z-index:10000;
               display:flex; align-items:center; justify-content:center;">
      <button onclick="this.parentElement.parentElement.remove()" 
              style="position:absolute; top:20px; right:20px;
                     background:white; border:none; width:50px; height:50px;
                     border-radius:50%; font-size:30px; cursor:pointer;">×</button>
      <img src="images/Sisters.jpg" alt="Sister" 
           style="max-width:90%; max-height:90vh; border-radius:10px;">
    </div>
  `;
  document.body.appendChild(modal);
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
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    };

    // Set title and description
    if (modalTitle) modalTitle.textContent = title;
    if (modalDescription) modalDescription.textContent = description;
  }
}

// Close event modal
function closeEventModal() {
  const modal = document.getElementById("eventModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

// Show floating images ONLY on Home page
function updateFloatingImagesVisibility() {
  const homePage = document.getElementById("home");
  const isOnHomePage = homePage && homePage.classList.contains("active");

  if (isOnHomePage) {
    document.body.classList.add("show-floating-images");
  } else {
    document.body.classList.remove("show-floating-images");
  }
}

// Main Initialization Function
function initWebsite() {
  console.log("Initializing wedding website...");

  // 1. FIX NAVIGATION
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Only handle internal links (starting with #)
      if (href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          console.log("Navigating to:", targetId);

          // Remove active class from all links
          navLinks.forEach((l) => l.classList.remove("active"));
          // Add active to clicked link
          this.classList.add("active");

          // Remove active class from all pages
          document.querySelectorAll(".page").forEach((page) => {
            page.classList.remove("active");
          });
          // Add active to target page
          targetElement.classList.add("active");

          // Update floating images visibility
          updateFloatingImagesVisibility();

          // Smooth scroll to section
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });

  // 2. FIX HERO BUTTONS
  document.querySelectorAll(".hero-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const target = this.getAttribute("data-target");
      if (target && target.startsWith("#")) {
        const targetId = target.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          // Remove active class from all links
          navLinks.forEach((l) => l.classList.remove("active"));
          // Add active to corresponding nav link
          const correspondingLink = document.querySelector(
            `a[href="${target}"]`,
          );
          if (correspondingLink) {
            correspondingLink.classList.add("active");
          }

          // Remove active class from all pages
          document.querySelectorAll(".page").forEach((page) => {
            page.classList.remove("active");
          });
          // Add active to target page
          targetElement.classList.add("active");

          // Update floating images visibility
          updateFloatingImagesVisibility();

          // Smooth scroll to section
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });

  // 3. ADD CLICK EVENTS TO FLOATING IMAGES
  const floatingBride = document.querySelector(".floating-bride.right");
  const floatingGroom = document.querySelector(".floating-groom.left");

  // 4. ADD CLICK EVENTS TO PROFILE IMAGES
  document.querySelectorAll(".profile-small-img").forEach((img) => {
    img.addEventListener("click", function (e) {
      e.stopPropagation();
      const src = this.getAttribute("src");
      const alt = this.getAttribute("alt");
      openFullscreenImage(src, alt);
    });
  });

  // 5. CLOSE MODALS ON OUTSIDE CLICK
  document.addEventListener("click", function (e) {
    // Close sister modal when clicking outside
    const sisterModal = document.getElementById("sisterModal");
    if (
      sisterModal &&
      sisterModal.classList.contains("active") &&
      e.target === sisterModal
    ) {
      closeSisterModal();
    }

    // Close event modal when clicking outside
    const eventModal = document.getElementById("eventModal");
    if (
      eventModal &&
      eventModal.classList.contains("active") &&
      e.target === eventModal
    ) {
      closeEventModal();
    }
  });

  // 6. CLOSE MODALS WITH ESCAPE KEY
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeSisterModal();
      closeEventModal();
    }
  });

  // 7. INITIAL VISIBILITY CHECK
  updateFloatingImagesVisibility();

  // 8. INITIALIZE CREATOR MODAL
  initCreatorModal();

  // 9. INITIALIZE RSVP FORM
  initRSVPForm();

  // 10. INITIALIZE MOBILE MENU
  initMobileMenu();

  console.log("Website initialized successfully!");
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
      'input[name="attendance"]:checked',
    );
    if (selectedAttendance) {
      const statusMap = {
        "Yes, I'll be there with joy!": "🎉 Excited to attend!",
        "Maybe, still checking": "🤔 Considering options",
        "Regretfully can't make it": "😢 Unable to attend",
      };
      previewAttendance.textContent =
        statusMap[selectedAttendance.value] || "Not selected";
    }

    // Update events
    const selectedEvents = document.querySelectorAll(
      'input[type="checkbox"]:checked',
    );
    if (selectedEvents.length > 0) {
      const eventNames = Array.from(selectedEvents).map((checkbox) => {
        return checkbox.closest(".event-option").querySelector(".event-name")
          .textContent;
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

  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
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
        'input[name="attendance"]:checked',
      );
      const selectedEvents = document.querySelectorAll(
        'input[type="checkbox"]:checked',
      );

      // Validation
      if (!name || !email || !attendance) {
        alert(
          "Please fill in required fields: Name, Email, and Attendance status.",
        );
        return;
      }

      // Check if at least 2 events are selected when attending
      if (
        attendance.value === "Yes, I'll be there with joy!" &&
        selectedEvents.length < 2
      ) {
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
        "confirmation-message",
      );
      const confirmationDetails = document.getElementById(
        "confirmation-details",
      );
      const confirmationQuote = document.getElementById("confirmation-quote");

      // Set message based on attendance
      let message = "";
      let quote = "";

      if (attendance.value === "Yes, I'll be there with joy!") {
        message = `Thank you, ${name}! We're absolutely thrilled that you'll be joining us!`;
        quote = getRandomQuote(yesQuotes);
      } else if (attendance.value === "Maybe, still checking") {
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
        attendance.value === "Yes, I'll be there with joy!"
          ? "✅ Attending"
          : attendance.value === "Maybe, still checking"
            ? "❓ Maybe"
            : "❌ Not Attending"
      }</p>
    `;

      if (selectedEvents.length > 0) {
        const eventList = Array.from(selectedEvents)
          .map((cb) => {
            const eventName = cb
              .closest(".event-option")
              .querySelector(".event-name").textContent;
            const eventDate = cb
              .closest(".event-option")
              .querySelector(".event-date").textContent;
            return `• ${eventName} (${eventDate})`;
          })
          .join("<br>");
        detailsHTML += `<p><strong>Events attending:</strong><br>${eventList}</p>`;
      }

      confirmationDetails.innerHTML = detailsHTML;
      confirmationQuote.innerHTML = `<p>"${quote}"</p>`;

      // Scroll to confirmation
      rsvpConfirmation.scrollIntoView({ behavior: "smooth" });

      // Submit the actual form
      document.getElementById("wedding-rsvp-form").submit();
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

// Creator Modal Functionality
function initCreatorModal() {
  const creatorLink = document.getElementById("creatorLink");
  const creatorModal = document.getElementById("creatorModal");
  const closeModal = document.getElementById("closeModal");
  const animatedName = document.getElementById("animatedName");
  const nameUnderline = document.getElementById("nameUnderline");
  const clickableImage = document.getElementById("clickableImage");

  if (!creatorLink || !creatorModal) return;

  // Open modal when creator name is clicked
  creatorLink.addEventListener("click", function (e) {
    e.preventDefault();
    openCreatorModal();
  });

  // Close modal when X is clicked
  closeModal.addEventListener("click", closeCreatorModal);

  // Close modal when clicking outside content
  creatorModal.addEventListener("click", function (e) {
    if (e.target === creatorModal) {
      closeCreatorModal();
    }
  });

  // Clickable image to open fullscreen
  if (clickableImage) {
    clickableImage.addEventListener("click", function (e) {
      e.stopPropagation();
      openFullscreenCreatorImage();
    });
  }

  function openCreatorModal() {
    // Show modal
    creatorModal.classList.add("active");
    document.body.style.overflow = "hidden";

    // Clear previous name
    animatedName.innerHTML = "";

    // Create name "im_Vasanthh" with individual letters
    const name = "im_Vasanthh";
    const letters = name.split("");

    // Add heart animations
    createHeartAnimations();

    // Animate letters coming from below
    letters.forEach((letter, index) => {
      const span = document.createElement("span");
      span.className = "name-letter";
      span.textContent = letter === "_" ? " " : letter;
      span.style.color = getLetterColor(letter);
      animatedName.appendChild(span);

      // Animate each letter with delay
      setTimeout(() => {
        span.style.transition =
          "all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        span.style.opacity = "1";
        span.style.transform = "translateY(0)";

        // Add bounce effect
        setTimeout(() => {
          span.style.transform = "translateY(-10px)";
          setTimeout(() => {
            span.style.transform = "translateY(0)";
          }, 100);
        }, 600);
      }, index * 100);
    });

    // Animate underline after all letters appear
    setTimeout(
      () => {
        nameUnderline.style.width = "80%";
      },
      letters.length * 100 + 300,
    );
  }

  function closeCreatorModal() {
    creatorModal.classList.remove("active");
    document.body.style.overflow = "auto";

    // Reset animations
    nameUnderline.style.width = "0";

    // Fade out letters
    const letters = document.querySelectorAll(".name-letter");
    letters.forEach((letter, index) => {
      setTimeout(() => {
        letter.style.opacity = "0";
        letter.style.transform = "translateY(100px)";
      }, index * 50);
    });
  }

  function openFullscreenCreatorImage() {
    const modal = document.createElement("div");
    modal.innerHTML = `
      <div style="position:fixed; top:0; left:0; width:100%; height:100%;
                 background:rgba(0,0,0,0.95); z-index:10000;
                 display:flex; align-items:center; justify-content:center;">
        <button onclick="this.parentElement.parentElement.remove()" 
                style="position:absolute; top:20px; right:20px;
                       background:white; border:none; width:50px; height:50px;
                       border-radius:50%; font-size:30px; cursor:pointer;">×</button>
        <img src="images/mevasanth.jpg" alt="Vasanthh" 
             style="max-width:90%; max-height:90vh; border-radius:10px;">
      </div>
    `;
    document.body.appendChild(modal);
  }

  function getLetterColor(letter) {
    if (letter === "i" || letter === "m" || letter === "s") return "#ff6b9d";
    if (letter === "_") return "#8b4b6e";
    if (["V", "a", "s", "t", "h"].includes(letter)) return "#8b4b6e";
    return "#ff6b9d";
  }

  function createHeartAnimations() {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        const heart = document.createElement("div");
        heart.className = "heart-animation";
        heart.innerHTML = "❤️";
        heart.style.left = Math.random() * 100 + "%";
        heart.style.top = Math.random() * 100 + "%";

        creatorModal.querySelector(".creator-modal-content").appendChild(heart);

        // Remove after animation
        setTimeout(() => {
          if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
          }
        }, 2000);
      }, i * 200);
    }
  }
}

// Initialize website when DOM is loaded
document.addEventListener("DOMContentLoaded", initWebsite);
function openEventModal(imageSrc, title, description) {
  const modal = document.getElementById("eventModal");
  const modalImage = document.getElementById("eventModalImage");
  const modalTitle = document.getElementById("eventModalTitle");
  const modalDescription = document.getElementById("eventModalDescription");

  if (modal && modalImage) {
    // Set modal content
    modalImage.src = imageSrc;
    modalImage.onload = function () {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    };

    // Set title and description
    if (modalTitle) modalTitle.textContent = title;
    if (modalDescription) modalDescription.textContent = description;
  }
}
