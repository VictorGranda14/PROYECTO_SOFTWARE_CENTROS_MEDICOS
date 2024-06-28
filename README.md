# PROYECTO_SOFTWARE_CENTROS_MEDICOS
Repositorio que contiene un prototipo funcional de un software para ayudar a la gestión de centros médicos de pequeña y mediana envergadura.

### Instrucciones uso

1.-Instalar todas las dependencias del proyecto con "npm install" en el directorio del proyecto.

2.-Instalar Node.js desde su sitio oficial en la web.

3.-Para compilar el backend, se debe ingresar a la carpeta /server ("cd server" desde el directiorio principal), instalar las dependencias en caso de ser necesario con npm install, y luego ingresar el comando: "npx nodemon dist/index.js"

4.-Para compilar la aplicación, se abre un nuevo terminal y se ingresa a la carpeta /IONIC ("cd ionic" desde el directiorio principal) y se utiliza el comando "ionic serve". (esto debería ejecutar la aplicación en su navegador por defecto)

* Credenciales de paciente para pruebas:
        
        email: victor.granda@example.com 
        password: paciente1

* Credenciales de administrador para pruebas:
        
        email: admin@example.com   
        password: admin1

### Importar Base de datos:

* Se debe tener instalado mysql workbench

1.-Abrir MySQL Workbench.

2.-Se debe acceder a su servidor MySQL. (Servidor Local por defecto)

3.-Crear un nuevo schema llamado "bd_centros_medicos".

4.-Importar el Archivo .sql adjunto:

    - Se debe ir a Server > Data Import en el menú superior.
    - Selecciona la opción "Import from Self-Contained File" y se elige el archivo .sql que fue adjunto.
    - Se elige la base de datos "bd_centros_medicos".
    - Click en Start Import para comenzar el proceso de importación.

5.-Luego debemos dirigirnos al proyecto e ingresamos a la carpeta /server -> /src -> /db

6.-Y finalmente debemos modificar el archivo llamado "connection.js" con nuestras credenciales *(linea 4):

    - Por ejemplo:
    var sequelize = new sequelize_1.Sequelize('bd_centros_medicos', 'user' ("root" por defecto), 'contraseña')
