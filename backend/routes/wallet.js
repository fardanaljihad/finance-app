const express = require('express');
const { createWallet, readWallets, updateWallet, deleteWallet } = require('../controllers/wallet');

const router = express.Router();

router.route('/:userId/wallets')
  .post(createWallet)
  .get(readWallets);
router.route('/:userId/wallets/:walletId')
  .put(updateWallet)
  .delete(deleteWallet);

module.exports = router;
