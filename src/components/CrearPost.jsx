import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function CrearPost() {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [exito, setExito] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const puedeEnviar = titulo.trim() !== '' && contenido.trim() !== '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!puedeEnviar) {
      setError('El titulo y contenido son requeridos');
      return;
    }

    setEnviando(true);
    setError(null);

    try {
      const respuesta = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: titulo,
          body: contenido,
          userId: 1
        })
      });

      if (!respuesta.ok) {
        throw new Error('Error al crear el post');
      }

      setExito(true);
      setTitulo('');
      setContenido('');
      
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="crear-post">
      <Link to="/" className="link-volver">Volver al listado</Link>

      <h2>Crear nuevo post</h2>

      {error && <div className="mensaje error">{error}</div>}
      {exito && <div className="mensaje exito">Post creado exitosamente. Redirigiendo...</div>}

      <form onSubmit={handleSubmit}>
        <div className="grupo-formulario">
          <label htmlFor="titulo">Titulo</label>
          <input
            id="titulo"
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ingresa el titulo del post"
          />
        </div>

        <div className="grupo-formulario">
          <label htmlFor="contenido">Contenido</label>
          <textarea
            id="contenido"
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            placeholder="Ingresa el contenido del post"
            rows="6"
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={!puedeEnviar || enviando}
          className={puedeEnviar ? 'activo' : 'desactivo'}
        >
          {enviando ? 'Enviando...' : 'Crear post'}
        </button>
      </form>
    </div>
  );
}

export default CrearPost;
