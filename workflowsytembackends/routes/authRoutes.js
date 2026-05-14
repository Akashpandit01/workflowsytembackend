const express =
  require("express")

const {
  body
} = require("express-validator")

const router =
  express.Router()

const {
  signup,
  login
} = require(
  "../controllers/authController"
)

const validationMiddleware =
  require(
    "../middleware/validationMiddleware"
  )

router.post(
  "/signup",

  [
    body("name")
      .notEmpty(),

    body("email")
      .isEmail(),

    body("password")
      .isLength({
        min: 6
      })
  ],

  validationMiddleware,

  signup
)

router.post(
  "/login",

  [
    body("email")
      .isEmail(),

    body("password")
      .notEmpty()
  ],

  validationMiddleware,

  login
)

module.exports = router