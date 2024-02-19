const prisma = require("../config/prisma")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const register = async (req, res) => {
  // #swagger.tags = ['Auth']
  const { username, email, password } = req.body;
  // Check if the user already exists
  const user = await prisma.user.findFirst({
    where: {
      username
    }
  })
  if (user) {
    return res.status(409).json({ message: 'User already exists' });
  }  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  // kode save user disini
  await prisma.user.create({
    data: {
      username, email, password: hashedPassword
    }
  })
  
  res.status(201).json({ message: 'User registered successfully' });
}

const login = async (req, res) => {
  // #swagger.tags = ['Auth']
  const { username, password } = req.body;
  const user = await prisma.user.findFirst({
    where: {
      username
    }
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const payload = { username: user.username, id: user.id }
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
  res.json({ accessToken });
}


module.exports = {register, login}

