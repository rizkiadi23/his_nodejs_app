const users_controller = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validation = require('../../../validations/user_validation')
const {
  User
} = require('../../../models')
const verifyToken = require('../../../middlewares/token_verificaton')

/**
 * @params 
 * get all users in the system
 */
users_controller.get('/all', verifyToken, async (req, res) => {
  let users = await User.findAll({
    attributes: {
      exclude: ['password']
    }
  })

  try {
    res.json({
      success: true,
      data: users
    })
  } catch (err) {
    res.status(500).json({ success: false, message: err })
  }
})

/**
 * @params user_id
 * endpoint to get user details by id
 */
users_controller.get('/:id', verifyToken, async (req, res) => {
  let user = await User.findAll({
    attributes: {
      exclude: ['password']
    },
    where: {
      id: req.params.id
    }
  });

  if (user.length == 0) {
    res.status(404).json({
      success: false,
      message: 'User not found'
    })
  } else {
    res.json({
      success: true,
      data: user[0]
    })
  }
})

/**
 * @params id
 * endpoint to update user
 */
users_controller.patch('/:id/edit', verifyToken, async (req, res) => {
  const updated_user = await User.update(req.body, {
    where: {
      id: req.params.id
    }
  })

  updated_user[0] > 0 ? res.json({success: true, message: 'user updated'}) : res.status(500).json({success: false, message: 'Internal Server Error'})
})

/**
 * @params id
 * endpoint to delete new user
 */
users_controller.delete('/:id/delete', verifyToken, async (req, res) => {
  const deleted_user = await User.destroy({
    where: {
      id: req.params.id
    }
  })

  deleted_user == 1 ? res.json({success:true, message: 'user deleted'}) : res.json({success:false, message: 'user no longer exists'})
})

/**
 * @params firstname, lastname, pass, email
 * endpoint to create new user
 */
users_controller.post('/register', async (req, res) => {  
  const { error } = validation.registerValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // Checking if the user is already in the database
  let emailExist = await User.findAll({ where: { email: req.body.email }})
  if (emailExist.length) 
    return res.status(400)
              .json({success: false, message: 'Email already taken'})

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  try {
    const new_user = await User.findOrCreate({
      where: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword
      }
    })

    new_user[1] == true ? res.json({ success: true, data: 'User created' }) : res.status(500).json({ success: false, message: 'Internal Server Error' })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err
    })
  }
})

/**
 * @params email and password
 * endpoint to login
 */
users_controller.post('/login', async (req, res) => {
  const user = {
    email: req.body.email
  }

  let registered_user = await User.findAll({ where: { email: req.body.email }})
  if (!registered_user.length) return res.status(404).json({success: false, message: 'User not found'})

  bcrypt.compare(req.body.password, registered_user[0].password, (err, isMatch) => {
    if (err) return res.status(500).json({success: false, message: 'Internal Server Error'})

    if (isMatch) {
      jwt.sign(user, 'secretkey', { expiresIn: '1h' }, (err, token) => {
        res.json({
          success: true,
          message: 'User successfully logged in',
          token: token
        })
      })
    }
  })
})

module.exports = users_controller