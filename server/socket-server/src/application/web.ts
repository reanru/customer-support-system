import express from "express";
import cors from "cors";

import { errorMiddleware } from "../middleware/error-middleware";
import { publicRouter } from "src/route/public-api";
import { router } from "src/route/api";

export const web = express();

web.use(cors());
web.use(express.json());
web.use(publicRouter);
web.use(router);

web.use(errorMiddleware);