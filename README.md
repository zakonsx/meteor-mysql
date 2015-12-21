# wj32:mysql
Reactive MySQL for Meteor

NOTE: The version of mysql-live-select used by this package differs from
numtel's original package in that result sets are treated as dictionaries rather
than arrays. In this version, the identity of each row is determined by a
`LiveMysqlKeySelector` that is passed into the `select` function.

`MysqlSubscription` has been removed. To subscribe to a `LiveMysqlSelect`
publication, use `Meteor.subscribe()`.

Provides Meteor integration of the [`mysql-live-select` NPM module](https://github.com/wj32/mysql-live-select), bringing reactive `SELECT` statement result sets from MySQL >= 5.1.15.

> If you do not have MySQL server already installed, you may use the [`numtel:mysql-server` Meteor Package](https://github.com/numtel/meteor-mysql-server) to bundle the MySQL server directly to your Meteor application.

* [`numtel:pg` Reactive PostgreSQL for Meteor](https://github.com/numtel/meteor-pg)
* [How to publish joined queries that update efficiently](https://github.com/numtel/meteor-mysql/wiki/Publishing-Efficient-Joined-Queries)
* [Leaderboard example modified to use MySQL](https://github.com/numtel/meteor-mysql-leaderboard)
* [Talk at Meteor Devshop SF, December 2014](https://www.youtube.com/watch?v=EJzulpXZn6g)

> This documentation covers `wj32:mysql` **>= 1.0.0**. For older versions (0.1.0 - 0.1.14) that used the old difference calculator, see the [the tree from this commit](https://github.com/numtel/meteor-mysql/tree/9edd9ca83388cc82496f87e91153a4a9f51fb5de). Also see the [old documentation for `mysql-live-select` that matches these older versions](https://github.com/numtel/mysql-live-select/tree/89691160b7e1fbfde1ae7055980668ceb4182f8a).

> For the oldest versions (< 0.1.0) that included the trigger poll table that worked with MySQL < 5.1.15, see the [old branch](https://github.com/numtel/meteor-mysql/tree/old).

## Server Implements

This package provides the `LiveMysql` class as defined in the [`mysql-live-select` NPM package](https://github.com/wj32/mysql-live-select). Be sure to follow the installation instructions for configuring your MySQL server to output the binary log.

For operations other than `SELECT`, like `UPDATE` and `INSERT`, an active [`node-mysql`](https://github.com/felixge/node-mysql) connection is exposed on the `LiveMysql.db` property.

### `LiveMysql.prototype.select()`

In this Meteor package, the `LiveMysqlSelect` object returned by the `select()` method is modified to act as a cursor that can be published.

```javascript
var liveDb = new LiveMysql(Meteor.settings.mysql);

Meteor.publish('allPlayers', function(){
  return liveDb.select(
    `SELECT * FROM players ORDER BY score DESC`,
    LiveMysqlKeySelector.Index(),
    [ { table: 'players' } ]
  );
});
```

## Tests / Benchmarks

A MySQL server configured to output the binary log in row mode is required to run the test suite.

The MySQL connection settings must be configured in `test/settings/local.json`.

The database specified should be an empty database with no tables because the tests will create and delete tables as needed.

If you set the `recreateDb` value to true, the test suite will automatically create the database, allowing you to specify a database name that does not yet exist.

```bash
# Install Meteor
$ curl -L https://install.meteor.com/ | /bin/sh

# Clone Repository
$ git clone https://github.com/numtel/meteor-mysql.git
$ cd meteor-mysql

# Configure database settings in your favorite editor
# (an empty database is suggested)
$ ed test/settings/local.json

# Run test/benchmark server
$ meteor test-packages --settings test/settings/local.json ./

```

## License

MIT
