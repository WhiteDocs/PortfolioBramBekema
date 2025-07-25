// 🔹 AOS initialiseren
AOS.init({
  duration: 800,
  once: true,
});

// 🔹 Emoji animaties (bounce -> pulse)
document.querySelectorAll(".group").forEach(group => {
  const emojis = group.querySelectorAll(".combo-emoji");

  group.addEventListener("mouseenter", () => {
    emojis.forEach(emoji => {
      emoji.classList.remove("pulse-forever");
      emoji.classList.add("bounce-once");

      emoji.addEventListener("animationend", () => {
        emoji.classList.remove("bounce-once");
        emoji.classList.add("pulse-forever");
      }, { once: true });
    });
  });

  group.addEventListener("mouseleave", () => {
    emojis.forEach(emoji => emoji.classList.remove("pulse-forever"));
  });
});

// 🔹 Scroll naar top bij refresh
window.onbeforeunload = () => {
  window.scrollTo(0, 0);
};

// 🔹 Easter Egg functie
function triggerEasterEgg() {
  const profileImg = document.querySelector('img[alt="Bram Bekema"]');

  if (profileImg) {
    profileImg.src = 'https://media.tenor.com/DpJdyKQKgYkAAAAi/cat-jump.gif';
    profileImg.classList.add('ring-4', 'ring-pink-500', 'animate-pulse');

    setTimeout(() => {
      profileImg.src = './IMG_2948.jpg';
      profileImg.classList.remove('ring-4', 'ring-pink-500', 'animate-pulse');
    }, 60000);
  }
}

// 🔹 Konami-code detectie
const konamiCode = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a'
];
let userInput = [];

document.addEventListener('keydown', (e) => {
  userInput.push(e.key);
  if (userInput.length > konamiCode.length) userInput.shift();

  if (JSON.stringify(userInput) === JSON.stringify(konamiCode)) {
    triggerEasterEgg();
  }
});

// 🔹 Glow-pulse hint & countdown
function triggerGlowPulse() {
  const hint = document.querySelector('.konami-hint');
  if (!hint) return;

  hint.classList.add('glow-pulse');

  setTimeout(() => {
    hint.classList.remove('glow-pulse');
    scheduleNextGlow();
  }, 2500);
}

function scheduleNextGlow() {
  const delay = Math.random() * 55000 + 5000;
  const totalSeconds = Math.floor(delay / 1000);
  const timerEl = document.getElementById('pulse-timer');
  if (!timerEl) return;

  let remaining = totalSeconds;
  timerEl.textContent = `⏳ Glow-pulse over ${remaining} seconden`;

  const countdown = setInterval(() => {
    remaining--;
    timerEl.textContent = `⏳ Glow-pulse over ${remaining} seconden`;

    if (remaining <= 0) clearInterval(countdown);
  }, 1000);

  setTimeout(() => {
    triggerGlowPulse();
    clearInterval(countdown);
  }, delay);
}

// 🔹 Dark Mode & Mobile Menu + Highlight Scroll Effect
document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const menuBtn = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  // ➤ Zet dark mode bij laden als opgeslagen
  if (localStorage.getItem('theme') === 'dark') {
    root.classList.add('dark');
  }

  // ➤ Hamburger menu toggle
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // ➤ Dark mode toggle buttons (desktop en mobiel)
  ['theme-toggle', 'theme-toggle-mobile'].forEach(id => {
    const btn = document.getElementById(id);
    if (!btn) return;

    btn.textContent = root.classList.contains('dark') ? '🌞' : '🌙';

    btn.addEventListener('click', () => {
      const isDark = root.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      document.querySelectorAll('#theme-toggle, #theme-toggle-mobile').forEach(b => {
        b.textContent = isDark ? '🌞' : '🌙';
      });
    });
  });

  // ➤ Smooth scroll highlight effect op meerdere elementen
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetID = this.getAttribute("href").substring(1);
      const section = document.getElementById(targetID);
      const highlightElements = section?.querySelectorAll("[data-highlight]") || [];

      if (highlightElements.length > 0) {
        setTimeout(() => {
          highlightElements.forEach(el => el.classList.add("highlight-section"));
          setTimeout(() => {
            highlightElements.forEach(el => el.classList.remove("highlight-section"));
          }, 2000);
        }, 400);
      }

      // Sluit mobiel menu automatisch bij klik
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
      }
    });
  });

  // Start glow timer
  scheduleNextGlow();
});

console.log("✅ script.js geladen");
