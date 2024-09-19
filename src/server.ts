import express from 'express'
import router from './router'
import db from './config/db'
import colors from 'colors'
import cors, {CorsOptions} from 'cors'
import morgan from 'morgan'

// conectar a base de datos
async function conectarDB() {
  try {
    await db.authenticate()
    db.sync()
    console.log(colors.magenta('conexion exitosa a la bd'));

  } catch (error) {
    console.log(error);
    console.log(colors.bgRed.white('hubo un error al conectar a la bd'));
  }
}

// Conectar con la bd
conectarDB()

// Instancia de express
const server = express()

// permitir conexiones
const corsOpciones : CorsOptions= {
  origin: function(origin, callback){
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true)
    } else {
      console.log('denegar...');
      callback(new Error('Error de cors'))
    }
  }
}
server.use(cors(corsOpciones))

server.use(morgan('dev'))

// Leer datos de formularios
server.use(express.json())

server.use('/api/productos', router)

export default server


// req lo que se envia, como un formulario por ejemplo
// res la respuesta que obtienes cuando envias el request