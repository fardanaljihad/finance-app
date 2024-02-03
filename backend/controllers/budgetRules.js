const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createBudgetRule = async (req, res) => {
  const { userId } = req.params;
  const { name, percentage } = req.body;

  if (!(name && percentage)) {
    return res
      .status(400)
      .json({ success: false, message: 'Please ensure all fields are filled' });
  }
  const budgetRule = await prisma.budgetRule.create({
    data: {
      name: name,
      percentage: percentage,
      userId: Number(userId)
    }
  })
  res.status(200).json({ success: true, result: budgetRule });
}

const readbudgetRules = async (req, res) => {
  const budgetRules = await prisma.budgetRule.findMany({
    where: {
      userId: Number(req.params.userId)
    }
  })
  res.status(200).json({ success: true, result: budgetRules });
}

const updatebudgetRule = async (req, res) => {
  const { name, percentage } = req.body;
  const oldbudgetRule = await prisma.budgetRule.findFirst({
    where: {
      id: Number(req.params.budgetRuleId)
    }
  })
  if (!oldbudgetRule) {
    return res
      .status(404)
      .json({ success: false, message: `No budget rule with id ${req.params.budgetRuleId}`});
  }
  const newbudgetRule = await prisma.budgetRule.update({
    where: {
      id: Number(req.params.budgetRuleId)
    },
    data: {
      name: name,
      percentage: percentage
    }
  })
  res.status(200).json({ success: true, result: newbudgetRule });
}

const deletebudgetRule = async (req, res) => {
  const budgetRule = await prisma.budgetRule.findFirst({
    where: {
      id: Number(req.params.budgetRuleId)
    }
  })
  if (!budgetRule) {
    return res
      .status(404)
      .json({ success: false, message: `No budget rule with id ${req.params.budgetRuleId}`});
  }
  const deletedbudgetRule = await prisma.budgetRule.delete({
    where: {
      id: Number(req.params.budgetRuleId)
    }
  })
  res.status(200).json({ success: true, message: 'budget rule deleted successfully', deletedbudgetRule });
}

module.exports = {
  createBudgetRule,
  readbudgetRules,
  updatebudgetRule,
  deletebudgetRule
}
