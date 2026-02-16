// Mobile Menu Toggle
const mobileMenu = document.querySelector(".mobile-menu");
const navLinks = document.querySelector(".nav-links");
const dropdowns = document.querySelectorAll(".dropdown");

// Toggle mobile menu and icon
mobileMenu.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Handle mobile dropdowns
dropdowns.forEach((dropdown) => {
  const toggle = dropdown.querySelector(".dropdown-toggle");

  toggle.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      e.stopPropagation();

      // Toggle the current dropdown
      dropdown.classList.toggle("active");

      // Close other dropdowns
      dropdowns.forEach((otherDropdown) => {
        if (otherDropdown !== dropdown) {
          otherDropdown.classList.remove("active");
        }
      });
    }
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".nav-container")) {
    mobileMenu.classList.remove("active");
    navLinks.classList.remove("active");
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("active");
    });
  }
});

const anchorLinks = navLinks.getElementsByClassName("border-bottom");
navLinks.addEventListener("click", (e) => {
  mobileMenu.classList.remove("active");
});

// Close mobile menu when window is resized above mobile breakpoint
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    mobileMenu.classList.remove("active");
    navLinks.classList.remove("active");
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("active");
    });
  }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
      // Close mobile menu if open
      if (window.innerWidth <= 768) {
        navLinks.classList.remove("active");
      }
    }
  });
});

/* // Form Submission
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    // Here you would typically send the form data to a server
    alert("Thank you for your message! We will get back to you soon.");
    this.reset();
  });
} */

// Animate Progress Bars on Scroll
const progressBars = document.querySelectorAll(".progress");
const animateProgressBars = () => {
  progressBars.forEach((bar) => {
    const width = bar.style.width;
    bar.style.width = "0";
    setTimeout(() => {
      bar.style.width = width;
    }, 100);
  });
};

// Intersection Observer for Progress Bars
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateProgressBars();
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".stats").forEach((section) => {
  observer.observe(section);
});

// Sticky Header
const header = document.querySelector(".header");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    header.classList.remove("scroll-up");
    return;
  }

  if (currentScroll > lastScroll && !header.classList.contains("scroll-down")) {
    // Scroll Down
    header.classList.remove("scroll-up");
    header.classList.add("scroll-down");
  } else if (
    currentScroll < lastScroll &&
    header.classList.contains("scroll-down")
  ) {
    // Scroll Up
    header.classList.remove("scroll-down");
    header.classList.add("scroll-up");
  }
  lastScroll = currentScroll;
});

// Animate services when scrolled into view
const animateServices = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add animation class to all service cards within the section
          entry.target.querySelectorAll(".service-card").forEach((card) => {
            card.classList.add("animate");
          });
          // Unobserve after animation is triggered
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2, // Trigger when 20% of the section is visible
    }
  );

  // Observe the services section
  const servicesSection = document.querySelector(".services-grid");
  if (servicesSection) {
    observer.observe(servicesSection);
  }
};

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", animateServices);

const animatestepContainer = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll(".step").forEach((step) => {
            step.classList.add("animate");
          });
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  const stepContainer = document.querySelector(".steps-container");
  if (stepContainer) {
    observer.observe(stepContainer);
  }
};

document.addEventListener("DOMContentLoaded", animatestepContainer);

// Animate stats when scrolled into view
const animateStats = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate all progress bars in the stats section
          entry.target.querySelectorAll(".stat-item").forEach((stat) => {
            // Add animation class to stat item for title animation
            stat.classList.add("animate");

            // Animate progress bar
            const progressBar = stat.querySelector(".progress");
            if (progressBar) {
              // Store the target width
              const targetWidth =
                progressBar.getAttribute("data-width") ||
                progressBar.style.width;
              // Set initial width to 0
              progressBar.style.width = "0";
              // Trigger animation after a small delay
              setTimeout(() => {
                progressBar.style.width = targetWidth;
              }, 200);
            }
          });

          // Unobserve after animation is triggered
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  // Initialize progress bars with data-width attribute
  document.querySelectorAll(".progress").forEach((progress) => {
    // Store the original width as a data attribute
    const width = progress.style.width;
    progress.setAttribute("data-width", width);
    // Set initial width to 0
    progress.style.width = "0";
  });

  // Observe the stats section
  const statsSection = document.querySelector(".stats");
  if (statsSection) {
    observer.observe(statsSection);
  }
};

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", animateStats);

// Open whatsapp
const openWhatsApp = (phoneNumber, message) => {
  const encodedMessage = encodeURIComponent(message.trim());
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const whatsappURL = isMobile
    ? `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

  window.open(whatsappURL, "_blank");
};

const bookNow = document.getElementsByClassName("book-property");
console.log("book:" + bookNow);

Array.from(bookNow).forEach((book) => {
  book.addEventListener("click", (e) => {
    e.preventDefault();
    openWhatsApp("923218894983", "*Get an estimate for marquee event*");
  });
});

// Whatsapp on form submit
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document
      .querySelector('input[placeholder="Your Name"]')
      .value.trim();
    const phone = document
      .querySelector('input[placeholder="Phone Number"]')
      .value.trim();
    const event = document.querySelector('select[name="event"]').value;
    const message = document
      .querySelector('textarea[placeholder="Tell us about your event"]')
      .value.trim();

    // Check if values are being picked up
    console.log({ name, phone, event, message });

    const phoneNumber = "923218894983"; // Replace with your actual WhatsApp number

    const fullMessage =
      `*New Inquiry from Website*\n\n` +
      `*Name:* ${name}\n` +
      `*Phone:* ${phone}\n` +
      `*Event:* ${event}\n` +
      `*Message:* ${message}`;

    openWhatsApp(phoneNumber, fullMessage);
  });
}

/* document
  .getElementById("book-property-btn")
  .addEventListener("click", function (e) {
    e.preventDefault();
    openWhatsApp("971585560786", "*Need to book a property*");
  });

document.getElementById("book-now").addEventListener("click", (e) => {
  e.preventDefault();
  openWhatsApp("971585560786", "*Need to book a property*");
}); */

// hero animation

// const slides = document.querySelectorAll(".hero-slides img");
// let index = 0;

// setInterval(() => {
//   slides[index].classList.remove("active");
//   index = (index + 1) % slides.length;
//   slides[index].classList.add("active");
// }, 5000);
