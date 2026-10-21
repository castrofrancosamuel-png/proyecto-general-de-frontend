import { useEffect, useState } from "react";

function NavegadorPersonajes() {
  const [id, setId] = useState(1);
  const [personaje, setPersonaje] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controlador = new AbortController();

    const obtenerPersonaje = async () => {
      setCargando(true);
      setError("");

      try {
        const respuesta = await fetch(
          `https://rickandmortyapi.com/api/character/${id}`,
          { signal: controlador.signal }
        );

        if (!respuesta.ok) {
          throw new Error(`Error ${respuesta.status}: no se pudo obtener el personaje`);
        }

        const datos = await respuesta.json();
        setPersonaje(datos);
      } catch (err) {
        // Una petición cancelada no es un error
        if (err.name === "AbortError") return;
        setError(err.message || "Ocurrió un error al consultar la API");
      } finally {
        // Si fue cancelada, ya hay otra petición en curso: no tocar cargando
        if (!controlador.signal.aborted) setCargando(false);
      }
    };

    obtenerPersonaje();

    // Limpieza: cancela la petición anterior al cambiar id o desmontar
    return () => controlador.abort();
  }, [id]);

  return (
    <section>
      <div>
        <button onClick={() => setId((actual) => Math.max(1, actual - 1))} disabled={id === 1}>
          Anterior
        </button>
        <span> Personaje #{id} </span>
        <button onClick={() => setId((actual) => actual + 1)}>Siguiente</button>
      </div>

      {cargando && <p>Cargando...</p>}
      {!cargando && error && <p role="alert">{error}</p>}
      {!cargando && !error && personaje && (
        <article>
          <img src={personaje.image} alt={personaje.name} />
          <h2>{personaje.name}</h2>
          <p>Especie: {personaje.species}</p>
          <p>Estado: {personaje.status}</p>
        </article>
      )}
    </section>
  );
}

export default NavegadorPersonajes;