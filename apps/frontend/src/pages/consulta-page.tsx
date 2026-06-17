import { useState } from "react";
import { FormularioConsulta } from "../components/formulario-consulta/formulario-consulta";
import { crearConsulta } from "../services/consulta-service";

export function PaginaConsulta() {
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  const handleEnviar = async (datos: {
    nombreCliente: string;
    telefonoCliente: string;
    mensaje: string;
  }) => {
    setCargando(true);
    setError(null);
    try {
      await crearConsulta({
        viviendaId: "vivienda-1",
        ...datos,
      });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans">
      <div>
        <h1 className="text-center text-blue-900 text-3xl font-bold mb-6">
          🏠 CasaHoy
        </h1>
        {cargando && (
          <p className="text-center text-gray-500">Enviando...</p>
        )}
        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}
        <FormularioConsulta
          tituloVivienda="Casa luminosa en Quilmes"
          onEnviar={handleEnviar}
        />
      </div>
    </div>
  );
}