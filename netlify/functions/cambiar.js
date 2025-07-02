exports.handler = async function(event, context) {
  try {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Método no permitido, use POST' }),
      };
    }

    const data = JSON.parse(event.body);
    const { token, nuevaClave } = data;

    if (!token || !nuevaClave) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Faltan token o nuevaClave' }),
      };
    }

    // Por ahora, solo respondemos con los datos recibidos (para probar)
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Datos recibidos correctamente',
        token,
        nuevaClave,
      }),
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error interno', details: error.message }),
    };
  }
};
