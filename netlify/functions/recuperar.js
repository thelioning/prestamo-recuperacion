const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
  try {
    const { correo } = JSON.parse(event.body);

    if (!correo || !correo.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Correo inválido.' }),
      };
    }

    // Generar token aleatorio (simplificado)
    const token = Math.random().toString(36).substring(2, 15);

    // Aquí deberías guardar token en base de datos para validar luego (fuera de este ejemplo)

    const urlRecuperacion = `https://tu-proyecto.netlify.app/recuperar?token=${token}`;

    // Configura el transporte SMTP (aquí con Gmail)
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'tucorreo@gmail.com',       // Cambia a tu correo real
        pass: 'tu_clave_o_app_password',  // Cambia a tu password o app password
      },
    });

    let mailOptions = {
      from: '"PrestamoApp Soporte" <tucorreo@gmail.com>',
      to: correo,
      subject: 'Recuperación de contraseña - PrestamoApp',
      html: `
        <h3>Solicitud de recuperación de contraseña</h3>
        <p>Haz clic en este enlace para recuperar tu contraseña:</p>
        <a href="${urlRecuperacion}">${urlRecuperacion}</a>
        <p>El enlace expirará en 1 hora.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Correo enviado' }),
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error interno del servidor' }),
    };
  }
};
