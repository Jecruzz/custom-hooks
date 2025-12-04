Tarea: Aplicación de Posts con CRUD basico

Descripción de la tarea:

Se desarrolló una aplicación React que permite listar posts, ver detalles y crear nuevos posts. 
La aplicación se integra con un servidor local JSON Server que actúa como una API simulada.

Funcionalidades implementadas:

1. Listar posts con paginación (5 posts por página)
2. Ver detalles de un post específico
3. Crear nuevo post mediante un formulario con validación
4. Navegación entre páginas usando React Router
5. Manejo de estados de carga, error y éxito

Características del formulario de creación:

- Link para regresar al listado desde el formulario
- Validación: no permite submit si titulo o contenido están vacíos
- Limpia los campos después de enviar exitosamente
- Muestra mensaje de éxito y redirige al listado después de 2 segundos
- Botón de envío deshabilitado cuando los campos requeridos están vacíos

Características de la paginación:

- Muestra 5 posts por página
- Botones Anterior y Siguiente para navegación
- Indicador de página actual
- Botones deshabilitados en primera y última página

Reflexión sobre endpoints y API

En esta tarea trabajamos con dos enfoques diferentes:

JSONPlaceholder API (endpoints públicos):
- Usamos esta API para obtener datos de posts y detalles
- No requería autenticación
- Es una API de solo lectura para propósitos educativos

JSON Server (servidor local):
- Se utilizó en la clase para simular una API REST completa
- Permite hacer peticiones GET, POST, PUT, DELETE
- Se ejecuta en http://localhost:3000
- Almacena datos en un archivo JSON local

Un endpoint es una URL que representa un recurso específico en el servidor:
- GET /posts: obtiene todos los posts
- GET /posts/1: obtiene el post con id 1
- POST /posts: crea un nuevo post
- PUT /posts/1: actualiza el post con id 1
- DELETE /posts/1: elimina el post con id 1

Para utilizar JSON Server localmente, se ejecuta el comando:
npm install json-server
json-server --watch db.json --port 3000

Explicación de CORS

CORS significa Cross-Origin Resource Sharing (Compartir Recursos entre Orígenes).

El problema:
- Una aplicación web en http://localhost:5173 no puede hacer peticiones directas a http://localhost:3000 por defecto
- El navegador bloquea estas peticiones por razones de seguridad
- Esto se llama Same-Origin Policy

La solución implementada en clase:

1. Instalar json-server con soporte CORS:
npm install json-server cors

2. Crear un archivo de configuración que habilite CORS en el servidor JSON Server

3. Alternativa: usar un servidor proxy en Vite (vite.config.js) que actúe como intermediario

4. O simplemente usar una API pública como JSONPlaceholder que ya tiene CORS habilitado

En nuestro caso, JSON Server por defecto permite peticiones desde diferentes orígenes si se configura correctamente.
El navegador permite la petición porque:
- El servidor JSON Server devuelve el header "Access-Control-Allow-Origin: *"
- Esto indica que el servidor permite peticiones desde cualquier origen

Comandos útiles:

Iniciar la aplicación React:
npm run dev

Iniciar JSON Server:
json-server --watch db.json --port 3000

Instalar json-server:
npm install -g json-server

Estructura de archivos:

src/
  components/
    ListaPosts.jsx - listado con paginación
    DetallePost.jsx - detalle de un post
    CrearPost.jsx - formulario para crear posts
  hooks/
    useFetch.js - hook personalizado para peticiones HTTP
    usePosts.js - hook para obtener lista de posts
    usePost.js - hook para obtener un post específico
  App.jsx - enrutador principal
  main.jsx - punto de entrada

Lo aprendido:

- El uso de custom hooks permite reutilizar lógica en toda la aplicación
- React Router facilita la navegación entre páginas
- Los endpoints REST siguen un patrón consistente
- CORS es un mecanismo de seguridad importante en desarrollo web
- La validación en formularios es esencial para una buena experiencia de usuario
- La paginación es necesaria cuando se tienen muchos datos que mostrar
