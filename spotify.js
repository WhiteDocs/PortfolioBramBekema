const clientId = "78dc17ae73d34dc2bab020939e068e29"; // jouw echte clientId
const redirectUri = "https://whitedocs.github.io/PortfolioBramBekema/";
const scopes = ["user-read-recently-played"];

const spotifyApi = new SpotifyWebApi();

// Check of er een access token in localStorage zit
const storedToken = localStorage.getItem("spotify_token");

// Als token al bestaat → gebruik het direct
if (storedToken) {
    fetchLatestTrack(storedToken);
} else {
    // Anders: toon login knop
    document.getElementById("spotify-login-btn").classList.remove("hidden");
    document.getElementById("spotify-login-btn").addEventListener("click", () => {
        const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scopes.join("%20")}&show_dialog=true`;
        window.location.href = authUrl;
    });
}

// Als we terugkomen van Spotify login met een token in de URL
window.addEventListener("load", () => {
    const hash = window.location.hash;
    if (hash.includes("access_token")) {
        const token = new URLSearchParams(hash.substring(1)).get("access_token");
        localStorage.setItem("spotify_token", token);
        // Verwijder de hash uit de URL
        history.replaceState(null, null, window.location.pathname);
        fetchLatestTrack(token);
    }
});

function fetchLatestTrack(token) {
    spotifyApi.setAccessToken(token);
    spotifyApi.getMyRecentlyPlayedTracks({ limit: 1 }).then(response => {
        const track = response.items[0].track;
        document.getElementById("spotify-title").textContent = track.name;
        document.getElementById("spotify-artist").textContent = track.artists.map(a => a.name).join(", ");
        document.getElementById("spotify-album").src = track.album.images[0].url;
        document.getElementById("spotify-block").classList.remove("opacity-0");
        document.getElementById("spotify-login-btn").classList.add("hidden");
    }).catch(err => {
        console.error("Fout bij ophalen Spotify data", err);
        document.getElementById("spotify-title").textContent = "❌ Spotify fout";
    });
}
