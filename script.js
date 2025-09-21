// Navigation mobile
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Fermer le menu mobile quand on clique sur un lien
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// Smooth scrolling pour les liens de navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Changement d'opacité de la navbar au scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(10, 10, 10, 0.98)";
  } else {
    navbar.style.background = "rgba(10, 10, 10, 0.95)";
  }
});

// Système d'onglets pour les matchs
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Retirer la classe active de tous les boutons et contenus
    tabBtns.forEach((b) => b.classList.remove("active"));
    tabContents.forEach((c) => c.classList.remove("active"));

    // Ajouter la classe active au bouton cliqué
    btn.classList.add("active");

    // Afficher le contenu correspondant
    const targetTab = btn.getAttribute("data-tab");
    document.getElementById(targetTab).classList.add("active");
  });
});

// Animation des éléments au scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observer les cartes pour les animations
document
  .querySelectorAll(".player-card, .achievement-card, .match-card")
  .forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    observer.observe(card);
  });

// Animation des statistiques des joueurs
function animateStats() {
  const stats = document.querySelectorAll(".stat-value");
  stats.forEach((stat) => {
    const finalValue = stat.textContent;
    const isPercentage = finalValue.includes("%");
    const numericValue = parseFloat(finalValue.replace(/[^\d.]/g, ""));

    let currentValue = 0;
    const increment = numericValue / 50;
    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= numericValue) {
        currentValue = numericValue;
        clearInterval(timer);
      }
      stat.textContent = isPercentage
        ? Math.round(currentValue) + "%"
        : currentValue.toFixed(1);
    }, 30);
  });
}

// Observer pour déclencher l'animation des stats
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateStats();
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const teamSection = document.querySelector(".team-section");
if (teamSection) {
  statsObserver.observe(teamSection);
}

// Effet de parallaxe pour les éléments flottants
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const elements = document.querySelectorAll(".element");

  elements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Animation du logo au hover
const logo = document.querySelector(".logo");
if (logo) {
  logo.addEventListener("mouseenter", () => {
    logo.style.transform = "rotate(360deg) scale(1.1)";
    logo.style.transition = "transform 0.6s ease-in-out";
  });

  logo.addEventListener("mouseleave", () => {
    logo.style.transform = "rotate(0deg) scale(1)";
  });
}

// Effet de typing pour le titre principal
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialiser l'effet de typing au chargement
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 150);
    }, 1000);
  }
});

// Animation des boutons au hover
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    btn.style.transform = "translateY(-2px) scale(1.05)";
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translateY(0) scale(1)";
  });
});

// Effet de particules pour le hero
function createParticles() {
  const hero = document.querySelector(".hero");
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(233, 69, 96, 0.5);
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
    hero.appendChild(particle);
  }
}

// Créer les particules au chargement
window.addEventListener("load", createParticles);

// Gestion du formulaire de contact
const contactForm = document.querySelector(".contact-form form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Animation de soumission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Envoi en cours...";
    submitBtn.disabled = true;

    // Simuler l'envoi
    setTimeout(() => {
      submitBtn.textContent = "Message envoyé !";
      submitBtn.style.background = "#00ff00";

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = "";
        contactForm.reset();
      }, 2000);
    }, 1500);
  });
}

// Effet de glow au survol des cartes
document.querySelectorAll(".player-card, .achievement-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.boxShadow = "0 0 30px rgba(233, 69, 96, 0.3)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.boxShadow = "";
  });
});

// Animation de compteur pour les statistiques
function animateCounter(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const current = Math.floor(progress * (end - start) + start);
    element.textContent = current;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Lazy loading des images
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove("lazy");
      imageObserver.unobserve(img);
    }
  });
});

document.querySelectorAll("img[data-src]").forEach((img) => {
  imageObserver.observe(img);
});

// Effet de révélation progressive des sections
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll("section").forEach((section) => {
  sectionObserver.observe(section);
});

// Gestion du thème sombre/clair (optionnel)
function toggleTheme() {
  document.body.classList.toggle("light-theme");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("light-theme") ? "light" : "dark"
  );
}

// Charger le thème sauvegardé
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  document.body.classList.add("light-theme");
}

// Ajouter un bouton de retour en haut
function addBackToTop() {
  const backToTop = document.createElement("button");
  backToTop.innerHTML = "↑";
  backToTop.className = "back-to-top";
  backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--highlight-color);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;

  document.body.appendChild(backToTop);

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTop.style.opacity = "1";
      backToTop.style.visibility = "visible";
    } else {
      backToTop.style.opacity = "0";
      backToTop.style.visibility = "hidden";
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Initialiser le bouton de retour en haut
addBackToTop();

// Performance: Debounce pour les événements de scroll
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Appliquer le debounce aux événements de scroll
const debouncedScrollHandler = debounce(() => {
  // Logique de scroll optimisée
}, 10);

window.addEventListener("scroll", debouncedScrollHandler);

console.log("🚀 Site Icare Esport chargé avec succès !");
