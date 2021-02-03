GUIA PARA EL BACKEND

Crear una db por una unica vez con el nombre de :
mobadb

________________________________________________

crear un archivo .env donde llenamos con nuestros datos: 
DB_USER= 
DB_PASSWORD= 
DB_HOST=localhost
________________________________________________

Instalar sequelize-cli en el back:
npm install --save-dev sequelize-cli

Editar la carpeta config.json con los datos de su postgres:

En api/config/config.json:
________________________________________________

{
  "development": {
    "username": "tu user de postgres",
    "password": "tu pw",
    "database": "mobadb",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "tu user de postgres",
    "password": "tu pw",
    "database": "mobadb",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "tu user de postgres",
    "password": "tu pw",
    "database": "mobadb",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
____________________________________________________

Para correr todos los seeders ejecutar este comando parado en /api:
npx sequelize-cli db:seed:all

Para quitar los seeders:
npx sequelize-cli db:seed:undo:all

____________________________________________________

PARA ENVIAR MENSAJES POR WHASTSAPP

Esperar q levante api
Conectarse escaneando el codigo QR usando el lector que brinda la app de whatsapp
Verificar que por consola diga Autenticado
Listo!
