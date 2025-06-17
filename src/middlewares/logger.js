const logger = (req, res, next) => {
  console.log(
    `Consulta a la ruta: ${req.originalUrl} - ${new Date().toISOString()}`
  )
  next()
}

export default logger
