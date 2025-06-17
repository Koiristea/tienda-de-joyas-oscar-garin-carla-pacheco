import express from "express"
import joyasRoutes from "./routes/joyas.js"

const app = express()

app.use("/joyas", joyasRoutes)

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
})

export default app
