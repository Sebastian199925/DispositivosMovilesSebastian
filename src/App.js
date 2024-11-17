import React, { useEffect, useState } from "react";
import { useDebounce } from "./Debouncecarpeta/usedebounce";

const App = () => {

    const [userInput, setUserInput] = useState(""); // Estado para almacenar el texto ingresado
    const [data, setData] = useState([]); // Estado para almacenar lo obtenido de la API
    const debounceValue = useDebounce(userInput, 1000); //Valor - Tiempo 1000 = 1 segundo

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/products/search?q=${debounceValue}`); //API
                const result = await response.json(); // Conversión de la respuesta a JSON
                setData(result.products || []); // Guardar los productos en el estado
            } catch (error) {
                console.error("Error al obtener los datos:", error); // Manejo de errores
            }
        };

        
        debounceValue ? getData() : setData([]);//Ejecutar cuando esta vacio, devuelve arreglo vacio
    }, [debounceValue]); // Se ejecuta cuando debounceValue cambia

    //Actualiza la informacion en la cajita
    const handleChange = ({ target }) => {
        setUserInput(target.value);
    };


    return (
        <div>
            <h1>Buscador de Productos</h1>
            <label>
                Buscar: <input type="text" value={userInput} onChange={handleChange} />
            </label>
            <div className="products">
                {data.length > 0 ? (
                    data.map((product, idx) => (
                        <div key={`product-${idx}`} className="product-item">
                            <p><strong>Marca:</strong> {product.brand}</p>
                            <img
                                src={product.thumbnail}
                                alt={product.brand}
                                height={140}
                                width={180}
                            />
                        </div>
                    ))
                ) : (
                    debounceValue && <p>No se encontraron productos.</p> // Mostrar mensaje si no hay resultados
                )}
            </div>
        </div>
    );
};

export default App;
