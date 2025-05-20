export const verificationEmailTemplate = ({name, link} : {name: string, link: string}) => `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Verificación de Email</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
        <tr>
          <td style="padding: 40px 30px;">
            <h1 style="color: #333333;">Verifica tu email</h1>
            <p style="color: #555555; font-size: 16px;">
              Hola <strong>${name}</strong>,<br><br>
              Para verificar tu correo electrónico, por favor haz clic en el siguiente enlace:
            </p>
            <p style="text-align: center; margin: 30px 0;">
              <a href="${link}" style="background-color: #4CAF50; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; display: inline-block; font-size: 16px;">
                Verificar Email
              </a>
            </p>
            <p style="color: #999999; font-size: 14px;">
              Si tú no solicitaste esta verificación, puedes ignorar este mensaje.
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
`