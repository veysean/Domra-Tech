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
    body('email').isEmail().withMessage('Please provide a valid email'),
    // This custom validator checks if a password OR googleId is provided
    body('password').custom((value, { req }) => {
      if (!req.body.password && !req.body.googleId) {
        throw new Error('Either a password or googleId is required for registration');
      }
      return true;
    }),
    // fields that are optional for third-party registration
    body('firstName').optional().notEmpty().withMessage('First name cannot be empty'),
    body('lastName').optional().notEmpty().withMessage('Last name cannot be empty'),
    body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
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
