Package.describe({
  name: 'vlasky:mysql',
  summary: 'MySQL support with Reactive Select Subscriptions',
  version: '1.2.2',
  git: 'https://github.com/vlasky/meteor-mysql.git'
});

Npm.depends({
  'lodash': '4.14.0',
  'mysql': '2.11.1',
  'mysql2': '1.1.1',
  'mysql-live-select': 'https://github.com/vlasky/mysql-live-select/tarball/bf237e017074f232a52050f69d92eb108624e909'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.use([
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
    'vlasky:mysql',
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
