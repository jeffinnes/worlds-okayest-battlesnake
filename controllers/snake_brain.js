const { logger } = require('../utils/winston');

function move(req, res) {
  const possibleMoves = [
    {
      move: 'up',
      safe: true,
    },
    {
      move: 'down',
      safe: true,
    },
    {
      move: 'left',
      safe: true,
    },
    {
      move: 'right',
      safe: true,
    },
  ];

  const my = req.body.you;
  const { game, turn, board } = req.body;

  // Don't fold my head inside out
  if (my.head.y < my.body[1].y) {
    possibleMoves[0].safe = false;
  } else if (my.head.y > my.body[1].y) {
    possibleMoves[1].safe = false;
  } else if (my.head.x > my.body[1].x) {
    possibleMoves[2].safe = false;
  } else {
    possibleMoves[3].safe = false;
  }

  const safeMoves = possibleMoves.filter((possibleMove) => possibleMove.safe);

  const i = Math.floor(Math.random() * safeMoves.length);
  logger.info(`GameID: ${game.id} | Turn: ${turn} | Moved ${safeMoves[i].move}`);

  res.json({
    move: safeMoves[i].move,
  });
}

module.exports = { move };
