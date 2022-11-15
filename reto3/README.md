Al igual que el Reto 1, tienes que poner junto a server.js un archivo llamado .env el cuál debe tener lo siguiente
```
MONGODB_URI=<El enlace de conección a tu cluster de MongoDB>
ACCOUNT_SID=<Código de la cuenta SID en twilio>
AUTH_TOKEN=<Códgio del token en Twilio>
SENDGRID_API_KEY=<API Key de SendGrid>
```
Y para instalar lo que toque, usa estos comandos

```
npm install twilio dotenv express mongoose
npm install --save @sendgrid/mail
```
## Razones
 * Twilio al igual que SendGrid tiene sus propias librerías de Node.JS por lo que tienen que importarse para esta
 ocasión
 * Necesitamos importar .env que estabamos hablando, por lo tanto debemos instalar dotenv
 * Normalmente usamos express para este tipo de proyectos, por lo que también se nos hace cliché hacer esto
 * Como usaremos mongoDB pues tenemos que usar las librerías base para este tipo de proyectos
