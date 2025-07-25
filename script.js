// AOS initialiseren
AOS.init({
  duration: 800,
  once: true
});

// Emoji animaties (bounce → pulse)
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

// Scroll naar top bij refresh
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

console.log("Script geladen ✅");

// Easter Egg functie
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

// Konami-code detectie
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
  if (userInput.length > konamiCode.length) {
    userInput.shift();
  }

  if (JSON.stringify(userInput) === JSON.stringify(konamiCode)) {
    triggerEasterEgg();
  }
});

// Glow-pulse hint
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

  let remainingSeconds = totalSeconds;
  timerEl.textContent = `⏳ Glow-pulse over ${remainingSeconds} seconden`;

  const countdown = setInterval(() => {
    remainingSeconds--;
    timerEl.textContent = `⏳ Glow-pulse over ${remainingSeconds} seconden`;

    if (remainingSeconds <= 0) {
      clearInterval(countdown);
    }
  }, 1000);

  setTimeout(() => {
    triggerGlowPulse();
    clearInterval(countdown);
  }, delay);
}

document.addEventListener('DOMContentLoaded', () => {
  scheduleNextGlow();
});

const toggleBtn = document.getElementById('theme-toggle');

// Zet het juiste icoon bij laden
window.addEventListener('DOMContentLoaded', () => {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'dark') {
    document.documentElement.classList.add('dark');
    toggleBtn.textContent = '🌞';
  } else {
    toggleBtn.textContent = '🌙';
  }
});

// Wissel tussen licht/donker en update icoon + opslag
toggleBtn.addEventListener('click', () => {
  const root = document.documentElement;
  const isDark = root.classList.toggle('dark');
  toggleBtn.textContent = isDark ? '🌞' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});



