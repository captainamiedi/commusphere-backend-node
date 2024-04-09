import googleRouter from './googleRoute.js'
import metaRoute from './metaRoute.js'
import authRoute from './authRoute.js'
import leadPipelineRoute from './leadPipelineRoute.js'
import emailRouter from './emailRoute.js'

export default (prefix, app, io) => {
    app.use(prefix, googleRouter);
    app.use(prefix, metaRoute);
    app.use(prefix, authRoute);
    app.use(prefix, leadPipelineRoute);
    app.use(prefix, emailRouter);
};