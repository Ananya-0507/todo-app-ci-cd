const http = require('http');
http.get({host:'localhost', port:3000, path:'/todos'}, res => {
  if(res.statusCode === 200){ console.log('OK'); process.exit(0); }
  else { console.error('FAIL'); process.exit(1); }
}).on('error', e => { console.error('ERR'); process.exit(1); });
