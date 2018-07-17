// determine what set of keys to return depends on the environment

module.exports = (process.env.NODE_ENV === "production" ? require('./prod') : require('./dev'))