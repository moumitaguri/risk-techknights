const getCurrentGame = function (req) {
  const gameId = req.cookies.game;
  const runningGames = req.app.games;
  const currentGame = runningGames.getGame(gameId);
  return currentGame;
};

const isCurrentPlayer = function (req) {
  const currentGame = getCurrentGame(req);
  const currentPlayer = currentGame.getCurrentPlayer();
  const playerId = req.cookies.playerId;
  return currentPlayer.id == playerId;
};

module.exports = {
  getCurrentGame,
  isCurrentPlayer
}