import './App.css'
import { Routes, Route } from 'react-router-dom'
import ListaPosts from './components/ListaPosts'
import DetallePost from './components/DetallePost'
import CrearPost from './components/CrearPost'

function App() {
  return (
    <div className="App">
      <header>
        <h1>App de Posts</h1>
        <p>Aplicación para visualizar posts y sus detalles</p>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<ListaPosts />} />
          <Route path="/posts/:id" element={<DetallePost />} />
          <Route path="/crear" element={<CrearPost />} />
        </Routes>

      </main>
    </div>
  )
}

export default App
