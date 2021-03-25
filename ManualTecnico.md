# Universidad de San Carlos de Guatemala
# Facultad de Ingeniería
# Escuela de Ciencias y Sistemas
# Sistemas Operativos 
# Proyecto 1 - Grupo #18
![texto_alternativo](https://i.pinimg.com/originals/e7/94/6c/e7946c7073fc9df995f6047d17125afe.png)


## Arquitectura
![texto_alternativo](https://github.com/JuanPabloGarciaMonzon/SO1A_G18_Proyecto1/blob/main/images/arquitectura.png)

## Tecnologías utilizadas

### Locust
 ![texto_alternativo](https://github.com/JuanPabloGarciaMonzon/SO1A_G18_Proyecto1/blob/main/images/locust.png)
 
 
Generador de tráfico que en este caso es el encargado de recibir el JSON y enviarlo al balanceador de carga; está basado en Python. Este genera un archivo traffic.json. Se debe configurar el numero de usuarios totales, tasa de generación y su respectivo host. El archivo de la aplicación es traffic.py.


### Google Cloud Balancer
![texto_alternativo](https://github.com/JuanPabloGarciaMonzon/SO1A_G18_Proyecto1/blob/main/images/googleloadbalancer.png)


Google Cloud Balancer para manejar el flujo de datos que ingresa desde Locust a los diferentes servicios disponibles, 4 máquinas virtuales con diferentes intermediarios, como lo son:


### GRPC
![texto_alternativo](https://github.com/JuanPabloGarciaMonzon/SO1A_G18_Proyecto1/blob/main/images/grcp.png)


Tendremos un cliente y un servidor de GRPC programados en Go. Este sistema de llamada a un procedimiento remoto proporciona características como autenticación, transmisión bidireccional y control de flujo, entre otras cosas. 


### RabbitMQ
![texto_alternativo](https://github.com/JuanPabloGarciaMonzon/SO1A_G18_Proyecto1/blob/main/images/rabbitmq.png)

Es un sistema de mensajería no tan pesado, pero con muchas opciones disponibles para los usuarios, lo que hacen de este software una herramienta para tomar en cuanta en desarrollos donde se necesiten este tipo de soluciones.


### Nats
![texto_alternativo](https://github.com/JuanPabloGarciaMonzon/SO1A_G18_Proyecto1/blob/main/images/nats.png)

Es un software open-source de mensajería que actúa como una cola de mensajes distribuida para aplicaciones nativas en la nube.
