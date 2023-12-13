import googleRouter from './googleRoute.js'
import metaRoute from './metaRoute.js'

export default (prefix, app) => {
    app.use(prefix, googleRouter);
    app.use(prefix, metaRoute);
};