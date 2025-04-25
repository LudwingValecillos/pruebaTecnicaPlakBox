import React, { useState, FormEvent, ChangeEvent } from "react";

// Definición del tipo Piece
type Piece = {
  name: string;
  material: string;
  ancho: string; // se guardan como strings para mantener el formato original
  largo: string;
  tipo: "BASE" | "CAJON" | "PUERTA";
};

// Datos iniciales de piezas
const initialPieces: Piece[] = [
  {
    name: "C/F Cajon 1026",
    material: "Blanco MDF",
    ancho: "1187.00",
    largo: "128.33",
    tipo: "CAJON",
  },
  {
    name: "Lat. Izq. Cajon 1026",
    material: "Blanco MDF",
    ancho: "128.33",
    largo: "450.00",
    tipo: "CAJON",
  },
  {
    name: "Base Cajon 1024",
    material: "Blanco MDF",
    ancho: "1187.00",
    largo: "414.00",
    tipo: "CAJON",
  },
  {
    name: "Frente Cajon 1024",
    material: "Blanco MDF",
    ancho: "1217.00",
    largo: "186.33",
    tipo: "CAJON",
  },
  {
    name: "Lat. Der. Cajon 1026",
    material: "Blanco MDF",
    ancho: "128.33",
    largo: "450.00",
    tipo: "CAJON",
  },
  {
    name: "Sep. Vertical 1022",
    material: "Blanco MDF",
    ancho: "573.00",
    largo: "500.00",
    tipo: "BASE",
  },
  {
    name: "Lat. Izquierdo",
    material: "Blanco MDF",
    ancho: "1164.00",
    largo: "500.00",
    tipo: "BASE",
  },
  {
    name: "Base Cajon 1026",
    material: "Blanco MDF",
    ancho: "1187.00",
    largo: "414.00",
    tipo: "CAJON",
  },
  {
    name: "Lat. Der. Cajon 1024",
    material: "Blanco MDF",
    ancho: "128.33",
    largo: "450.00",
    tipo: "CAJON",
  },
  {
    name: "C/F Cajon 1024 (2)",
    material: "Blanco MDF",
    ancho: "1187.00",
    largo: "128.33",
    tipo: "CAJON",
  },
  {
    name: "Estante 1008",
    material: "Blanco MDF",
    ancho: "2464.00",
    largo: "500.00",
    tipo: "BASE",
  },
  {
    name: "C/F Cajon 1026 (2)",
    material: "Blanco MDF",
    ancho: "1187.00",
    largo: "128.33",
    tipo: "CAJON",
  },
  {
    name: "Lat. Derecho",
    material: "Blanco MDF",
    ancho: "1164.00",
    largo: "500.00",
    tipo: "BASE",
  },
  {
    name: "Base Cajon 1028",
    material: "Blanco MDF",
    ancho: "1187.00",
    largo: "414.00",
    tipo: "CAJON",
  },
  {
    name: "Frente Cajon 1028",
    material: "Blanco MDF",
    ancho: "1217.00",
    largo: "186.33",
    tipo: "CAJON",
  },
  {
    name: "Lat. Izq. Cajon 1024",
    material: "Blanco MDF",
    ancho: "128.33",
    largo: "450.00",
    tipo: "CAJON",
  },
  {
    name: "Puerta 1004 D",
    material: "Blanco MDF",
    ancho: "1194.00",
    largo: "1245.00",
    tipo: "PUERTA",
  },
  {
    name: "Lat. Izq. Cajon 1028",
    material: "Blanco MDF",
    ancho: "128.33",
    largo: "450.00",
    tipo: "CAJON",
  },
  {
    name: "Frente Cajon 1026",
    material: "Blanco MDF",
    ancho: "1217.00",
    largo: "186.33",
    tipo: "CAJON",
  },
  {
    name: "C/F Cajon 1024",
    material: "Blanco MDF",
    ancho: "1187.00",
    largo: "128.33",
    tipo: "CAJON",
  },
  {
    name: "Sep. Vertical 1011",
    material: "Blanco MDF",
    ancho: "573.00",
    largo: "500.00",
    tipo: "BASE",
  },
  {
    name: "Puerta 1004 I",
    material: "Blanco MDF",
    ancho: "1194.00",
    largo: "1245.00",
    tipo: "PUERTA",
  },
];

const PiecesList: React.FC = () => {
  // Estado para la lista de piezas
  const [pieces, setPieces] = useState<Piece[]>(initialPieces);
  // Estado para filtrar por tipo: 'ALL' muestra todos
  const [filterType, setFilterType] = useState<
    "ALL" | "BASE" | "CAJON" | "PUERTA"
  >("ALL");
  // Estado para el formulario de nueva pieza
  const [formData, setFormData] = useState<Piece>({
    name: "",
    material: "",
    ancho: "",
    largo: "",
    tipo: "BASE",
  });
  // Estado para mensajes de error de validación
  const [errors, setErrors] = useState<Partial<Record<keyof Piece, string>>>(
    {}
  );

  // 1) Cálculo de la sumatoria de metros cuadrados (ancho * largo) sin reduce

  // const sumatiriaAnchos = pieces.map((piece) => Number(piece.ancho));
  // const sumatiriaLargo = pieces.map((piece) => Number(piece.largo));

  // let sumatiriaMetrosCuadrados = 0;

  // //Itero a traves de lso arrays asi voy acumulando los numeros
  // for (let i = 0; i < sumatiriaAnchos.length; i++) {
  //   sumatiriaMetrosCuadrados += sumatiriaAnchos[i] * sumatiriaLargo[i];
  // }

  //A mededia que recorro las piezas voy obteneindo los datos para asi multiplicarlos y sumarlos al total (mas eficiente)
  let sumatiriaMetrosCuadrados2 = 0;
  for (let i = 0; i < pieces.length; i++) {
    const a = Number(pieces[i].ancho);
    const l = Number(pieces[i].largo);
    if (!isNaN(a) && !isNaN(l)) {
      sumatiriaMetrosCuadrados2 += a * l;
    }
  }

  // 2) Función para manejar cambios en el selector de filtro
  const filtro = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value as any);
  };

  // 3) Filtrar piezas según el tipo seleccionado
  const piezasFiltradas =
    filterType === "ALL" ? pieces : pieces.filter((p) => p.tipo === filterType);

  // 4) Manejo de cambios en el formulario
  function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const campo = e.target.name;
    const valor = e.target.value;
    console.log('cambio en:', campo, '->', valor);
    const copiaForm: any = {
      name: formData.name,
      material: formData.material,
      ancho: formData.ancho,
      largo: formData.largo,
      tipo: formData.tipo,
    };
    if (campo === 'name') {
      copiaForm.name = valor;
    } else if (campo === 'material') {
      copiaForm.material = valor;
    } else if (campo === 'ancho') {
      copiaForm.ancho = valor;
    } else if (campo === 'largo') {
      copiaForm.largo = valor;
    } else if (campo === 'tipo') {
      copiaForm.tipo = valor;
    }
    setFormData(copiaForm);
  }

  // 5) Validación simple del formulario
  function validarDatos(): boolean {
    let isValid = true;
    const newErrors: Partial<Record<keyof Piece, string>> = {};

    if (!formData.name) {
      newErrors.name = 'Nombre es requerido';
      isValid = false;
    }
    if (!formData.material) {
      newErrors.material = 'Material es requerido';
      isValid = false;
    }

    // Ancho
    if (formData.ancho === '') {
      newErrors.ancho = 'Ancho es requerido';
      isValid = false;
    } else if (isNaN(Number(formData.ancho))) {
      newErrors.ancho = 'Ancho debe ser número';
      isValid = false;
    } else if (Number(formData.ancho) <= 0) {
      newErrors.ancho = 'Ancho debe ser mayor a 0';
      isValid = false;
    }

    // Largo
    if (formData.largo === '') {
      newErrors.largo = 'Largo es requerido';
      isValid = false;
    } else if (isNaN(Number(formData.largo))) {
      newErrors.largo = 'Largo debe ser número';
      isValid = false;
    } else if (Number(formData.largo) <= 0) {
      newErrors.largo = 'Largo debe ser mayor a 0';
      isValid = false;
    }

    // Tipo
    if (formData.tipo !== 'BASE' && formData.tipo !== 'CAJON' && formData.tipo !== 'PUERTA') {
      newErrors.tipo = 'Tipo es requerido';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }

  // 6) Manejo del submit del formulario
  const agregaPieza = (e: FormEvent) => {
    e.preventDefault();

    if (!validarDatos()) return;

    // Añadimos la nueva pieza al array
    setPieces((prev) => [...prev, formData]);

    // Formaeto los datos
    setFormData({ name: "", material: "", ancho: "", largo: "", tipo: "BASE" });
    setErrors({});
  };

  return (
    <div >
      {/* Mostrar suma de metros cuadrados */}
      

      <h1>Despiece</h1>

      {/* Selector para filtrar por tipo */}
      <div >
        <label>
          Filtro
          <select value={filterType} onChange={filtro}>
            <option value="ALL">Todos</option>
            <option value="BASE">Base</option>
            <option value="CAJON">Cajón</option>
            <option value="PUERTA">Puerta</option>
          </select>
        </label>
      </div>

      <p>
        Sumatoria de metros cuadrados: {sumatiriaMetrosCuadrados2} 
      </p>

      {/* Tabla de piezas */}
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Ancho</th>
            <th>Largo</th>
            <th>Material</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {piezasFiltradas.map((piece, idx) => (
            <tr
              key={`${piece.name}-${idx}`}
              className={piece.tipo === "CAJON" ? "cajon" : ""} // se añade la clase 'cajon' si el tipo es CAJON
            >
              <td>{piece.name}</td>
              <td>{piece.ancho}</td>
              <td>{piece.largo}</td>
              <td>{piece.material}</td>
              <td>{piece.tipo}</td>
            </tr>
          ))}
        </tbody>
      </table>

         {/* Formulario para agregar nueva pieza */}
         <form
        onSubmit={agregaPieza}
      >
        <h2>Añadir nueva pieza</h2>
        <div>
          <label>
            Nombre:
            <input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </label>
          {errors.name && <span> {errors.name}</span>}
        </div>
        <div>
          <label>
            Material:
            <input
              name="material"
              value={formData.material}
              onChange={handleInputChange}
            />
          </label>
          {errors.material && (
            <span > {errors.material}</span>
          )}
        </div>
        <div>
          <label>
            Ancho:
            <input
              name="ancho"
              value={formData.ancho}
              onChange={handleInputChange}
            />
          </label>
          {errors.ancho && (
            <span> {errors.ancho}</span>
          )}
        </div>
        <div>
          <label>
            Largo:
            <input
              name="largo"
              value={formData.largo}
              onChange={handleInputChange}
            />
          </label>
          {errors.largo && (
            <span> {errors.largo}</span>
          )}
        </div>
        <div>
          <label>
            Tipo:
            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleInputChange}
            >
              <option value="BASE">Base</option>
              <option value="CAJON">Cajón</option>
              <option value="PUERTA">Puerta</option>
            </select>
          </label>
          {errors.tipo  ? <span> {errors.tipo}</span> : ""}
        </div>
        <button type="submit">
          Añadir pieza
        </button>
      </form>
    </div>
  );
};

export default PiecesList;
