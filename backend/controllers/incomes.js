const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createIncome = async (req, res) => {
  const { userId } = req.params;
  const { name, amount, date, walletId } = req.body;

  if (!(name && amount && date && userId && walletId)) {
    return res
      .status(400)
      .json({ success: false, message: 'Please ensure all fields are filled' });
  }
  const income = await prisma.income.create({
    data: {
      name: name,
      amount: amount,
      date: new Date(date),
      userId: Number(userId),
      walletId: walletId
    }
  })
  res.status(200).json({ success: true, result: income });
}

const readIncomes = async (req, res) => {
  const incomes = await prisma.income.findMany({
    where: {
      userId: Number(req.params.userId)
    },
    include: {
      wallet: {
        select: {
          name: true
        }
      }
    }
  })
  res.status(200).json({ success: true, result: incomes })
}

const updateIncome = async (req, res) => {
  const {name, amount, date, walletId} = req.body;

  const oldIncome = await prisma.income.findFirst({
    where: {
      id: Number(req.params.incomeId)
    }
  })
  if (!oldIncome) {
    return res
      .status(404)
      .json({ success: false, message: `No income with id ${req.params.incomeId}` });
  }
  const newIncome = await prisma.income.update({
    where: {
      id: Number(req.params.incomeId)
    },
    data: {
      name: name,
      amount: amount,
      date: new Date(date),
      walletId: walletId
    }
  })
  res.status(200).json({ success: true, result: newIncome });
}

const deleteIncome = async (req, res) => {
  const income = await prisma.income.findFirst({
    where: {
      id: Number(req.params.incomeId)
    }
  })
  if (!income) {
    return res
      .status(404)
      .json({ success: false, message: `No income with id ${req.params.incomeId}`});
  }
  const deletedIncome = await prisma.income.delete({
    where: {
      id: Number(req.params.incomeId)
    }
  })
  res.status(200).json({ success: true, message: 'Income deleted successfully', deletedIncome });
}

module.exports = {
  createIncome,
  readIncomes,
  updateIncome,
  deleteIncome
}
