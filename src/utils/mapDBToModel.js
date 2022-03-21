const mapGetAlbumSongsById = (rows) =>
  rows.reduce(
    (acc, curr) => {
      acc.id = curr.albumId;
      acc.name = curr.name;
      acc.year = curr.year;
      if (curr.songId) {
        acc.songs.push({ id: curr.songId, title: curr.title, performer: curr.performer });
      }
      return acc;
    },
    { id: null, name: null, year: null, songs: [] }
  );

const mapGetSongsFromPlaylistById = (rows) =>
  rows.reduce(
    (acc, curr) => {
      acc.id = curr.playlistId;
      acc.name = curr.name;
      acc.username = curr.username;
      if (curr.songId) {
        acc.songs.push({ id: curr.songId, title: curr.title, performer: curr.performer });
      }
      return acc;
    },
    { id: null, name: null, username: null, songs: [] }
  );

const mapGetPlaylistActivitiesById = (rows) =>
  rows.reduce(
    (acc, curr) => {
      acc.playlistId = curr.playlistId;
      if (curr.username) {
        acc.activities.push({ username: curr.username, title: curr.title, action: curr.action, time: curr.time });
      }
      return acc;
    },
    { playlistId: null, activities: [] }
  );

module.exports = { mapGetAlbumSongsById, mapGetSongsFromPlaylistById, mapGetPlaylistActivitiesById };
