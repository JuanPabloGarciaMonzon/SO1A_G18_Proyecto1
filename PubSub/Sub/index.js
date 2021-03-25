const { PubSub } = required("@google-cloud/pubsub");
const SUB_NAME = 'projects/mystical-atlas-308503/subscriptions/MensajePrueba';
const TIMEOUT = process.env.TIMEOUT || 180;

const client = new PubSub();

const mensajes = [];

const leerMensaje = mensaje =>{
    console.log("Mensaje: ${mensaje.id} ${mensaje.data} ");

    mensajes.push(mensaje);
};

const escucharEvento =()=>{

    const suscriptor = cliente.subscription(SUB_NAME);
    subscriptor.on("Message",leerMensaje);

    setTimeout(() => {
        
    }, timeout);
}