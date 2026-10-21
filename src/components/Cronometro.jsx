import { useState, useEffect } from "react";

const Cronometro = () => {

    const [segundos, setSegundos] = useState(0);

    useEffect(() => {
        const intervalo = setInterval(() => {
            setSegundos(s => s + 1)
        }, 1000);

        return () => clearInterval(intervalo);
    }, [])

    return (
        <div>
            {segundos}
        </div>
    )
}

export default Cronometro
