import { useState, useEffect } from 'react';
import { Link } from "react-router";
import { useFetch } from '../hooks/useFetch';

function ListaPosts() {
  const [pagina, setPagina] = useState(1);
  const [posts, setPosts] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const limite = 4;

  const { data: usuarios } = useFetch('/api/users');

  useEffect(() => {
    const cargarPosts = async () => {
      try {
        setCargando(true);
        setError(null);
        const url = `/api/posts?_page=${pagina}&_per_page=${limite}`;
        console.log('Página:', pagina);
        console.log('URL completa:', url);
        const respuesta = await fetch(url);
        console.log('Respuesta recibida, status:', respuesta.status);
        if (!respuesta.ok) {
          throw new Error(`Error al cargar posts: ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        console.log('Datos recibidos:', datos);
        // Con _per_page, json-server devuelve { data: [...], first: ..., last: ..., next: ..., prev: ... }
        let postsOriginales = Array.isArray(datos) ? datos : (datos.data || []);
        
        // Aplicar filtros
        let postsFiltrados = postsOriginales;
        
        // Filtro por usuario
        if (usuarioSeleccionado) {
          postsFiltrados = postsFiltrados.filter(p => p.userId === parseInt(usuarioSeleccionado));
        }
        
        // Filtro por búsqueda (en título y contenido)
        if (busqueda) {
          const busquedaLower = busqueda.toLowerCase();
          postsFiltrados = postsFiltrados.filter(p => 
            p.title.toLowerCase().includes(busquedaLower) || 
            p.body.toLowerCase().includes(busquedaLower)
          );
        }
        
        console.log('Cantidad de posts:', postsFiltrados.length);
        console.log('IDs de posts:', postsFiltrados.map(p => p.id));
        setPosts(postsFiltrados);
      } catch (err) {
        console.error('Error en fetch:', err);
        setError(err.message);
        setPosts([]);
      } finally {
        setCargando(false);
      }
    };

    cargarPosts();
  }, [pagina, limite, usuarioSeleccionado, busqueda]);

  if (cargando) {
    return (
      <div className="cargando">
        <div className="spinner"></div>
        <p>Cargando posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h2>❌ Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>📝 Lista de Posts</h2>
      
      {/* Filtros */}
      <div className="filtros-container">
        <div className="filtro-grupo">
          <label htmlFor="busqueda">Buscar por palabra clave:</label>
          <input
            type="text"
            id="busqueda"
            placeholder="Título o contenido..."
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              setPagina(1); // Reiniciar a página 1 al filtrar
            }}
            className="filtro-input"
          />
        </div>
        
        <div className="filtro-grupo">
          <label htmlFor="usuario">Filtrar por usuario:</label>
          <select
            id="usuario"
            value={usuarioSeleccionado}
            onChange={(e) => {
              setUsuarioSeleccionado(e.target.value);
              setPagina(1); // Reiniciar a página 1 al filtrar
            }}
            className="filtro-select"
          >
            <option value="">Todos los usuarios</option>
            {usuarios && usuarios.map(usuario => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="posts-grid">
        {posts.length > 0 ? (
          posts.map(post => (
            <div key={post.id} className="post-card">
              <Link to={`/posts/${post.id}`} className="post-link">Ver Detalle</Link>
              <h3>{post.title}</h3>
              <p>{post.body.substring(0, 100)}...</p>
            </div>
          ))
        ) : (
          <div className="sin-resultados">
            <p>No hay posts que coincidan con los filtros seleccionados.</p>
          </div>
        )}
      </div>
      
      {/* Controles de paginación */}
      <div className="paginacion">
        <button 
          onClick={() => {
            console.log('Click en Anterior, página actual:', pagina);
            setPagina(p => {
              const nueva = Math.max(1, p - 1);
              console.log('Nueva página:', nueva);
              return nueva;
            });
          }}
          disabled={pagina === 1}
          className="btn-paginacion"
        >
          ← Anterior
        </button>
        <span className="pagina-actual">Página {pagina}</span>
        <button 
          onClick={() => {
            console.log('Click en Siguiente, página actual:', pagina);
            setPagina(p => {
              const nueva = p + 1;
              console.log('Nueva página:', nueva);
              return nueva;
            });
          }}
          disabled={posts.length < limite}
          className="btn-paginacion"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}

export default ListaPosts;
