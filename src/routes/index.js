import googleRouter from './googleRoute.js'
import metaRoute from './metaRoute.js'
import authRoute from './authRoute.js'
import leadPipelineRoute from './leadPipelineRoute.js'

export default (prefix, app) => {
    app.use(prefix, googleRouter);
    app.use(prefix, metaRoute);
    app.use(prefix, authRoute);
    app.use(prefix, leadPipelineRoute);
};