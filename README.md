# Chatbot NAO para estación de Autobuses en Sevilla

Este proyecto tiene como objetivo brindar apoyo al personal de servicio en una estación de autobuses _ficticia_ en sevilla, donde el robot operaría como _chatbot_ escuchando las solicitudes de un viajante, respondiéndo a preguntas como _¿Cuál es el próximo autobus a un destino? ¿Cuáles son los próximos autobuses en salir? y ¿Cuáles son los autobuses que se dirigen a un destino hoy?_, a la vez de leer un boleto codificado por *QR* y respondiéndo el estado del autobus, si ha salido o está próximo a salir.

### Arquitectura Técnica
* Choregraphe Suite 2.1.4.
* Python 2.7 como lenguaje de scripting.
* Node.JS como servidor de peticiones HTTP.

## Servidor Viajes de Autobuses
Es un servidor de peticiones HTTP bajo la arquitectura _REST_, donde para cada ruta (_URL_) retorna data semánticamente asociada a la misma.

El servidor atiende las peticiones por defecto en el puerto `5050`, o en su efecto el valor definido en la variable de ambiente `port`. Las estaciones destinos definidas son: _Cordoba_, _Malaga_, y _Granada Bus Station_. La hora a emplezar para las consultas son en formato 24 horas (_00:00_ a _23:59_) Conociendo esto tenemos las siguientes rutas:

1. `http://localhost:5050/api/v1/bus`: Retorna el itinerario de autobuses del día.
1. `http://localhost:5050/api/v1/bus/next`: Retorna los autobuses próximos a salir.
1. `http://localhost:5050/api/v1/bus/next/:destino`: Retorna el autobús próximo a salir al destino especificado en `:destino`.
1. `http://localhost:5050/api/v1/bus/next/:destino/today`: Retorna las salidas de autobuses para el destino especificado en `:destino` en lo restante del día.
1. `http://localhost:5050/api/v1/bus/to/:destino`: Retorna todas las salidas de autobuses en el día para el destino especificado en `:destino`.
1. `http://localhost:5050/api/v1/bus/status/:destino/:hora`: Retorna el estado de la salida del autobús con el destino especificado en `:destino` para la hora definida en `:hora`.

### Base de Datos

La base de datos utilizada es un archivo de formato `JSON` el cual contiene toda la data a utilizar.

### Requerimiento previo

Tener instalado `node.js`. Muchos sistemas operativos modernos tienen este paquete instalado por defecto, en caso de no poseerlo, puede conseguirlo en su sitio [web](https://nodejs.org/en/download/) o bien instalarlo por consola como sigue:
* Ubuntu
```bash
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install -y nodejs
```

* Mac
```bash
brew install node
```

* Windows: Se recomienda utilizar el instalador provisto en el sitio web.

### Puesta en marcha del servidor

El proyecto del servidor contiene en el archivo `package.json` la lista de dependencias que necesita, asimismo los pasos para iniciar. Para satisfacer esto, una vez teniendo `node.js` instalado, desde la terminal o consola de preferencia, dentro de la raíz del proyecto se ejecuta lo siguiente:

* Instalar paquete: `npm install`
* Ejecutar el servidor: `npm run start`

Tras ejecutar el segundo paso, podemos ver una salida como esta:

![image](./img/npm-start.png)

## Billete QR

Representa un billete codificado mediante QR el cual contiene el destino y la hora, de esta manera puede hacer la consulta nro. 6 (`http://localhost:5050/api/v1/bus/status/:destino/:hora`). Un código de ejemplo sería:

![alt text](./img/demo_qr.png)

Para generar unos cuantos billetes de prueba, basta con correr el script `qr_gen.py` bajo la carpeta `test/` en el proyecto del servidor.

Es posible que necesite instalar la dependencia `qrcode` para ejecutar el script en cuestión, por lo que se necesitaría ejecutar lo siguiente:

```bash
py -2 pip install qrcode
```

Una vez instalada la dependencia, se procede a ejecutar el guión y generar unos cuantos billetes de prueba.

```bash
py -2 test\qr_gen.py
```

## Chatbot NAO para Usuarios de Autobuses

Es un proyecto hecho en _Choregraphe 2.1.4_ apuntando a ser desplegado en un _Robot NAO_. El proyecto se apoya de los sensores de audio y visión del robot en cuestion, para procesar lo capturado, ya sea una órden de voz o una representación de un billete de autobús mediante un código QR.

