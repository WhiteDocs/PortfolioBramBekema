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

// Scroll naar boven bij refresh
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

// Emoji bounce -> pulse
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

console.log("Script geladen ✅");


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

  //alert("🎉 Easter Egg geactiveerd! Je bent een echte gamer 😎");
}

document.addEventListener('DOMContentLoaded', () => {
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
});


function triggerGlowPulse() {
  const hint = document.querySelector('.konami-hint');
  if (!hint) return;

  hint.classList.add('glow-pulse');

  // Verwijder na 2.5 seconden (zelfde als animatie in CSS)
  setTimeout(() => {
    hint.classList.remove('glow-pulse');
    scheduleNextGlow(); // Plan opnieuw
  }, 2500);
}

function scheduleNextGlow() {
  const delay = Math.random() * 55000 + 5000; // tussen 5 en 60 sec
  const totalSeconds = Math.floor(delay / 1000);
  const timerEl = document.getElementById('pulse-timer');

  if (!timerEl) return;

  let remainingSeconds = totalSeconds;

  // Toon eerste tijd meteen
  timerEl.textContent = `⏳ Glow-pulse over ${remainingSeconds} seconden`;

  // Zet een interval om elke seconde af te tellen
  const countdown = setInterval(() => {
    remainingSeconds--;
    timerEl.textContent = `⏳ Glow-pulse over ${remainingSeconds} seconden`;

    if (remainingSeconds <= 0) {
      clearInterval(countdown); // stop countdown
    }
  }, 1000);

  // Start de echte glow-pulse na het delay
  setTimeout(() => {
    triggerGlowPulse();
    clearInterval(countdown);
  }, delay);
}

document.addEventListener('DOMContentLoaded', () => {
  scheduleNextGlow(); // ← voeg deze toe
});






