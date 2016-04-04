Package.describe({
  name: 'wj32:mysql',
  summary: 'MySQL support with Reactive Select Subscriptions',
  version: '1.1.7',
  git: 'https://github.com/wj32/meteor-mysql.git'
});

Npm.depends({
  'mysql': '2.10.2',
  'mysql-live-select': 'https://github.com/wj32/mysql-live-select/tarball/092f7238eb468dc1a7c87c884b779c330171c1cf'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.use([
    'underscore',
    'ddp',
    'tracker'
  ]);

  api.addFiles('lib/LiveMysql.js', 'server');
  api.export('LiveMysql', 'server');
});

Package.onTest(function(api) {
  api.use([
    'tinytest',
    'templating',
    'underscore',
    'autopublish',
    'insecure',
    'http',
    'grigio:babel@0.1.1',
    'simple:rest@0.2.3',
    'wj32:mysql',
  ]);
  api.use('test-helpers'); // Did not work concatenated above
  api.addFiles([
    'test/helpers/expectResult.js',
    'test/helpers/randomString.js'
  ]);

  api.addFiles([
    'test/fixtures/tpl.html',
    'test/fixtures/tpl.js'
  ], 'client');

  api.addFiles([
    'test/helpers/queryEx.js',
    'test/helpers/querySequence.js',
    'test/index.es6'
  ], 'server');

  api.addFiles([
    'test/MysqlSubscription.js',
//     'test/simple_rest.js'
  ]);
});
