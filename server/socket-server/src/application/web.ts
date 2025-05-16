import express from "express";
import cors from "cors";

import { publicRouter } from "src/route/public-api";

export const web = express();

web.use(cors());
web.use(express.json());
web.use(publicRouter);