module.exports = (app) => {
    app.use('/auth/google', require('./authRoutes'));
}
