// import express and cors
import express from 'express'
import cors from 'cors'
import { handler } from './index.js'

const port = process.env.PORT || 8080
const server = express()
server.use(cors())

;(async () => {
    server
        .get(`*`, async (req, res) => {
            const response = await handler({ rawPath: req.path })

            res
                .status(response.statusCode)
                .set(response.headers)
                .send(response.body)
        })
})()

server.listen(port, () => console.log(`Server started listening on port ${port}.`))
