const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createUser = async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: req.body.password
      }
    })
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Username has been taken' });
  }
}

const updateUser = async  (req, res) => {
  try {
    const newPassword = req.body.password;

    if (!newPassword) {
      return res.status(401).json({ success: true, msg: 'Please provide password value' })
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: Number(req.params.id)
      },
      data: {
        password: req.body.password
      }
    })
    res.status(201).json({ success: true, data: updatedUser });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Password failed to change' });
  }
}

module.exports = {
  createUser,
  updateUser
}
