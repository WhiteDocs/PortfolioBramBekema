const clientId = '78dc17ae73d34dc2bab020939e068e29';
const redirectUri = 'https://whitedocs.github.io/PortfolioBramBekema/';
const scopes = ['user-read-recently-played'];
const spotifyApi = new SpotifyWebApi();

document.getElementById('spotify-login-btn').addEventListener('click', () => {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scopes.join('%20')}&show_dialog=true`;
  window.location.href = authUrl;
});

window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash;

  if (hash.includes('access_token')) {
    const token = new URLSearchParams(hash.substring(1)).get('access_token');
    localStorage.setItem('spotify_token', token);
    window.history.replaceState(null, null, window.location.pathname);
  }

  const token = localStorage.getItem('spotify_token');
  if (!token) return;

  spotifyApi.setAccessToken(token);
  spotifyApi.getMyRecentlyPlayedTracks({ limit: 1 })
    .then(data => {
      const track = data.items[0].track;
      document.getElementById('spotify-album').src = track.album.images[0].url;
      document.getElementById('spotify-title').textContent = track.name;
      document.getElementById('spotify-artist').textContent = track.artists.map(a => a.name).join(', ');
      document.getElementById('spotify-block').classList.remove('opacity-0');
      document.getElementById('spotify-login-btn').remove();
    })
    .catch(err => {
      console.error('Spotify error:', err);
    });
});
