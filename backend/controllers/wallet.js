const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createWallet = async (req, res) => {
  const { userId } = req.params;
  const { name, balance } = req.body;

  if (!(name && balance)) {
    return res
      .status(400)
      .json({ success: false, message: 'Please ensure all fields are filled' });
  }
  const wallet = await prisma.wallet.create({
    data: {
      name: name,
      balance: balance,
      userId: Number(userId)
    }
  })
  res.status(200).json({ success: true, result: wallet });
}

const readWallets = async (req, res) => {
  const wallets = await prisma.wallet.findMany({
    where: {
      userId: Number(req.params.userId)
    }
  })
  res.status(200).json({ success: true, result: wallets });
}

const updateWallet = async (req, res) => {
  const { name, balance } = req.body;
  const oldWallet = await prisma.wallet.findFirst({
    where: {
      id: Number(req.params.walletId)
    }
  })
  if (!oldWallet) {
    return res
      .status(404)
      .json({ success: false, message: `No wallet with id ${req.params.walletId}`});
  }
  const newWallet = await prisma.wallet.update({
    where: {
      id: Number(req.params.walletId)
    },
    data: {
      name: name,
      balance: balance
    }
  })
  res.status(200).json({ success: true, result: newWallet });
}

const deleteWallet = async (req, res) => {
  const wallet = await prisma.wallet.findFirst({
    where: {
      id: Number(req.params.walletId)
    }
  })
  if (!wallet) {
    return res
      .status(404)
      .json({ success: false, message: `No wallet with id ${req.params.walletId}`});
  }
  const deletedWallet = await prisma.wallet.delete({
    where: {
      id: Number(req.params.walletId)
    }
  })
  res.status(200).json({ success: true, message: 'Wallet deleted successfully', deletedWallet });
}

module.exports = {
  createWallet,
  readWallets,
  updateWallet,
  deleteWallet
}
