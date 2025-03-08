import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
window.Pusher = Pusher;

const laravelEcho = new Echo({
    broadcaster: 'pusher',
    key: 'cdbc9f9c829f8381a3f5',
    wsHost: "openheartsbackend.testingwebsitelink.com",
    wssPort: 6777,
    forceTLS: true,
    disableStats: true,
    cluster: 'us2',
    enabledTransports: ['ws', 'wss'],
  });

  export default laravelEcho;