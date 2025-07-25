// spotify.js
// Volledige werkende Spotify integratie voor GitHub Pages zonder backend
// Gebruikt de Implicit Grant Flow + Spotify Web API JS wrapper

// Vul hieronder je eigen gegevens in:
const clientId = "78dc17ae73d34dc2bab020939e068e29";
const redirectUri = "https://whitedocs.github.io/PortfolioBramBekema/";
const scopes = ["user-read-recently-played"];

const loginButton = document.getElementById("spotify-login-btn");
const spotifyBlock = document.getElementById("spotify-block");

// Spotify SDK init
const spotifyApi = new SpotifyWebApi();

// --- Stap 1: Login knop toont als niet ingelogd ---
function showLoginButton() {
  loginButton.classList.remove("hidden");
  spotifyBlock.classList.add("opacity-0");
}

function hideLoginButton() {
  loginButton.classList.add("hidden");
  spotifyBlock.classList.remove("opacity-0");
}

function redirectToSpotifyAuth() {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${scopes.join("%20")}&show_dialog=true`;
  window.location.href = authUrl;
}

// --- Stap 2: Check access_token in URL ---
function getAccessTokenFromUrl() {
  const hash = window.location.hash;
  if (hash.includes("access_token")) {
    const params = new URLSearchParams(hash.substring(1));
    return params.get("access_token");
  }
  return null;
}

function loadSpotifyData(token) {
  spotifyApi.setAccessToken(token);
  spotifyApi.getMyRecentlyPlayedTracks({ limit: 1 })
    .then(function (data) {
      const track = data.items[0].track;
      document.getElementById("spotify-album").src = track.album.images[0].url;
      document.getElementById("spotify-title").textContent = track.name;
      document.getElementById("spotify-artist").textContent = track.artists.map(a => a.name).join(", ");
      hideLoginButton();
    })
    .catch(function (err) {
      console.error("Spotify API fout:", err);
      showLoginButton();
    });
}

// --- Stap 3: Init bij laden ---
document.addEventListener("DOMContentLoaded", () => {
  const token = getAccessTokenFromUrl();

  if (token) {
    localStorage.setItem("spotify_token", token);
    window.location.hash = ""; // verwijder access_token uit URL
    loadSpotifyData(token);
  } else {
    const savedToken = localStorage.getItem("spotify_token");
    if (savedToken) {
      loadSpotifyData(savedToken);
    } else {
      showLoginButton();
    }
  }
});

// --- Stap 4: Klik op login knop ---
if (loginButton) {
  loginButton.addEventListener("click", redirectToSpotifyAuth);
}
