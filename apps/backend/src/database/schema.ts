import { pool } from "./conexion"

export async function crearTablas() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id VARCHAR(255) PRIMARY KEY,
      nombre VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      rol VARCHAR(50) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS viviendas (
      id VARCHAR(255) PRIMARY KEY,
      titulo VARCHAR(255) NOT NULL,
      descripcion TEXT,
      precio NUMERIC NOT NULL,
      ubicacion VARCHAR(255) NOT NULL,
      tipo VARCHAR(50) NOT NULL,
      cantidad_ambientes INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS consultas (
      id VARCHAR(255) PRIMARY KEY,
      vivienda_id VARCHAR(255) NOT NULL,
      nombre_cliente VARCHAR(255) NOT NULL,
      telefono_cliente VARCHAR(255) NOT NULL,
      mensaje TEXT NOT NULL,
      estado VARCHAR(50) NOT NULL DEFAULT 'PENDIENTE',
      creado_en TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS experiencias (
      id VARCHAR(255) PRIMARY KEY,
      titulo VARCHAR(255) NOT NULL,
      mensaje_principal TEXT NOT NULL,
      tono VARCHAR(50) NOT NULL
    );
  `)

  console.log("✅ Tablas creadas correctamente")
}