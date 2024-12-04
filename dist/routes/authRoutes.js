"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const AuthController_1 = require("../controllers/AuthController");
const validation_1 = require("../middleware/validation");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/create-account', (0, express_validator_1.body)('name')
    .notEmpty().withMessage('El nombre no puede ir vacio'), (0, express_validator_1.body)('password')
    .isLength({ min: 8 }).withMessage('La contraseña debe ser minimo de 8 caracteres'), (0, express_validator_1.body)('password_confirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
        throw new Error('Los password no son iguales');
    }
    return true;
}), (0, express_validator_1.body)('email')
    .isEmail().withMessage('E-mail no valido'), validation_1.handleInputErrors, AuthController_1.AuthController.createAccount);
router.post('/confirm-account', (0, express_validator_1.body)('token')
    .notEmpty().withMessage('El Token no puede ir vacio'), validation_1.handleInputErrors, AuthController_1.AuthController.confirmAccount);
router.post('/login', (0, express_validator_1.body)('email')
    .isEmail().withMessage('E-mail no valido'), (0, express_validator_1.body)('password')
    .notEmpty().withMessage('La contraseña no puede ir vacia'), validation_1.handleInputErrors, AuthController_1.AuthController.login);
router.post('/request-code', (0, express_validator_1.body)('email')
    .isEmail().withMessage('E-mail no valido'), validation_1.handleInputErrors, AuthController_1.AuthController.requestConfirmationCode);
router.post('/forgot-password', (0, express_validator_1.body)('email')
    .isEmail().withMessage('E-mail no valido'), validation_1.handleInputErrors, AuthController_1.AuthController.forgotPassword);
router.post('/validate-token', (0, express_validator_1.body)('token')
    .notEmpty().withMessage('El Token no puede ir vacio'), validation_1.handleInputErrors, AuthController_1.AuthController.validateToken);
router.post('/update-password/:token', (0, express_validator_1.param)('token')
    .isNumeric().withMessage('Token no válido'), (0, express_validator_1.body)('password')
    .isLength({ min: 8 }).withMessage('La contraseña debe ser minimo de 8 caracteres'), (0, express_validator_1.body)('password_confirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
        throw new Error('Los password no son iguales');
    }
    return true;
}), validation_1.handleInputErrors, AuthController_1.AuthController.updatePasswordWithToken);
router.get('/user', auth_1.authenticate, AuthController_1.AuthController.user);
/** Profile */
router.put('/profile', auth_1.authenticate, (0, express_validator_1.body)('name')
    .notEmpty().withMessage('El nombre no puede ir vacio'), (0, express_validator_1.body)('email')
    .isEmail().withMessage('E-mail no valido'), validation_1.handleInputErrors, AuthController_1.AuthController.updateProfile);
router.post('/update-password', auth_1.authenticate, (0, express_validator_1.body)('current_password')
    .notEmpty().withMessage('La contraseña actual no puede ir vacia'), (0, express_validator_1.body)('password')
    .isLength({ min: 8 }).withMessage('La contraseña debe ser minimo de 8 caracteres'), (0, express_validator_1.body)('password_confirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
        throw new Error('Los password no son iguales');
    }
    return true;
}), validation_1.handleInputErrors, AuthController_1.AuthController.updateCurrentUserPassword);
router.post('/check-password', auth_1.authenticate, (0, express_validator_1.body)('password')
    .notEmpty().withMessage('La contraseña no puede ir vacia'), validation_1.handleInputErrors, AuthController_1.AuthController.checkPassword);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map