import { useEffect, useState } from "react";

interface Material {
  name: string;
  price: number;
  espesor: number;
  textura: string;
  ancho: number;
  largo: number;
}
const MaterialList = () => {
  const [materials, setMateriales] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMaterials = async () => {
    // '/materials.json' es la url de la ruta
    fetch("/materials.json")
      .then((res) => {
        if (res) {
          res.json().then((data) => setMateriales(data.materials));
          setLoading(false);
        }
        setMateriales([]);
      })
      .catch((error) => setError(error.message));
  };
  useEffect(() => {
    loadMaterials();
  }, []);

  console.log(materials);

  return (
    <div>
      {
        error? <>
        <h2>Error</h2>
        <p>{error} </p>
        </>: ""
      }
      {loading ? (
        <h2>Cargando...</h2>
      ) : (
        <>
          <h1>Listado de Materiales</h1>

          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Espesor</th>
                <th>Texturas</th>
                <th>Medidas</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((material) => (
                <tr key={material.name}>
                  <td>{material.name}</td>
                  <td>{material.price}</td>
                  <td>{material.espesor}</td>
                  <td>
                    <img
                      width="50"
                      height="50"
                      src={material.textura}
                      alt="Textura"
                    />
                  </td>
                  <td>
                    {material.ancho}x{material.largo}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default MaterialList;
