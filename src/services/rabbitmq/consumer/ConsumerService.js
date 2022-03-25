require('dotenv').config();
const amqp = require('amqplib');

const Listener = require('./listener');
const MailSender = require('../../mail/MailSender');
const PlaylistsService = require('../../postgresql/PlaylistsService');

const playlistsService = new PlaylistsService();
const mailSender = new MailSender();
const listener = new Listener(playlistsService, mailSender);

class Consumer {
  // declaring the following two variables is optional
  _connection;

  _channel;

  static async init() {
    this._connection = await amqp.connect(process.env.RABBITMQ_SERVER);
    this._channel = await this._connection.createChannel();

    await this._channel.assertQueue('export:playlist', {
      durable: true,
    });

    await this._channel.consume('export:playlist', listener.listenToExportPlaylist, { noAck: true });

    console.log('[x] Start listening...');
    console.log('Press CTRL + C to exit.');
  }
}

Consumer.init();
