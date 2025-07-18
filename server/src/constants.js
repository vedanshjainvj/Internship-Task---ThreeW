// -------------------- PACKAGE IMPORT FILES -------------------- //
import dotenv from "dotenv"
dotenv.config();

// ----------------------------------- Initilization of .env file -------------------------------------------
export const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            "http://localhost:5173",
            "http://localhost:3000",
            "https://internship-task-three-w.vercel.app"
        ];
        if (!origin || allowedOrigins.includes(origin)) {
            console.log("Allowed Origin: ", origin);
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

export const envProvider = {
    PORT: process.env.PORT,
    DB_URI: process.env.DB_URI,
    NODE_ENV: process.env.NODE_ENV
}

export const baseOptionsforDynamicOptions = {
    discriminatorKey: "optionstype",
    collection: "dynamicOptionsModel",
    timestamps: true
}
