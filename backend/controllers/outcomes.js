const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createOutcome = async (req, res) => {
  const { userId } = req.params;
  const { name, amount, date, walletId, categoryId } = req.body;

  console.log(name, amount, date, walletId, categoryId, userId);

  if (!(name && amount && date && userId && walletId && categoryId)) {
    return res
      .status(400)
      .json({ success: false, message: 'Please ensure all fields are filled' });
  }
  const outcome = await prisma.outcome.create({
    data: {
      name: name,
      amount: amount,
      date: new Date(date),
      userId: Number(userId),
      walletId: walletId,
      categoryId: categoryId
    }
  })
  res.status(200).json({ success: true, result: outcome });
}

const readOutcomes = async (req, res) => {
  const outcomes = await prisma.outcome.findMany({
    where: {
      userId: Number(req.params.userId)
    },
    include: {
      wallet: {
        select: {
          name: true
        }
      },
      category: {
        select: {
          name: true
        }
      }
    }
  })
  res.status(200).json({ success: true, result: outcomes });
}

const updateOutcome = async (req, res) => {
  const { outcomeId } = req.params;
  const { name, amount, date, walletId, categoryId } = req.body;

  const oldOutcome = await prisma.outcome.findFirst({
    where: {
      id: Number(outcomeId)
    }
  })
  if (!oldOutcome) {
    return res
      .status(404)
      .json({ success: false, message: `No outcome with id ${outcomeId}` });
  }
  const newOutcome = await prisma.outcome.update({
    where: {
      id: Number(outcomeId)
    },
    data: {
      name: name,
      amount: amount,
      date: new Date(date),
      walletId: walletId,
      categoryId: categoryId
    }
  })
  res.status(200).json({ success: true, result: newOutcome });
}

const deleteOutcome = async (req, res) => {
  const outcome = await prisma.outcome.findFirst({
    where: {
      id: Number(req.params.outcomeId)
    }
  })
  if (!outcome) {
    return res
      .status(404)
      .json({ success: false, message: `No outcome with id ${req.params.outcomeId}` });
  }
  const deletedOutcome = await prisma.outcome.delete({
    where: {
      id: Number(req.params.outcomeId)
    }
  })
  res.status(200).json({ success: true, message: 'Outcome deleted successfully', deletedOutcome});
}

module.exports = {
  createOutcome,
  readOutcomes,
  updateOutcome,
  deleteOutcome
}
