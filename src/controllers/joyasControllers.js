import pool from "../db.js"

export const getJoyas = async (req, res) => {
  try {
    let { limits = 10, page = 1, order_by = "id_ASC" } = req.query
    limits = parseInt(limits)
    page = parseInt(page)

    const camposValidos = [
      "id",
      "nombre",
      "categoria",
      "metal",
      "precio",
      "stock",
    ]
    const direccionesValidas = ["ASC", "DESC"]

    let [campo, direccion] = order_by.split("_")

    if (!camposValidos.includes(campo)) campo = "id"
    if (!direccionesValidas.includes(direccion)) direccion = "ASC"

    const offset = (page - 1) * limits

    const query = `
      SELECT * FROM inventario
      ORDER BY ${campo} ${direccion}
      LIMIT $1 OFFSET $2
    `
    const { rows } = await pool.query(query, [limits, offset])

    const results = rows.map((joya) => ({
      ...joya,
      links: {
        self: `/joyas/${joya.id}`,
      },
    }))

    res.json({
      total: results.length,
      results,
    })
  } catch (error) {
    console.error("Error en la consulta:", error)
    res.status(500).json({ error: "Ocurrió un error en el servidor" })
  }
}

export const getJoyasFiltradas = async (req, res) => {
  try {
    const { precio_min, precio_max, categoria, metal } = req.query
    let filtros = []
    let values = []
    let idx = 1

    if (precio_max) {
      filtros.push(`precio <= $${idx++}`)
      values.push(precio_max)
    }
    if (precio_min) {
      filtros.push(`precio >= $${idx++}`)
      values.push(precio_min)
    }
    if (categoria) {
      filtros.push(`categoria = $${idx++}`)
      values.push(categoria)
    }
    if (metal) {
      filtros.push(`metal = $${idx++}`)
      values.push(metal)
    }

    const where = filtros.length ? `WHERE ${filtros.join(" AND ")}` : ""
    const query = `SELECT * FROM inventario ${where}`
    const { rows } = await pool.query(query, values)

    res.json(rows)
  } catch (error) {
    console.error("Error al filtrar las joyas:", error)
    res.status(500).json({ error: "Error al filtrar las joyas" })
  }
}