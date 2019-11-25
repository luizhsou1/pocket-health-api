const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200);
  res.json({ 'Mensagem': 'Bem vindo a API do Pocket' });
});

// stormtroopers
router.use('/users', require('./users'));

module.exports = router;
