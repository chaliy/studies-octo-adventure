var exphbs  = require('express-handlebars');

module.exports = app => {
  app.engine('handlebars', exphbs({
    layoutsDir: __dirname + '/../../app/views/layouts/',
    defaultLayout: 'main',
    partialsDir: [__dirname + '/../../app/views/partials/'],
    helpers: {
        select: (value, options) => {
          return options.fn(this)
            .split('\n')
            .map(option => {
                var expected = 'value=\'' + value + '\'';
                return RegExp(expected).test(option)
                  ? option.replace(expected, expected + ' selected')
                  : option;
            })
            .join('\n');
        },
        debug: (value) => {
          console.log('\n DEBUG \n')
          console.log(value);
          console.log('\n //DEBUG \n')
          return JSON.stringify(value);

        }
    }
  }));
  app.set('views', __dirname + '/../../app/views');
  app.set('view engine', 'handlebars');
};
