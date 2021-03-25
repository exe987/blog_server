BLOG_SERVER 🚀

Vas a poder clonar el repositorio desde https://github.com/exe987/blog_server.git.

Requisitos 📋

Para que la aplicación funcione deberás tener instalado Node JS, Mysql y Postman en tu sistema.

Desde Node JS he instalado los paquetes que utilicé para el desarrollo del proyecto.

Instalación 🔧

Una vez clonado el repo, a través de la consola nos ubicamos sobre el directorio de blog_server y ejecutamos:

npm install

Esto descargará todos los paquetes para el desarrollo del proyecto. Luego de que termine de descargar para prender el servidor ejecutamos:

npm run dev

La app empezará a correr en el http://localhost:4000 

Procederemos a activar mysql en segundo plano a través de la consola:
"mysql -u root -p"

Luego, en esa misma consola ejecutamos la directiva:

"create database blog character set utf8;"

Esto generará la base de datos "blog" en la que sequelize va a crear las tablas de datos.

Abrimos Postman y, utilizando los endpoints, procedemos a probar las rutas.

ENDPOINTS:

POST http://localhost:4000/api/posts
Deberá guardar un nuevo post según los datos recibidos en la petición.

GET http://localhost:4000/api/posts
Deberá mostrar un listado de posts, ordenados por fecha de creación, en forma descendente. Este listado deberá mostrar solamente los campos ID, título, imagen, categoría y fecha de creación.

GET http://localhost:4000/api/posts/:id
Deberá buscar un post cuyo id sea el especificado en el parámetro :id. Si existe, devolver sus detalles, caso contrario devolver un mensaje de error.

PATCH http://localhost:4000/api/posts/:id
Deberá actualizar el post con el id especificado en el parámetro :id, y actualizar sus datos según el cuerpo de la petición. En el caso de que no exista, devolver un mensaje de error.

DELETE PATCH http://localhost:4000/api/posts/:id
Deberá eliminar el post con el id especificado en el parámetro :id. En el caso de que no exista, devolver un mensaje de error.


Autor✒️

Soto, Angel Exequiel

github: https://github.com/exe987

linkedin: https://linkedin.com/in/exesoto