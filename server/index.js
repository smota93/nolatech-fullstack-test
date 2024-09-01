require('dotenv').config() // Secures variables
const app = require('./utils/app') // Backend App (server)
const mongo = require('./utils/mongo') // MongoDB (database)
const { PORT } = require('./constants')
const router = require('./routes')

async function bootstrap() {
  await mongo.connect()
  app.use('/api', router)
  app.listen(PORT, () => {
    console.log(`✅ Server is listening on port: ${PORT}`)
  })
}

bootstrap()
