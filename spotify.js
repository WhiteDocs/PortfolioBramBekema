// spotify.js
// Volledig werkende Spotify integratie voor GitHub Pages (client-only)

// >>> Vul je eigen gegevens hieronder in <<<
const clientId = "78dc17ae73d34dc2bab020939e068e29";
const redirectUri = "https://whitedocs.github.io/PortfolioBramBekema/";
const scopes = ["user-read-recently-played"];

// UI-elementen
const loginButton = document.getElementById("spotify-login-btn");
const spotifyBlock = document.getElementById("spotify-block");
const albumImg = document.getElementById("spotify-album");
const titleEl = document.getElementById("spotify-title");
const artistEl = document.getElementById("spotify-artist");

// Spotify SDK
const spotifyApi = new SpotifyWebApi();

// --- Login Knop ---
function showLoginButton() {
  loginButton?.classList.remove("hidden");
  spotifyBlock?.classList.add("opacity-0");
}

function hideLoginButton() {
  loginButton?.classList.add("hidden");
  spotifyBlock?.classList.remove("opacity-0");
}

function redirectToSpotifyAuth() {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${scopes.join("%20")}&show_dialog=true`;
  window.location.href = authUrl;
}

// --- Token ophalen uit URL ---
function getAccessTokenFromUrl() {
  const hash = window.location.hash;
  if (hash.includes("access_token")) {
    const params = new URLSearchParams(hash.substring(1));
    return params.get("access_token");
  }
  return null;
}

// --- Data ophalen uit Spotify API ---
function loadSpotifyData(token) {
  spotifyApi.setAccessToken(token);

  spotifyApi.getMyRecentlyPlayedTracks({ limit: 1 })
    .then(data => {
      if (!data.items.length) {
        console.warn("Geen recent beluisterde nummers gevonden.");
        showLoginButton();
        return;
      }

      const track = data.items[0].track;
      albumImg.src = track.album.images[0].url;
      titleEl.textContent = track.name;
      artistEl.textContent = track.artists.map(a => a.name).join(", ");
      hideLoginButton();
    })
    .catch(err => {
      console.error("❌ Spotify API error:", err);
      showLoginButton();
    });
}

// --- Init ---
document.addEventListener("DOMContentLoaded", () => {
  const token = getAccessTokenFromUrl();

  if (token) {
    localStorage.setItem("spotify_token", token);
    window.location.hash = ""; // Verwijder token uit URL
    loadSpotifyData(token);
  } else {
    const savedToken = localStorage.getItem("spotify_token");
    if (savedToken) {
      loadSpotifyData(savedToken);
    } else {
      showLoginButton();
    }
  }

  // Login knop listener
  loginButton?.addEventListener("click", redirectToSpotifyAuth);
});
