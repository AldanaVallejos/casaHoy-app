import { useState } from "react"
import { FormularioConsulta } from "../components/formulario-consulta/formulario-consulta"
import { enviarConsultaUseCase } from "../use-cases/enviar-consulta-use-case"
import { BotonPrimario } from "../components/boton-primario/boton-primario"
import { Home, BadgeCheck, Building2, Headphones, Eye, MapPin, LayoutGrid } from "lucide-react"

const viviendas = [
  {
    id: "vivienda-1",
    titulo: "Casa Box",
    imagen: "/vivienda-1.png",
    ubicacion: "Quilmes",
    tipo: "CASA",
    cantidadAmbientes: 3,
    descripcion: "Ideal para parejas o familias pequeñas que buscan un hogar cómodo y funcional.",
  },
  {
    id: "vivienda-2",
    titulo: "Casa Box Plus",
    imagen: "/vivienda-2.png",
    ubicacion: "Bernal",
    tipo: "DUPLEX",
    cantidadAmbientes: 4,
    descripcion: "Amplio espacio con diseño moderno y materiales de primera calidad.",
  },
  {
    id: "vivienda-3",
    titulo: "Casa Compact",
    imagen: "/vivienda-3.png",
    ubicacion: "Rosario",
    tipo: "CASA",
    cantidadAmbientes: 2,
    descripcion: "Solución inteligente para quienes buscan su primer hogar propio.",
  }
]

export function PaginaVivienda() {
  const [viviendaSeleccionada, setViviendaSeleccionada] = useState<string | null>(null)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cargando, setCargando] = useState(false)

  const handleMeInteresa = (id: string) => {
    setViviendaSeleccionada(id)
    setMostrarFormulario(true)
    setTimeout(() => {
      document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  const handleEnviar = async (datos: {
    nombreCliente: string
    telefonoCliente: string
    mensaje: string
  }) => {
    setCargando(true)
    setError(null)

    const resultado = await enviarConsultaUseCase(
      viviendaSeleccionada,
      datos
    )

    if (!resultado.success) {
      setError(resultado.error)
    }

    setCargando(false)
  }

  const viviendaActual = viviendas.find(v => v.id === viviendaSeleccionada)

  return (
    <div className="bg-[#f9f9ff] text-[#141b2b]">

      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <nav className="flex justify-between items-center px-6 md:px-12 py-4 max-w-7xl mx-auto">
          <span className="font-bold text-2xl text-[#022448]" style={{ fontFamily: "Montserrat, sans-serif" }}>
            Casa Hoy
          </span>
          <div className="hidden md:flex items-center gap-10">
            {["Viviendas", "Proyectos", "Contacto"].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`}
                className="text-[#5c5f60] hover:text-[#022448] transition-colors text-sm font-semibold tracking-wide">
                {link}
              </a>
            ))}
          </div>
          <button className="bg-[#022448] text-white font-bold py-2.5 px-6 rounded-full hover:shadow-lg transition-all text-sm">
            Iniciar sesión
          </button>
        </nav>
      </header>

      {/* Hero con video */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/casa_hoy.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#022448]/40 to-[#022448]/80" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 mb-8">
            <span className="text-white text-xs font-bold tracking-widest uppercase">
              Casa Hoy · Solidez Total
            </span>
          </div>
          <h1 className="text-white text-5xl md:text-7xl font-bold leading-tight mb-6"
            style={{ fontFamily: "Montserrat, sans-serif" }}>
            Tu hogar ideal<br />te está{" "}
            <span className="text-[#7EB8E8]">esperando</span>
          </h1>
          <p className="text-white/90 text-lg mb-12 max-w-2xl">
            Viviendas prefabricadas de hormigón con calidad garantizada. <br />
            Te acompañamos en cada paso del proceso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <BotonPrimario
              texto ="Explorar viviendas"
              onClick={() => document.getElementById("viviendas")?.scrollIntoView({ behavior: "smooth" })}
            />
            <button
              onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
              className="px-10 py-4 bg-white/10 backdrop-blur border border-white/30 text-white rounded-full font-bold hover:bg-white hover:text-[#022448] transition-all hover:-translate-y-1">
              Ver más información
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-6 relative -mt-16 z-20">
        <div className="bg-white py-10 rounded-3xl shadow-2xl border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            {[
              { num: "+200", label: "Viviendas entregadas", icon: <Home className="w-6 h-6 text-[#022448]" /> },
              { num: "15 años", label: "De experiencia", icon: <BadgeCheck className="w-6 h-6 text-[#022448]" /> },
              { num: "100%", label: "Hormigón premoldeado", icon: <Building2 className="w-6 h-6 text-[#022448]" /> }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center py-6 px-8 text-center group">
                <div className="w-14 h-14 bg-[#d5e3ff] flex items-center justify-center rounded-2xl mb-4 group-hover:scale-110 transition-transform text-2xl">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-[#022448] mb-1"
                  style={{ fontFamily: "Montserrat, sans-serif" }}>
                  {stat.num}
                </h3>
                <p className="text-[#43474e] text-sm font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Catálogo de viviendas */}
      <section id="viviendas" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#2563eb] font-bold tracking-widest uppercase text-sm mb-4 block">
            Nuestros Modelos
          </span>
          <h2 className="text-5xl font-bold text-[#022448] mb-4"
            style={{ fontFamily: "Montserrat, sans-serif" }}>
            Modelos Destacados
          </h2>
          <p className="text-[#43474e] text-lg">
            Diseños modulares que se adaptan a tu estilo de vida, combinando la solidez industrial con la calidez del diseño contemporáneo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {viviendas.map(v => (
            <div key={v.id}
              className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col">
              <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#C4B49A] to-[#8B7355] flex items-center justify-center">
                  <img
                    src={v.imagen}
                    alt={v.titulo}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#2563eb] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
                    Disponible
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3">
                  <p className="text-[#2563eb] text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <LayoutGrid className="w-4 h-4" />
                    {v.tipo} · {v.cantidadAmbientes} ambientes
                  </p>
                  <span className="text-[#43474e] text-sm flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-[#2563eb]" /> {v.ubicacion}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[#022448] mb-3"
                  style={{ fontFamily: "Montserrat, sans-serif" }}>
                  {v.titulo}
                </h3>
                <p className="text-[#43474e] text-sm leading-relaxed mb-6 flex-grow">
                  {v.descripcion}
                </p>
                <button
                  onClick={() => handleMeInteresa(v.id)}
                  className="w-full py-3 border-2 border-[#022448] text-[#022448] rounded-full font-bold group-hover:bg-[#022448] group-hover:text-white transition-all duration-300">
                  Me interesa
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sección "Una búsqueda más humana" */}
      <section className="py-24 bg-[#f1f3ff] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-20">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl h-96">
                <img
                  src="/trabajando.png"
                  alt="Casa Hoy Solidez Total"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-8 left-8 p-6 bg-white/40 backdrop-blur rounded-2xl border border-white/50 max-w-xs">
                  <p className="text-[#022448] font-bold mb-1">Compromiso Real</p>
                  <p className="text-[#022448]/80 text-sm leading-relaxed">
                    Cada viga y cada muro es revisado personalmente por nuestros ingenieros.
                  </p>
                </div>
              </div>
            <div className="space-y-8">
              <div>
                <span className="text-[#2563eb] font-bold tracking-widest uppercase text-sm mb-4 block">
                  Experiencia Casa Hoy
                </span>
                <h2 className="text-5xl font-bold text-[#022448] leading-tight mb-6"
                  style={{ fontFamily: "Montserrat, sans-serif" }}>
                  Una búsqueda más humana
                </h2>
                <p className="text-[#43474e] text-lg leading-relaxed">
                  Reemplazamos los chatbots fríos por un recorrido guiado diseñado para vos. Queremos que te sientas acompañado en cada paso del proceso.
                </p>
              </div>
              <ul className="space-y-6">
                {[
                  { icon: <Headphones className="w-6 h-6 text-[#2563eb]" />, title: "Asesores dedicados", desc: "No sos un número de ticket, sos una familia construyendo un sueño con nosotros." },
                  { icon: <Eye className="w-6 h-6 text-[#2563eb]" />, desc: "Seguimiento digital de tu obra con actualizaciones semanales y reportes fotográficos." }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center flex-shrink-0 text-2xl">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#022448] text-lg mb-1">{item.title}</h4>
                      <p className="text-[#43474e] text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
                className="px-12 py-4 bg-[#022448] text-white rounded-full font-bold hover:shadow-xl transition-all">
                Conocé nuestro proceso
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Formulario de contacto */}
      {mostrarFormulario && (
        <section id="contacto" className="py-24 bg-[#f1f3ff]">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-[#022448] mb-4"
                style={{ fontFamily: "Montserrat, sans-serif" }}>
                Hablemos de tu futuro hogar
              </h2>
              <p className="text-[#43474e] text-lg">
                {viviendaActual
                  ? `Consultando sobre: ${viviendaActual.titulo} · ${viviendaActual.ubicacion}`
                  : "Completá tus datos y un asesor se pondrá en contacto."}
              </p>
            </div>
            <div className="bg-white p-8 md:p-14 rounded-[3rem] shadow-2xl border border-gray-100">
              {error && <p className="text-red-500 text-center mb-4">{error}</p>}
              {cargando && <p className="text-[#43474e] text-center mb-4">Enviando...</p>}
              <FormularioConsulta
                tituloVivienda={viviendaActual?.titulo || "Casa Hoy · Solidez Total"}
                onEnviar={handleEnviar}
              />
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-[#022448] text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="md:col-span-1">
              <span className="text-3xl font-bold mb-6 block"
                style={{ fontFamily: "Montserrat, sans-serif" }}>
                Casa Hoy
              </span>
              <p className="text-white/60 text-sm leading-relaxed mb-8">
                Líderes en construcción modular de hormigón. Calidad, rapidez y solidez para tu próximo hogar.
              </p>
            </div>
            {[
              { title: "Explorar", links: ["Viviendas", "Sustentabilidad", "Materiales"] },
              { title: "Compañía", links: ["Nuestro Proceso", "Proyectos", "Nosotros"] },
              { title: "Soporte", links: ["Contacto", "Términos y Condiciones", "Preguntas Frecuentes"] }
            ].map((col, i) => (
              <div key={i} className="space-y-6">
                <h4 className="font-bold text-lg">{col.title}</h4>
                <ul className="space-y-4">
                  {col.links.map(link => (
                    <li key={link}>
                      <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t border-white/10 text-center">
            <p className="text-white/40 text-sm">
              © 2026 Casa Hoy. Arquitectura limpia, solidez garantizada.
            </p>
          </div>
        </div>
      </footer>

    </div>
  )
}