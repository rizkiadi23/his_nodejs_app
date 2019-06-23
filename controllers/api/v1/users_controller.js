const users_controller = require('express').Router()
const bcrypt = require('bcrypt')
const validation = require('../../../validations/user_validation')
const {
  User
} = require('../../../models')

/**
 * @params 
 * get all users in the system
 */
users_controller.get('/all', async (req, res) => {
  let users = await User.findAll({
    attributes: {
      exclude: ['password']
    }
  })

  if (users.length > 0) {
    res.json({
      success: true,
      data: users
    })
  } else {
    res.status(500).json({success:false, message: 'internal server error'})
  }
})

/**
 * @params user_id
 * endpoint to get user details by id
 */
users_controller.get('/:id', async (req, res) => {
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
 * @params firstname, lastname, pass, email
 * endpoint to create new user
 */
users_controller.post('/register', async (req, res) => {
  const {
    error
  } = validation.registerValidation(req.body);
  if (error) return res.status(400)
    .json({
      success: false,
      message: error.details[0].message
    })
  
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  User
    .findOrCreate({
      where: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword
      }
    })
    .then(([user, created]) => {
      if (created) {
        res.json({
          success: true,
          data: 'User created'
        })
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal Server Error'
        })
      }
    })
})

/**
 * @params id
 * endpoint to update user
 */
users_controller.patch('/:id/edit', async (req, res) => {
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
users_controller.delete('/:id/delete', async (req, res) => {
  const deleted_user = await User.destroy({
    where: {
      id: req.params.id
    }
  })

  deleted_user == 1 ? res.json({success:true, message: 'user deleted'}) : res.json({success:false, message: 'user no longer exists'})
})

module.exports = users_controller