const express = require('express');
const { snakeInfo, start, end } = require('../controllers/game_controls');
const { move } = require('../controllers/snake_brain');

const router = express.Router();

/* Get Battlesnake */
router.get('/', snakeInfo);

/* Start Match Notificaiton */
router.post('/start', start);

/* Move Snake */
router.post('/move', move);

/* End Match Notification */
router.post('/end', end);

module.exports = router;
