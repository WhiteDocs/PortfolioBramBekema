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


////////////////////////////////

const clientId = "78dc17ae73d34dc2bab020939e068e29"; // jouw clientId
const redirectUri = "https://whitedocs.github.io/PortfolioBramBekema/";
const scopes = ["user-read-recently-played"];

document.getElementById("login-btn").addEventListener("click", () => {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scopes.join('%20')}`;
  window.location.href = authUrl;
});

window.addEventListener("load", () => {
  const hash = window.location.hash;
  if (hash) {
    const token = new URLSearchParams(hash.substring(1)).get("access_token");
    if (token) {
      fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          const track = data.items[0].track;
          const output = document.getElementById("spotify-output");
          const block = document.getElementById("spotify-block");
          const album = document.getElementById("spotify-album");
          const title = document.getElementById("spotify-title");
          const artist = document.getElementById("spotify-artist");

          album.src = track.album.images[0].url;
          title.textContent = track.name;
          artist.textContent = track.artists.map(a => a.name).join(", ");
          block.classList.remove("opacity-0");

        })
        .catch(err => {
          console.error("Spotify API error:", err);
          document.getElementById("spotify-output").textContent = "❌ Kan Spotify-gegevens niet ophalen.";
        });
    }
  }
});






