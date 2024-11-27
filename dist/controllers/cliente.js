"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCliente = void 0;
const cliente_1 = __importDefault(require("../models/cliente"));
const email_1 = require("../controllers/email"); // Importa la función de envío de correo
const postCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { Email_Client } = req.body;
    const email = yield cliente_1.default.findOne({ where: { Email_Client } });
    if (email) {
        return res.status(400).json({
            msg: 'El email ya está registrado en la base de datos'
        });
    }
    try {
        yield cliente_1.default.create(body);
        // Enviar correo de confirmación
        const subject = 'Confirmación de Registro';
        const text = `Hola,\n\nTu correo ${Email_Client} ha sido guardado exitosamente y será utilizado para informarte sobre la aplicación.\n\nGracias.`;
        const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
                color: #3e2723;
                position: relative;
                overflow: hidden;
            }

            .background {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: -1;
            }

            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border-radius: 10px;
                background-color: rgba(255, 255, 255, 0.8);
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                position: relative;
                z-index: 1;
            }

            h1 {
                color: #4caf50;
            }

            p {
                font-size: 16px;
                line-height: 1.5;
            }

            footer {
                margin-top: 20px;
                font-size: 14px;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div class="background">
            <img src="URL_DEL_GIF" alt="Background Animation" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div class="container">
            <h1>Hola,</h1>
            <p>Tu correo <strong>${Email_Client}</strong> ha sido guardado exitosamente y será utilizado para informarte sobre lo mas nuevo y de tu interes 😉.</p>
            <p>Gracias.</p>
            <footer>
                &copy; 2024 Tienda de Productos
            </footer>
        </div>
    </body>
    </html>
    `;
        // Cambia URL_DEL_GIF por la URL del GIF que elijas
        yield (0, email_1.sendEmail)(Email_Client, subject, text, html);
        res.json({
            msg: 'El cliente fue agregado con éxito y se envió un correo de confirmación',
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: `Ups, ocurrió un error`
        });
    }
});
exports.postCliente = postCliente;
