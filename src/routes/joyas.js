import express from "express"
import { getJoyas, getJoyasFiltradas } from "../controllers/joyasControllers.js"
import logger from "../middlewares/logger.js"

const router = express.Router()

router.get("/", logger, getJoyas)
router.get("/filtros", logger, getJoyasFiltradas)

export default router
