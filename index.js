// const express = require('express');
// const bodyParser = require('body-parser');
// const dotenv = require('dotenv');
// const Pusher = require('pusher');

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// const pusher = new Pusher({
//   appId: "1586820",
//   key: "e2740918c0fa18dc39a6",
//   secret: "6279f5af5a49568dfc10",
//   cluster: "ap2",
//   useTLS: true
// });

// app.post('/pusher/auth', (req, res) => {
//   const socketId = req.body.socket_id;
//   const channel = req.body.channel_name;
//   const auth = pusher.authenticate(socketId, channel);
//   res.send(auth);
// });

// app.post('/messages', (req, res) => {
//   const message = req.body.message;
//   const user = req.body.user;
//   pusher.trigger('private-chat', 'message', { message, user });
//   res.send('Message sent');
// });

// app.use(express.static('public'));

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// app.listen(port, () => console.log(`Server listening on port ${port}`));

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const Pusher = require('pusher');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const pusher = new Pusher({
  appId: "1586820",
  key: "e2740918c0fa18dc39a6",
  secret: "6279f5af5a49568dfc10",
  cluster: "ap2",
  useTLS: true
});

app.post('/pusher/auth', (req, res) => {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  const auth = pusher.authenticate(socketId, channel);
  res.send(auth);
});

app.post('/messages', (req, res) => {
  const message = req.body.message;
  const user = req.body.user;
  const recipient = req.body.recipient;
  if (recipient) {
    pusher.trigger(`private-chat-${recipient}`, 'message', { message, user });
  } else {
    pusher.trigger('private-chat', 'message', { message, user });
  }
  res.send('Message sent');
});

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
