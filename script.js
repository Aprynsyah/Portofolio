/* =========================
   PORTFOLIO SCRIPT
   White Cartoon Game Theme
========================= */

/* AOS Animation */
if (typeof AOS !== "undefined") {
  AOS.init({
    duration: 750,
    once: true,
    offset: 50,
    easing: "ease-out-quart"
  });
}

/* Navbar Scroll Effect */
const nav = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (nav) {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  }
});

/* Active Navbar Link */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

const activeNavObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");

        navLinks.forEach((link) => {
          link.classList.remove("active");
        });

        const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);

        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  },
  {
    threshold: 0.4
  }
);

sections.forEach((section) => {
  activeNavObserver.observe(section);
});

/* Mobile Menu */
function toggleMenu() {
  const mobileMenu = document.getElementById("mobileMenu");

  if (mobileMenu) {
    mobileMenu.classList.toggle("open");
  }
}

/* Close Mobile Menu When Click Outside */
document.addEventListener("click", (event) => {
  const mobileMenu = document.getElementById("mobileMenu");
  const hamburger = document.querySelector(".hamburger");

  if (!mobileMenu || !hamburger) return;

  const clickedInsideMenu = mobileMenu.contains(event.target);
  const clickedHamburger = hamburger.contains(event.target);

  if (
    mobileMenu.classList.contains("open") &&
    !clickedInsideMenu &&
    !clickedHamburger
  ) {
    mobileMenu.classList.remove("open");
  }
});

/* Theme Button 
   Karena CSS sekarang sudah tema putih,
   tombol ini hanya mengubah ikon saja agar tidak merusak tampilan.
*/
function toggleMode() {
  const themeBtn = document.getElementById("themeBtn");

  if (!themeBtn) return;

  themeBtn.classList.toggle("active");
  themeBtn.textContent = themeBtn.classList.contains("active") ? "🎮" : "☀️";
}

/* Skill Bar Animation */
const skillsSection = document.getElementById("skills");

if (skillsSection) {
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const skillBars = entry.target.querySelectorAll(".skill-fill");

          skillBars.forEach((bar) => {
            const width = bar.dataset.w || 0;
            bar.style.transform = `scaleX(${width / 100})`;
          });
        }
      });
    },
    {
      threshold: 0.2
    }
  );

  skillObserver.observe(skillsSection);
}

/* Smooth Close Mobile Menu After Link Click */
const mobileLinks = document.querySelectorAll(".mobile-menu a");

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const mobileMenu = document.getElementById("mobileMenu");

    if (mobileMenu) {
      mobileMenu.classList.remove("open");
    }
  });
});

/* Contact Button Simulation */
function handleSend() {
  const sendBtn = document.getElementById("sendBtn");

  if (!sendBtn) return;

  const originalText = sendBtn.textContent;

  sendBtn.textContent = "Terkirim ✓";
  sendBtn.style.background = "#42d96b";
  sendBtn.style.color = "#ffffff";

  setTimeout(() => {
    sendBtn.textContent = originalText || "Kirim Pesan →";
    sendBtn.style.background = "";
    sendBtn.style.color = "";
  }, 3000);
}

/* Small Click Effect For Cartoon Game Feel */
document.querySelectorAll(".btn, .proj-btn, .contact-item").forEach((item) => {
  item.addEventListener("click", () => {
    item.style.transform = "translate(5px, 5px) scale(0.98)";

    setTimeout(() => {
      item.style.transform = "";
    }, 150);
  });
});

const backTop = document.getElementById("backTop");

window.addEventListener("scroll", () => {
  if (backTop) {
    backTop.classList.toggle("show", window.scrollY > 500);
  }
});

if (backTop) {
  backTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/* Typing Effect */
const typingText = document.getElementById("typingText");

if (typingText) {
  const words = [
    "building the web, securing the future",
    "creating playful digital experiences",
    "web developer & cyber security enthusiast"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentText = words[wordIndex];

    if (isDeleting) {
      typingText.textContent = currentText.substring(0, charIndex--);
    } else {
      typingText.textContent = currentText.substring(0, charIndex++);
    }

    if (!isDeleting && charIndex === currentText.length + 1) {
      isDeleting = true;
      setTimeout(typeEffect, 1200);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(typeEffect, isDeleting ? 45 : 80);
  }

  typeEffect();
}

/* AI Chatbot n8n */
const chatbotToggle = document.getElementById("chatbotToggle");
const chatbotWidget = document.getElementById("chatbotWidget");
const chatbotClose = document.getElementById("chatbotClose");
const chatbotForm = document.getElementById("chatbotForm");
const chatbotInput = document.getElementById("chatbotInput");
const chatbotMessages = document.getElementById("chatbotMessages");

const N8N_WEBHOOK_URL = "https://aprynsyah6446.app.n8n.cloud/webhook/portfolio-chatbot";

if (chatbotToggle && chatbotWidget) {
  chatbotToggle.addEventListener("click", () => {
    chatbotWidget.classList.toggle("open");
  });
}

if (chatbotClose && chatbotWidget) {
  chatbotClose.addEventListener("click", () => {
    chatbotWidget.classList.remove("open");
  });
}

function addChatMessage(message, sender = "bot") {
  if (!chatbotMessages) return;

  const messageElement = document.createElement("div");
  messageElement.className = sender === "user" ? "user-message" : "bot-message";
  messageElement.textContent = message;

  chatbotMessages.appendChild(messageElement);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

if (chatbotForm) {
  chatbotForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const message = chatbotInput.value.trim();

    if (!message) return;

    addChatMessage(message, "user");
    chatbotInput.value = "";

    addChatMessage("Sedang mengetik...", "bot");

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: message,
          source: "portfolio-website"
        })
      });

      const data = await response.json();

      const typingMessage = chatbotMessages.lastElementChild;
      if (typingMessage) typingMessage.remove();

      addChatMessage(data.reply || data.message || "Maaf, saya belum bisa menjawab pesan itu.", "bot");

    } catch (error) {
      const typingMessage = chatbotMessages.lastElementChild;
      if (typingMessage) typingMessage.remove();

      addChatMessage("Terjadi error saat menghubungi AI. Coba lagi nanti.", "bot");
      console.error("Chatbot error:", error);
    }
  });
}

function addChatMessage(message, sender = "bot") {
  if (!chatbotMessages) return;

  const messageElement = document.createElement("div");
  messageElement.className = sender === "user" ? "user-message" : "bot-message";
  messageElement.textContent = message;

  chatbotMessages.appendChild(messageElement);

  setTimeout(() => {
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }, 50);
}
