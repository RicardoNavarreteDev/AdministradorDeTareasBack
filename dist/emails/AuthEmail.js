"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthEmail = void 0;
const nodemailer_1 = require("../config/nodemailer");
class AuthEmail {
    static sendConfirmationEmail = async (user) => {
        const info = await nodemailer_1.transporter.sendMail({
            from: 'UpTask <admin@uptask.com>',
            to: user.email,
            subject: 'Uptask - Confirma tu cuenta',
            text: 'Uptask - Confirma tu cuenta',
            html: `<p>Hola: ${user.name}, has creado tu cuenta en UpTask, ya casi esta todo listo, solo debes confirmar tu cuenta</p>
                   <p>Visita el siguiente enlace: </p>
                   <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar cuenta</a>
                   <p>Ingresa el código: <b>${user.token}</b></p>
                   <p>Este token expira en 10 minutos</p>
            `
        });
        console.log('Mensaje enviado', info.messageId);
    };
    static sendPasswordResetToken = async (user) => {
        const info = await nodemailer_1.transporter.sendMail({
            from: 'UpTask <admin@uptask.com>',
            to: user.email,
            subject: 'Uptask - Restablece tu contraseña',
            text: 'Uptask - Restablece tu contraseña',
            html: `<p>Hola: ${user.name}, has solicitado restablecer tu contraseña</p>
                   <p>Visita el siguiente enlace: </p>
                   <a href="${process.env.FRONTEND_URL}/auth/new-password">Restablecer contraseña</a>
                   <p>Ingresa el código: <b>${user.token}</b></p>
                   <p>Este token expira en 10 minutos</p>
            `
        });
        console.log('Mensaje enviado', info.messageId);
    };
}
exports.AuthEmail = AuthEmail;
//# sourceMappingURL=AuthEmail.js.map