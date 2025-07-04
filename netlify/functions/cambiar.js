// Si usas Node 18+ en Netlify, fetch es global, no hace falta importar node-fetch
 const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Método no permitido, use POST' }),
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { token, nuevaClave } = data;

    if (!token || !nuevaClave) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Faltan token o nuevaClave' }),
      };
    }

    // Usar variable de entorno para la URL de la API
    const apiUrl = process.env.API_URL || 'https://tu-api-url/api/cambiar-clave';

    // Llamada a tu API ASP.NET Core
    const apiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Token: token, NuevaClave: nuevaClave }),
    });

    const apiResult = await apiResponse.json();

    if (!apiResponse.ok) {
      return {
        statusCode: apiResponse.status,
        body: JSON.stringify({ error: apiResult.error || 'Error desconocido' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Contraseña actualizada correctamente' }),
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error interno', details: error.message }),
    };
  }
};

