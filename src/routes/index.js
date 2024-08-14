import googleRouter from './googleRoute.js'
import metaRoute from './metaRoute.js'
import authRoute from './authRoute.js'
import leadPipelineRoute from './leadPipelineRoute.js'
import emailRouter from './emailRoute.js'
import emailTemplateRoute from './emailTemplateRoute.js'
import messagingTemplateSettings from './messagingTemplateSettingsRoute.js'
import surveryRoute from './surveyRoute.js'

export default (prefix, app, io) => {
    app.use(prefix, googleRouter);
    app.use(prefix, metaRoute);
    app.use(prefix, authRoute);
    app.use(prefix, leadPipelineRoute);
    app.use(prefix, emailRouter);
    app.use(prefix, emailTemplateRoute);
    app.use(prefix, messagingTemplateSettings);
    app.use(prefix, surveryRoute);
};