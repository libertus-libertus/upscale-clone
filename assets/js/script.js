document.addEventListener("DOMContentLoaded", () => {
    // 🔹 Helper Function: Toggle visibility
    const toggleVisibility = (triggerId, targetId) => {
      const trigger = document.getElementById(triggerId);
      const target = document.getElementById(targetId);
      trigger?.addEventListener("click", () => {
        target?.classList.toggle("hidden");
      });
    };

    // 🔹 Toggle Mobile & Language Menus
    ["mobile-menu-toggle", "mobile-lang-toggle"].forEach((id, index) =>
      toggleVisibility(id, index === 0 ? "mobile-menu" : "mobile-lang-menu")
    );

    // 🔹 Accordion Toggle Function
    const toggleAccordion = (button) => {
      const contentId = button.getAttribute("aria-controls");
      const iconId = button.id.replace("button", "icon");
      const content = document.getElementById(contentId);
      const icon = document.getElementById(iconId);
      const isExpanded = button.getAttribute("aria-expanded") === "true";

      // Close other accordions
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

      // Toggle current accordion
      button.setAttribute("aria-expanded", String(!isExpanded));
      content?.classList.toggle("hidden");
      icon?.classList.toggle("rotate-180");
      button.classList.toggle("bg-gray-50", !isExpanded);
      button.classList.toggle("bg-white", isExpanded);
      button.classList.toggle("hover:bg-gray-50", isExpanded);
    };

    // 🔹 Init Accordion Events
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

    // 🔹 Init AOS
    AOS.init();
});