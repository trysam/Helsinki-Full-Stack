const app = require('./app')

const logger = require('./util/logger')
const config = require('./util/config')


app.listen(config.PORT, () => {
    logger.info('Server running on port', config.PORT)
})
