var localtunnel = require('localtunnel');
localtunnel(5000, { subdomain: 'mahmoudelzoka1234' }, function(err, tunnel) {
  console.log('LT running');
});