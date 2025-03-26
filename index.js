import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser";

import "./config/passport.js";
import authRoutes from "./src/features/auth/routes.js";
import letterRoutes from "./src/features/letter/routes.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies and authentication headers
  })
);


// Passport Middleware
app.use(passport.initialize());
// app.use(passport.session());


// API GATEWAYS

//auth routes
app.use("/auth", authRoutes);

//letter routes
app.use("/api", letterRoutes);


app.get("/", (req, res) => res.send("Server is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
