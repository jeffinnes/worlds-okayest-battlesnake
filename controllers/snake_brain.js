const logger = require('../utils/winston');

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

  // Don't fold my head inside out or bite my body
  my.body.forEach((bodyPart) => {
    if (my.head.y < bodyPart.y) {
      // Up
      possibleMoves[0].safe = false;
    }

    if (my.head.y > bodyPart.y) {
      // Down
      possibleMoves[1].safe = false;
    }

    if (my.head.x > bodyPart.x) {
      // Left
      possibleMoves[2].safe = false;
    }

    if (my.head.x < bodyPart.x) {
      // Right
      possibleMoves[3].safe = false;
    }
  });

  /**
   * These two work this way because if the head is at one edge
   * it cannot possibly be at the other edge too.
   * (But could be in a corner which is why I check x and y on every turn)
   * If this ever changes we will need to check all four ever time.
   */

  // Don't leave the board through the top or bottom. It's death out there.
  if (my.head.y === (board.height - 1)) {
    possibleMoves[0].safe = false;
  } else if (my.head.y === 0) {
    possibleMoves[1].safe = false;
  }

  // Don't leave the board through the left or right. It's death out there.
  if (my.head.x === 0) {
    possibleMoves[2].safe = false;
  } else if (my.head.x === (board.width - 1)) {
    possibleMoves[3].safe = false;
  }

  const safeMoves = possibleMoves.filter((possibleMove) => possibleMove.safe);

  const i = Math.floor(Math.random() * safeMoves.length);
  logger.info(JSON.stringify(my));
  logger.info(JSON.stringify(board));
  logger.info(`GameID: ${game.id} | Turn: ${turn} | Moved ${safeMoves[i].move}`);

  res.json({
    move: safeMoves[i].move,
  });
}

module.exports = { move };
