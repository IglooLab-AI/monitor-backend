import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ActividadList() {
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  axios.get('http://localhost:3001/actividades')
    .then(response => {
      setActividades(response.data);
      setLoading(false);
    })
    .catch(err => {
      console.error('DETALLE DEL ERROR:', err);
      if (err.response) console.error('Respuesta del servidor:', err.response.data);
      setError('Error cargando actividades');
      setLoading(false);
    });
}, []);


  if (loading) return <p>Cargando actividades...</p>;
  if (error)   return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Lista de Actividades</h2>
      <ul>
        {actividades.map(act => (
          <li key={act._id}>
            <strong>{act.pc_name}</strong> – {act.ip} – {new Date(act.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
