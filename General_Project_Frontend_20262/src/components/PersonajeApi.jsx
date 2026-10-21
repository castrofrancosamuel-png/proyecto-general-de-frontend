import { useEffect, useState } from "react";

function PersonajeApi() {
  const [personaje, setPersonaje] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const obtenerPersonaje = async () => {
      try {
        const respuesta = await fetch(
          "https://rickandmortyapi.com/api/character/1"
        );

        if (!respuesta.ok) {
          throw new Error(`Error ${respuesta.status}: no se pudo obtener el personaje`);
        }

        const datos = await respuesta.json();
        setPersonaje(datos);
      } catch (err) {
        setError(err.message || "Ocurrió un error al consultar la API");
      } finally {
        setCargando(false);
      }
    };

    obtenerPersonaje();
  }, []);

  if (cargando) return <p>Cargando...</p>;
  if (error) return <p role="alert">{error}</p>;

  return (
    <article>
      <img src={personaje.image} alt={personaje.name} />
      <h2>{personaje.name}</h2>
      <p>Especie: {personaje.species}</p>
      <p>Estado: {personaje.status}</p>
    </article>
  );
}

export default PersonajeApi;