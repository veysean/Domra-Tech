import { validationResult, body } from 'express-validator';

// A reusable middleware function to check for validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  // Map the errors into a clean key-value pair
  const extractedErrors = errors.array().reduce((acc, err) => {
    acc[err.param || 'general'] = err.msg;
    return acc;
  }, {});

  return res.status(400).json({
    errors: extractedErrors,
  });
};

// Validation rules for a 'create user' request
const registerValidationRules = () => {
  return [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ];
};

// Validation rules for user login (supports Google ID)
const loginValidationRules = () => {
  return [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').custom((value, { req }) => {
      if (!req.body.password && !req.body.googleId) {
        throw new Error('Either a password or googleId is required for login');
      }
      return true;
    }),
  ];
};


export default {validate, registerValidationRules, loginValidationRules};
