export default [
  // Replace 'node:crypto' module with a "shim".
  {
    include: [
      // `require()`s.
      './src/dialects/abstract/query.js',
      './src/dialects/abstract/query-generator.js',
      './src/dialects/mssql/query-generator.js',
      './src/dialects/db2/query-generator.js',
      // `import`s.
      './src/utils/dialect.ts',
      './src/dialects/sqlite/query-generator-typescript.ts',
      './src/dialects/sqlite/query-interface.ts',
    ],
    packages: {
      crypto: 'crypto',
      'node:crypto': 'crypto',
    },
  },

  // Replace 'node:util' module with a "shim".
  {
    include: [
      // `require()`s.
      './src/dialects/abstract/query-generator.js',
      './src/dialects/ibmi/query-generator.js',
      './src/model.js',
      './src/data-types.ts',
      './src/instance-validator.js',
      // `import`s.
      './src/geo-json.ts',
      './src/dialects/sqlite/connection-manager.ts',
      './src/model-definition.ts',
      './src/model-internals.ts',
      './src/associations/helpers.ts',
      './src/decorators/legacy/associations.ts',
      './src/dialects/abstract/data-types-utils.ts',
      './src/dialects/abstract/data-types.ts',
      './src/dialects/abstract/query-generator-typescript.ts',
      './src/dialects/abstract/query-generator.js',
      './src/dialects/abstract/query.js',
      './src/dialects/abstract/where-sql-builder.ts',
      './src/dialects/abstract/where-sql-builder.ts',
      './src/utils/deprecations.ts',
      './src/utils/dialect.ts',
      './src/utils/immutability.ts',
      './src/utils/logger.ts',
      './src/utils/string.ts',
      './src/dialects/sqlite/data-types.ts',
      './src/dialects/sqlite/connection-manager.ts',
      // Non-browser dialects (unused):
      './src/dialects/mariadb/query.ts',
      './src/dialects/mysql/connection-manager.ts',
      './src/dialects/mysql/query.ts',
      './src/dialects/mysql/query-generator.ts',
      './src/dialects/mssql/data-types.ts',
      './src/dialects/db2/connection-manager.ts',
      './src/dialects/db2/query.ts',
      './src/dialects/oracle/connection-manager.ts',
      './src/dialects/oracle/query-generator.ts',
      './src/dialects/postgres/range.ts',
      './src/dialects/postgres/connection-manager.ts',
      './src/dialects/postgres/query-generator.ts',
      './src/dialects/snowflake/query-generator.ts',
      // Inside third-party modules.
      '../../node_modules/wkx/lib/geometrycollection.js',
      '../../node_modules/wkx/lib/linestring.js',
      '../../node_modules/wkx/lib/multilinestring.js',
      '../../node_modules/wkx/lib/multipoint.js',
      '../../node_modules/wkx/lib/multipolygon.js',
      '../../node_modules/wkx/lib/point.js',
      '../../node_modules/wkx/lib/polygon.js',
    ],
    packages: {
      'node:util': 'util',
      'util': 'util'
    },
  },

  // Replace 'node:buffer' module with a "shim".
  {
    include: [
      // `import`s.
      './src/dialects/abstract/data-types.ts',
    ],
    packages: {
      'node:buffer': 'buffer',
    },
  },

  // Replace 'node:assert' module with a "shim".
  {
    include: [
      // `require()`s.
      './src/model.js',
      // `import`s.
      './src/transaction.ts',
      './src/associations/belongs-to.ts',
      './src/associations/helpers.ts',
      './src/dialects/abstract/query-interface-internal.ts',
      './src/dialects/abstract/query-interface-typescript.ts',
      './src/utils/format.ts',
      // Non-browser dialects (unused):
      './src/dialects/db2/query.ts',
      './src/dialects/postgres/data-types-db.ts',
      './src/dialects/mysql/connection-manager.ts',
      './src/dialects/db2/connection-manager.ts',
      './src/dialects/postgres/connection-manager.ts',
      './src/dialects/postgres/data-types.ts',
    ],
    packages: {
      'node:assert': 'assert',
      'assert': 'assert',
    },
  },

  // Replace 'node:url' module with a "shim".
  {
    include: [
      // `require()`s
      './src/sequelize.js',
      // `import`s.
      './src/utils/url.js',
    ],
    packages: {
      'node:url': 'url',
      'url': 'url',
    },
  },

  // Replace 'node:fs' module with a "shim".
  {
    include: [
      // `import`s.
      './src/dialects/sqlite/connection-manager.ts',
      // Inside third-party modules.
      '../../node_modules/pg-connection-string/index.js',
    ],
    packages: {
      'node:fs': 'fs',
      fs: 'fs'
    },
  },

  // Replace 'node:path' module with a "shim".
  {
    include: [
      // `require()`s.
      './src/sequelize.js',
      // `import`s.
      './src/dialects/sqlite/connection-manager.ts',
      './src/utils/url.ts',
    ],
    packages: {
      'node:path': 'path',
      'path': 'path',
    },
  },

  // Replace 'node:async_hooks' module with a "shim".
  {
    include: [
      // `import`s.
      './src/sequelize-typescript.ts',
    ],
    packages: {
      'node:async_hooks': 'async_hooks',
    },
  },

  // Replace 'pg-hstore' module with a "shim".
  {
    include: [
      // `import`s.
      './src/dialects/postgres/hstore.ts',
    ],
    packages: {
      'pg-hstore': 'pg-hstore',
    },
  },

  // Replace 'fast-glob' module with a "shim".
  {
    include: [
      // `import`s.
      './src/import-models.ts',
    ],
    packages: {
      'fast-glob': 'fast-glob',
    },
  },

  // Replace 'uuid' module with a "shim".
  {
    include: [
      // `import`s.
      './src/utils.ts',
      './src/dialects/abstract/query-generator.ts',
      './src/dialects/abstract/query.ts',
      './src/dialects/abstract/query-generator/transaction.ts',
    ],
    packages: {
      'uuid': 'uuid',
    },
  },
];
