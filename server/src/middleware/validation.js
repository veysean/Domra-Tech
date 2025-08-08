import { validationResult, body } from 'express-validator';

// A reusable middleware function to check for validation errors
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  // Correct: Map the errors into a clean key-value pair
  const extractedErrors = errors.array().reduce((acc, err) => {
    // If the error has a parameter name, use it; otherwise, just use a generic 'message'
    acc[err.param || 'general'] = err.msg;
    return acc;
  }, {});

  return res.status(400).json({
    errors: extractedErrors,
  });
};

// Validation rules for a 'create user' request
export const registerValidationRules = () => {
  return [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ];
};

// Validation rules for user login
export const loginValidationRules = () => {
  return [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ];
};