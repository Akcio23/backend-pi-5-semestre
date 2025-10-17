import express from 'express'
import cors from 'cors'

export const app = express()

app.use(cors())
app.use(express.json())


const configServer = () => {
  const PORT = process.env.PORT || 9000  

  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
  })
}

export default configServer