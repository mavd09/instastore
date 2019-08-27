# InstaStore

InstaStore es un microservicio encargado de seleccionar la tienda mas cercana para entregar un pedido de comestibles a nuestros clientes.

# Información del requerimiento

## Datos:
Armar una estructura que se acomode a las necesidades (tomar como base las tiendas de Soriana en Monterrey y Ciudad de Mexico).

## Seguridad:
- El API contará con un sistema de inicio de sesión para que sólo usuarios registrados puedan consumir el endpoint
- El API será pública.

## Endpoint principal:
- ¿Cuál es la entrada del endpoint?
````
{
	"expectedDelivery": utcDate,
	"destination": {
		"name": "string",
		"address": "string",
		"address_two": "string",
		"description": "string",
		"country": "string",
		"city": "string",
		"state": "string",
		"zip_code": "string",
		"latitude": number,
		"longitude": number
	}
}
````
- ¿Cuál es la salida del endpoint?
````
{
	"storeId": "string",
	"storeName": "string",
	"isOpen": boolean,
	"coordinates": {
		"latitude": number,
		"longitude": number
	},
	"nextDeliveryTime": utcDate
}
````

- ¿Cuál debe ser el criterio para determinar la tienda más cercana? 
Acá pueden haber dos enfoques (se realizarán ambos y así determinar el más conveniente):
	- Uso de una API externa para consultar cual es la tienda mas conveniente (El hecho de hacer llamado a un API externa podría afectar el rendimiento del endpoint pero el resultado sería mas preciso, pues se tendrían en cuenta aspectos como tráfico y distancia real)
	- Realizar una estimación interna sobre el tiempo de entrega con distancia geográfica (El rendimiento es mejor, pero la información es muy imprecisa, pues no siempre va a haber un camino directo entre los dos puntos además de que no se considere el tráfico)

## Seguimiento del endpoint:

Se almacenará información importante en una base de datos que permita a un administrador poder hacer seguimiento de:

- ¿Cuál es el movimiento de las diferentes tiendas?
- ¿Ubicación de los mayores consumidores?
- ¿Horas de mayor movimiento?

## Características generales:
	
- La API debe ser escrita en Node.js con Express.js
- Tiempo de respuesta de los endpoints debe ser de a lo más 300 ms
- Manejo correcto de respuesta de errores
- Documentación de los endpoints.
- Código que sea fácil de entender y que cumpla con los estándares mínimos de desarrollo

# Arquitectura del microservicio

![Arquitectura de InstaStore](./architecture-instastore.png)

- Se tendrán dos (2) controladores que permitirán desarrollar la funcionalidad antes especificada
	1. UserController: se encargará del inicio de sesión de un usuario, así como su validación.
	2. StoreController: se encargará de buscar la tienda más conveniente para una determinada ubicación además de permitir realizar seguimiento a las tiendas, clientes y estadísticas de interés.

# Entrega del producto

27 de Agosto a las 00:00 UTC

# Documentacion

Ingrese [aqui](http://editor.swagger.io/) y coloque el codigo encontrado en el archivo swagger.yaml del proyecto

# Como correr el proyecto

1. Clone el repo
2. Ejecute el demon de Mongo
3. Ejecute `npm install`
4. Pruebe los endpoints

# Improvements and trade offs

1. What would you improve from your code? why?
	- Validaciones: por tiempo no tuve en cuenta muchos casos que deberían ser de importancia
	- La funcion que permite obtener los datos de las tiendas no funciona como debe ser, no me fue posible identificar el error
	- Agregar un endpoint para poder aprovechar la informacion que se almacena en los logs
	- Utilizar un API externa para calcular con mas precision la distancia entre dos puntos por su latitud y longitud y teniendo en cuenta aspectos como el tráfico
	- Simplificar la lógica de algunas funciones en los controladores, ya sea separando el código en funciones más pequeñas o creando documentación en el código
	- Integración de swagger para un obtener un mejor seguimiento de los endpoints
2. Which trade offs would you make to accomplish this on time? What'd you do next time to deliver more and sacrifice less?
	- El uso de librerias es bastante importante, de hecho llegué a programar algo que luego supe que estaba implementado en una librería y esto hace más limpio el código
	- Uso de comentarios en el código para poder recordar partes tediosas
	- Consultar a alguien que tenga más experiencia usando el lenguaje y el framework facilitaría el desarrollo
3. Do you think your service is secure? why?
	- Si, cumple con unos mínimos estándares, uso de autenticación para usar el endpoint, encripción de las contraseñas en la base de datos, acceso a la base de datos restrigido por un usuario y contraseña
4. What would you do to measure the behaviour of your product on a production environment?
	- El uso de los datos en la colección "logs" permite hacer un seguimmiento de lo que ha sucedido con los llamados exitosos al API
	- Sería bueno manejar de mejor manera los errores que pueden ser arrojados por el usuario, esto con el fin de identificar posibles errores
