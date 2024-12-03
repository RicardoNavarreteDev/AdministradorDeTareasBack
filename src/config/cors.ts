import { CorsOptions } from "cors";


export const corsConfig: CorsOptions = {
    origin: function (origin, callback) {
        const whitelist = [process.env.FRONTEND_URL];
        
        if (!origin || whitelist.includes(origin)) {
            // Permite solicitudes sin origen (como las de Postman) o solicitudes con un origen en la lista blanca
            callback(null, true);
        } else {
            callback(new Error('Error de CORS: Origen no autorizado'));
        }
    },
    credentials: true, // Opcional, útil si usas cookies o headers de autenticación
};
