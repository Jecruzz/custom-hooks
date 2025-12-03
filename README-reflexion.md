Reflexión sobre la implementación de hooks

Trabajo realizado:
- Se creó el hook `useFetch` para centralizar la lógica de peticiones: manejo de carga, errores, abort y refetch.
- Se creó `usePosts` para obtener la lista de posts y `usePost` para obtener un post por id.
- Se actualizó `ListaPosts.jsx` para usar `usePosts` y eliminar código repetido.

Por qué se hizo así:
- Para evitar repetir la misma lógica de `fetch` en varios componentes.
- Para tener una forma más clara y reutilizable de cargar datos.

Beneficios:
- Código más limpio y fácil de mantener.
- Facilita agregar tests o cambiar la forma de obtener datos en un solo lugar.

Siguientes pasos recomendados:
- Actualizar el componente de detalle de post para usar `usePost`.
- Agregar manejo visual de errores y retry si es necesario.
- Escribir tests unitarios para los hooks.

