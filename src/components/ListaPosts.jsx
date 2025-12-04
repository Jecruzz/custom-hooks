import { useState } from 'react';
import { Link } from 'react-router-dom';
import usePosts from '../hooks/usePosts';

function ListaPosts() {
  const { posts, loading: cargando, error } = usePosts();
  const [paginaActual, setPaginaActual] = useState(1);
  const postsPerPage = 5;

  const indexUltimo = paginaActual * postsPerPage;
  const indexPrimero = indexUltimo - postsPerPage;
  const postsActuales = posts.slice(indexPrimero, indexUltimo);
  const totalPaginas = Math.ceil(posts.length / postsPerPage);

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
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="header-lista">
        <h2>Lista de Posts</h2>
        <Link to="/crear" className="boton-crear">Crear nuevo post</Link>
      </div>
      
      <div className="posts-grid">
        {postsActuales.map(post => (
          <div key={post.id} className="post-card">
            <Link to={`/posts/${post.id}`} className="post-link">Ver Detalle</Link>
            <h3>{post.title}</h3>
            <p>{post.body && post.body.substring(0, 100)}...</p>
          </div>
        ))}
      </div>

      <div className="paginacion">
        <button 
          onClick={() => setPaginaActual(paginaActual - 1)}
          disabled={paginaActual === 1}
          className="boton-pagina"
        >
          Anterior
        </button>

        <span className="info-pagina">
          Pagina {paginaActual} de {totalPaginas}
        </span>

        <button 
          onClick={() => setPaginaActual(paginaActual + 1)}
          disabled={paginaActual === totalPaginas}
          className="boton-pagina"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default ListaPosts;

