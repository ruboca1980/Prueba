// Función para resolver el Snake Cube Puzzle
function solveSnakeCube() {
  const cubeSize = 3; // Tamaño del cubo (3x3x3)
  const totalCubes = cubeSize * cubeSize * cubeSize; // Total de cubos en el cubo

  // Representación del cubo y los movimientos permitidos
  const cube = new Array(totalCubes).fill(0);
  const movements = [
    [1, 0, 0], // Mover hacia adelante en el eje x
    [-1, 0, 0], // Mover hacia atrás en el eje x
    [0, 1, 0], // Mover hacia adelante en el eje y
    [0, -1, 0], // Mover hacia atrás en el eje y
    [0, 0, 1], // Mover hacia adelante en el eje z
    [0, 0, -1], // Mover hacia atrás en el eje z
  ];

  // Función auxiliar para verificar si una posición es válida
  function isValidPosition(x, y, z) {
    return (
      x >= 0 && x < cubeSize && y >= 0 && y < cubeSize && z >= 0 && z < cubeSize
    );
  }

  // Función auxiliar para verificar si una coordenada está ocupada
  function isOccupied(x, y, z) {
    const index = x + y * cubeSize + z * cubeSize * cubeSize;
    return cube[index] === 1;
  }

  // Función auxiliar para resolver el cubo utilizando backtracking
  function backtrack(x, y, z, length) {
    // Si se han utilizado todos los cubos, se encontró una solución
    if (length === totalCubes) {
      return true;
    }

    for (const [dx, dy, dz] of movements) {
      const nx = x + dx;
      const ny = y + dy;
      const nz = z + dz;

      if (isValidPosition(nx, ny, nz) && !isOccupied(nx, ny, nz)) {
        const index = nx + ny * cubeSize + nz * cubeSize * cubeSize;
        cube[index] = 1; // Marcar la posición como ocupada

        // Llamar recursivamente para continuar construyendo la serpiente
        if (backtrack(nx, ny, nz, length + 1)) {
          return true; // Se encontró una solución
        }

        cube[index] = 0; // Deshacer el movimiento si no se encontró una solución
      }
    }

    return false; // No se encontró una solución
  }

  // Llamar a la función de backtracking comenzando desde la posición (0, 0, 0)
  if (backtrack(0, 0, 0, 0)) {
    return cube; // Devolver la configuración del cubo
  } else {
    return null; // No se encontró una solución
  }
}

// Ejemplo de uso:
const solucion = solveSnakeCube();
if (solucion) {
  console.log("Solución encontrada:");
  console.log(solucion);
} else {
  console.log("No se encontró una solución.");
}
