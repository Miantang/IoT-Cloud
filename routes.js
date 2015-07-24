var Device = require('./controllers/device');
var User = require('./controllers/user');
module.exports = function(app) {
    // pre handle user
    //app.use(function(req, res, next) {
    //    var _user = req.session.user;
    //
    //    app.locals.user = _user;
    //
    //    next();
    //});
    app.get('/', function(req, res) {
        console.log('user in session: ', req.session.user);
        res.render('index', {
            title: '智能物联'
        })
    });

    // Device
    app.get('/devices', Device.getAllDevices);
    app.get('/devices/:id', Device.getDevice);
    app.post('/devices/:id', Device.updateDevice);
    app.get('/devices/:id/value', Device.getDeviceValue);
    // User
    app.get('/user', User.getUser);
    app.post('/user', User.postUser);
    app.post('/user/signup', User.signup);
    app.post('/user/login', User.login);
};