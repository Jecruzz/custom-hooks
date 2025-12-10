import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router";
import { useFetch } from '../hooks/useFetch';

function DetallePost() {
  const [eliminando, setEliminando] = useState(false);

  const { id: postId } = useParams();
  const navigate = useNavigate();

  const { data: post, loading: cargando, error } = useFetch(`/api/posts/${postId}`);
  const { data: usuario, loading: cargandoUsuario } = useFetch(post ? `/api/users/${post.userId}` : null);

  // useEffect(() => {
  //   const cargarDetalles = async () => {
  //     try {
  //       setCargando(true);
        
  //       // PASO 7: Cargar el post
  //       // TODO: Fetch a https://jsonplaceholder.typicode.com/posts/{postId}
  //       const respuesta = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  //       if (!respuesta.ok) {
  //         throw new Error('Error al cargar el post');
  //       }
  //       const datosPost = await respuesta.json();
  //       setPost(datosPost);
        
  //       // PASO 8: Cargar el usuario del post
  //       // TODO: Fetch a https://jsonplaceholder.typicode.com/users/{post.userId}
  //       const respuestaUsuario = await fetch(`https://jsonplaceholder.typicode.com/users/${datosPost.userId}`);
  //       if (!respuestaUsuario.ok) {
  //         throw new Error('Error al cargar el usuario');
  //       }
  //       const datosUsuario = await respuestaUsuario.json();
  //       const usuario = {
  //         name: datosUsuario.name,
  //         email: datosUsuario.email
  //       }
  //       setUsuario(usuario);
        
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setCargando(false);
  //     }
  //   };

  //   if (postId) {
  //     cargarDetalles();
  //   }
  // }, [postId]);

  if (cargando) {
    return (
      <div className="cargando">
        <div className="spinner"></div>
        <p>Cargando detalles...</p>
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

  const handleEliminar = async () => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este post?')) {
      return;
    }

    try {
      setEliminando(true);
      const respuesta = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE'
      });

      if (!respuesta.ok) {
        throw new Error('No se pudo eliminar el post');
      }

      console.log('Post eliminado:', postId);
      // Redirigir a la lista de posts
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar el post: ' + error.message);
    } finally {
      setEliminando(false);
    }
  };

  if (!post) {
    return <div className="error">Post no encontrado</div>;
  }

  return (
    <div className="detalle-container">
      {/* PASO 9: Agregar Link/botón para volver a la lista */}
      {/* <button className="boton-volver" href="/">← Volver a la lista</button> */}
      <Link to="/" className="boton-volver">← Volver a la lista</Link>

      <div className="detalle-post">
        <h2>{post.title}</h2>
        
        <div className="autor-info">
          {cargandoUsuario ? (
            <p>Cargando información del usuario...</p>
          ) : usuario ? (
            <div className="autor">
              <div className="autor-nombre">
                <strong>Autor:</strong> {usuario.name}
              </div>
              <div className="autor-email">
                <strong>Email:</strong> {usuario.email}
              </div>
              <div className="autor-username">
                <strong>Usuario:</strong> {usuario.username}
              </div>
              {usuario.company && (
                <div className="autor-empresa">
                  <strong>Empresa:</strong> {usuario.company.name}
                </div>
              )}
              {usuario.phone && (
                <div className="autor-telefono">
                  <strong>Teléfono:</strong> {usuario.phone}
                </div>
              )}
            </div>
          ) : (
            <p>No se pudo cargar la información del usuario.</p>
          )}
        </div>
        
        <div className="contenido">
          <p>{post.body}</p>
        </div>

        <div className="acciones">
          <Link to={`/posts/${postId}/edit`} className="btn-editar">
            ✏️ Editar
          </Link>
          <button 
            onClick={handleEliminar} 
            className="btn-eliminar"
            disabled={eliminando}
          >
            {eliminando ? 'Eliminando...' : '🗑️ Eliminar'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetallePost;
