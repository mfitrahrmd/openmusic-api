class Listener {
  constructor(playlistsService, mailSender) {
    this._playlistsService = playlistsService;
    this._mailSender = mailSender;

    this.listenToExportPlaylist = this.listenToExportPlaylist.bind(this);
  }

  async listenToExportPlaylist(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());

      const playlistData = await this._playlistsService.getPlaylistById(playlistId);

      const playlist = { playlist: playlistData };

      console.log(playlist);

      await this._mailSender.sendMail(targetEmail, JSON.stringify(playlist));
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
