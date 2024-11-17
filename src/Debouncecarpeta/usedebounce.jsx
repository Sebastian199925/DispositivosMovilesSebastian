import { useState, useEffect } from "react";

export function useDebounce(value, delay) {//valor cajita - tiempo de espera
    const [debouncedValue, setDebouncedValue] = useState(value);//

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler); // Limpiar el timeout cuando se actualice el valor o se desmonte el componente
        };
    }, [value, delay]);

    return debouncedValue;
}
