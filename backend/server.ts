import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const projectRoot = path.resolve(__dirname, "..");

dotenv.config({
  path: path.join(projectRoot, ".env"),
});

dotenv.config({
  path: path.join(__dirname, ".env"),
  override: true,
});

dotenv.config({
  path: path.join(projectRoot, ".env.local"),
  override: true,
});

dotenv.config({
  path: path.join(__dirname, ".env.local"),
  override: true,
});

const app = express();

const allowedOrigins = [
  "http://localhost:8080",
  "http://localhost:5173",
  "https://rampickelmart-s535.onrender.com",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error(`CORS blocked for origin: ${origin}`)
      );
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
    ],
  })
);

app.options(/.*/, cors());

app.use(express.json());

const PORT = Number(process.env.PORT || 5000);

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Ram Pickel Mart OTP Server Running",
  });
});

app.get("/test", (_req, res) => {
  res.json({
    success: true,
    message: "OTP server working",
  });
});
