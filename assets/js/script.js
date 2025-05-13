document.addEventListener("DOMContentLoaded", () => {
  // 🔹 Helper Function: Toggle visibility of elements
  const toggleVisibility = (triggerId, targetId) => {
    const trigger = document.getElementById(triggerId);
    const target = document.getElementById(targetId);
    trigger?.addEventListener("click", () => {
      target?.classList.toggle("hidden");
    });
  };

  // 🔹 Toggle Mobile & Language Menus
  // Simplified the logic by using an array of ids and targets
  [
    { triggerId: "mobile-menu-toggle", targetId: "mobile-menu" },
    { triggerId: "mobile-lang-toggle", targetId: "mobile-lang-menu" }
  ].forEach(({ triggerId, targetId }) => toggleVisibility(triggerId, targetId));

  // 🔹 Accordion Toggle Function
  const toggleAccordion = (button) => {
    const contentId = button.getAttribute("aria-controls");
    const iconId = button.id.replace("button", "icon");
    const content = document.getElementById(contentId);
    const icon = document.getElementById(iconId);
    const isExpanded = button.getAttribute("aria-expanded") === "true";

    // Close other accordions and reset their state
    document.querySelectorAll('[id^="accordion-button-"]').forEach((otherBtn) => {
      if (otherBtn !== button && otherBtn.getAttribute("aria-expanded") === "true") {
        const otherContent = document.getElementById(otherBtn.getAttribute("aria-controls"));
        const otherIcon = document.getElementById(otherBtn.id.replace("button", "icon"));
        otherBtn.setAttribute("aria-expanded", "false");
        otherContent?.classList.add("hidden");
        otherIcon?.classList.remove("rotate-180");
        otherBtn.classList.replace("bg-gray-50", "bg-white");
        otherBtn.classList.add("hover:bg-gray-50");
      }
    });

    // Toggle current accordion state
    button.setAttribute("aria-expanded", String(!isExpanded));
    content?.classList.toggle("hidden");
    icon?.classList.toggle("rotate-180");
    button.classList.toggle("bg-gray-50", !isExpanded);
    button.classList.toggle("bg-white", isExpanded);
    button.classList.toggle("hover:bg-gray-50", isExpanded);
  };

  // 🔹 Init Accordion Events
  // Simplified event listener binding
  document.querySelectorAll('[id^="accordion-button-"]').forEach((button) => {
    button.addEventListener("click", () => toggleAccordion(button));
  });

  // 🔹 Scroll-based Navbar Styling
  const header = document.getElementById("main-header");
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY > 50;
    header?.classList.toggle("bg-black/80", scrolled);
    header?.classList.toggle("backdrop-blur", scrolled);
    header?.classList.toggle("shadow-md", scrolled);
  });

  // 🔹 Count-up Animation
  const animateCount = (el, target, suffix = '') => {
    let start = 0;
    const duration = 2000;
    const stepTime = Math.max(Math.floor(duration / target), 20);
    const increment = Math.ceil(target / (duration / stepTime));

    const counterInterval = setInterval(() => {
      start += increment;
      if (start >= target) {
        el.textContent = `${target.toLocaleString()}${suffix}`;
        clearInterval(counterInterval);
      } else {
        el.textContent = `${start.toLocaleString()}${suffix}`;
      }
    }, stepTime);
  };

  const counters = document.querySelectorAll(".count-up");
  let hasAnimated = false;
  const countUpObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        counters.forEach(counter => {
          const target = parseInt(counter.dataset.target);
          const suffix = counter.dataset.suffix || "";
          animateCount(counter, target, suffix);
        });
        hasAnimated = true;
        observer.disconnect();
      }
    });
  }, { threshold: 0.6 });

  counters.forEach(counter => countUpObserver.observe(counter));

  // 🔹 Modal Toggle for Login
  const toggleModal = () => {
    const loginModal = document.getElementById('login-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    loginModal.classList.toggle('modal-hidden');
    loginModal.classList.toggle('modal-visible');
    modalOverlay.classList.toggle('opacity-0');
    modalOverlay.classList.toggle('pointer-events-none');
    document.body.classList.toggle('overflow-hidden');
  };

  const loginBtn = document.getElementById('login-btn');
  const mobileLoginBtn = document.getElementById('mobile-login-btn');
  const closeModalBtn = document.getElementById('close-modal');
  const modalOverlay = document.getElementById('modal-overlay');

  // Event listeners for login modal
  loginBtn?.addEventListener('click', toggleModal);
  mobileLoginBtn?.addEventListener('click', () => {
    document.getElementById("mobile-menu")?.classList.add('hidden');
    toggleModal();
  });
  closeModalBtn?.addEventListener('click', toggleModal);
  modalOverlay?.addEventListener('click', toggleModal);

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !document.getElementById('login-modal').classList.contains('modal-hidden')) {
      toggleModal();
    }
  });

  // 🔹 Init Splide Slider
  const splide = new Splide('#partner-slider', {
    type: 'loop',
    perPage: 5,
    breakpoints: {
      1024: { perPage: 4 },
      768: { perPage: 3 },
      640: { perPage: 2 },
      480: { perPage: 1 },
    },
    autoplay: true,
    interval: 2500,
    pauseOnHover: false,
    arrows: false,
    pagination: false,
    speed: 600,
  });
  splide.mount();

  // 🔹 Init AOS (Animate On Scroll)
  AOS.init();
});
