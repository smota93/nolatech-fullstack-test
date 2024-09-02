# Instrucciones

# Configuración
- Agregar el archivo .env en la carpeta raiz del proyecto (se recomienda usar el que proporciono como ejemplo debido a que el front no esta configurado para cambiar el puerto de forma automática)
- Ejecutar mongodb desde local o desde docker (estan ambos ejemplos en el .env_example)

# Ejecución
- Ir a la raíz de proyecto y ejecutar "npm install" y luego "npm start" (con esto se va a ejecutar backend y frontend al mismo tiempo)

# Estructura
- Se uso una estructura tradicional para proyecto con el stack MERN con una carpeta para el cliente (frontend) y otra para el server (backend)
- Se simplifico un poco para evitar complejidades innecesarias para el tamaño del proyecto

# Server:
![image](https://github.com/user-attachments/assets/92eb8ed1-8123-4ef7-91b5-996c346bf998)

# Cliente:
![image](https://github.com/user-attachments/assets/3cc38a52-b460-4c15-9763-268dc21f5f0c)

# Diseño
- Server
  - Se implemento un middleware que verifica si el usuario a iniciado sesión para poder ejecutar las consultas con la excepción de las consultas para la autenticación(register, login)
  - Se realizaron validaciones a los datos de entrado usando la libreria "joi"
  - Se realizo la configuración de docker para facilitar la configuración inicial

- Cliente
  - Se utilizo tailwind para facilitar el prototipado rápido de los componentes
  - Se agrego tostify para manejar las notifaciones del sistema
  - Se hizo uso de redux para el manejo del estado de las consultas realizadas
