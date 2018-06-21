var express = require('express');
var router = express.Router();

var user=null;

router.param('id', function (req, res, next, id) {
  console.log('CALLED ONLY ONCE');
  user=id;
  next();
});

router.get('/', function(req, res, next) {
  res.render('chatvista', { title: 'Sala de Chat ',id:'Desconocido' });
  //console.log(req);
});

router.get('/:id', function(req, res, next) {
  res.render('chatvista', { title: 'Sala de Chat ',id:user });
});

module.exports = router;
