module.exports = (app) => {
    app.use(require('./authRoutes'));
    app.use(require('./billingRoutes'));
    app.use(require('./surveyRoutes'));
}