const logger = require('../utils/winston');

function snakeInfo(req, res) {
  res.json(
    {
      apiversion: '1',
      author: 'jeffinnes',
      color: '#009973',
      head: 'gamer',
      tail: 'pixel',
      version: '0.0.1',
    },
  );
}

function start(req) {
  logger.info(`STARTING match! Match ID: ${req.body.game.id}`);
  logger.info(req.body);
}

function end(req) {
  logger.info(`Match ENDED! Match ID: ${req.body.game.id}`);
  logger.info(req.body);
}

module.exports = {
  snakeInfo,
  start,
  end,
};
