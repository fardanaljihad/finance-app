const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createCategory = async (req, res) => {
  const { walletId } = req.params;
  const { name, budget } = req.body;

  if (!(name && budget)) {
    return res
      .status(400)
      .json({ success: false, message: 'Please ensure all fields are filled' });
  }
  const category = await prisma.category.create({
    data: {
      name: name,
      budget: budget,
      walletId: Number(walletId)
    }
  })
  res.status(200).json({ success: true, result: category });
}

const readCategories = async (req, res) => {
  const arrBudgetRuleId = await prisma.budgetRule.findMany({
    where: {
      userId: Number(req.params.userId)
    },
    select: {
      id: true
    }
  })
  console.log(arrBudgetRuleId);
  let categories = [];
  for (let i = 0; i < arrBudgetRuleId.length; i++) {
    let category = await prisma.category.findMany({
      where: {
        budgetRuleId: arrBudgetRuleId[i].id
      }
    })
    categories.push(category);
  }
  res.status(200).json({ success: true, result: categories });
}

const updateCategory = async (req, res) => {
  const { name, budget } = req.body;
  const oldCategory = await prisma.category.findFirst({
    where: {
      id: Number(req.params.categoryId)
    }
  })
  if (!oldCategory) {
    return res
      .status(404)
      .json({ success: false, message: `No category with id ${req.params.categoryId}`});
  }
  const newCategory = await prisma.category.update({
    where: {
      id: Number(req.params.categoryId)
    },
    data: {
      name: name,
      budget: budget
    }
  })
  res.status(200).json({ success: true, result: newCategory });
}

const deleteCategory = async (req, res) => {
  const category = await prisma.category.findFirst({
    where: {
      id: Number(req.params.categoryId)
    }
  })
  if (!category) {
    return res
      .status(404)
      .json({ success: false, message: `No category with id ${req.params.CategoryId}`});
  }
  const deletedCategory = await prisma.category.delete({
    where: {
      id: Number(req.params.CategoryId)
    }
  })
  res.status(200).json({ success: true, message: 'Category deleted successfully', deletedCategory });
}

module.exports = {
  createCategory,
  readCategories,
  updateCategory,
  deleteCategory
}
