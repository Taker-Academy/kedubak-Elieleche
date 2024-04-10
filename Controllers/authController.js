const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./config');

exports.register = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = jwt.sign({ email }, config.jwtSecret, { expiresIn: '24h' });
    res.status(201).json({
      ok: true,
      data: {
        token,
        user: {
          email,
          firstName,
          lastName,
        },
      },
    });
  } catch (error) {
    console.error('Erreur ', error);
    res.status(500).json({ ok: false, message: 'Erreur' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ ok: false, message: 'Mauvais identifiants' });
    }

    const token = jwt.sign({ email }, config.jwtSecret, { expiresIn: '24h' });

    res.status(200).json({
      ok: true,
      data: {
        token,
        user: {
          email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      },
    });
  } catch (error) {
    console.error('Erreur lors de la connexion : ', error);
    res.status(500).json({ ok: false, message: 'Erreur lors de la connexion' });
  }
};
