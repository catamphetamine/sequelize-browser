import { Buffer } from 'buffer'
import { expect } from 'chai'
import URL from 'node:url'

import Sequelize from '../sequelize.js'
import SequelizeCJS from '../sequelize.cjs'

import sqlJsAsSqlite3 from 'sql.js-as-sqlite3'

describe('sequelize', function() {
	it('should work', async function() {
		const sequelize = new Sequelize('sqlite://:memory:', { dialectModule: sqlJsAsSqlite3 });

		const User = sequelize.define('user', {
			username: Sequelize.STRING,
			birthday: Sequelize.DATE
		})

		await sequelize.sync()

		// Create and fetch a record.

		let user = await User.create({
			username: 'jane',
			birthday: Date.UTC(1980, 6, 1)
		})

		user = user.get({ plain: true })
		delete user.createdAt
		delete user.updatedAt

		expect(user).to.deep.equal({
			id: 1,
			username: 'jane',
			birthday: new Date('1980-07-01T00:00:00.000Z')
		})

		// Clear the database.
		await User.truncate()
	})

	it('should work (CommonJS)', async function() {
		const sequelize = new SequelizeCJS('sqlite://:memory:', { dialectModule: sqlJsAsSqlite3 });

		const User = sequelize.define('user', {
			username: Sequelize.STRING,
			birthday: Sequelize.DATE
		})

		await sequelize.sync()

		// Create and fetch a record.

		let user = await User.create({
			username: 'jane',
			birthday: Date.UTC(1980, 6, 1)
		})

		user = user.get({ plain: true })
		delete user.createdAt
		delete user.updatedAt

		expect(user).to.deep.equal({
			id: 1,
			username: 'jane',
			birthday: new Date('1980-07-01T00:00:00.000Z')
		})

		// Clear the database.
		await User.truncate()
	})

	it('should support all data types', async function() {
		const sequelize = new Sequelize('sqlite://:memory:', { dialectModule: sqlJsAsSqlite3 });

		// Some of the data types use `validator` functions for validation.
		// Because `validator` is "shimmed" with most of its functions removed,
		// see if the default data types' validation still works.
		// https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types
		// https://sequelize.org/docs/v6/other-topics/other-data-types/
		//
		// I also attempted to remove all functions from the `validator` package shim
		// and this test still passed so I dunno how or why and I don't care.
		//
		const Data = sequelize.define('data', {
			string: Sequelize.STRING,
			stringBinary: Sequelize.STRING.BINARY,
			text: Sequelize.TEXT,
			boolean: Sequelize.BOOLEAN,
			integer: Sequelize.INTEGER,
			integerUnsigned: Sequelize.INTEGER.UNSIGNED,
			integerZerofill: Sequelize.INTEGER.ZEROFILL,
			integerUnsignedZerofill: Sequelize.INTEGER.UNSIGNED.ZEROFILL,
			bigint: Sequelize.BIGINT,
			float: Sequelize.FLOAT,
			real: Sequelize.REAL,
			double: Sequelize.DOUBLE,
			decimal: Sequelize.DECIMAL,
			date: Sequelize.DATE,
			dateOnly: Sequelize.DATEONLY,
			uuid: Sequelize.UUID,
			uuidv1: Sequelize.UUIDV1,
			uuidv4: Sequelize.UUIDV4,
			blob: Sequelize.BLOB,
			enum: Sequelize.ENUM('test', 'testTwo')
		})

		await sequelize.sync()

		// Create and fetch a record.

		let data = await Data.create({
			string: 'test',
			stringBinary: 'test',
			text: 'test',
			boolean: true,
			integer: 123,
			integerUnsigned: 123,
			integerZerofill: 123,
			integerUnsignedZerofill: 123,
			bigint: 123,
			float: 123.45,
			real: 123.45,
			double: 123.45,
			decimal: 123.45,
			date: Date.UTC(2000, 1, 1),
			dateOnly: Date.UTC(2000, 1, 1),
			uuid: 'aa2bd832-191e-4d2b-98d4-b0d4778844f9',
			uuidv1: '2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d',
			uuidv4: 'aa2bd832-191e-4d2b-98d4-b0d4778844f9',
			blob: Buffer.from('whatever'),
			enum: 'test'
		})

		data = data.get({ plain: true })
		delete data.createdAt
		delete data.updatedAt

		expect(data).to.deep.equal({
			id: 1,
			string: 'test',
			stringBinary: 'test',
			text: 'test',
			boolean: true,
			integer: 123,
			integerUnsigned: 123,
			integerZerofill: 123,
			integerUnsignedZerofill: 123,
			bigint: 123,
			float: 123.45,
			real: 123.45,
			double: 123.45,
			decimal: 123.45,
			date: new Date('2000-02-01T00:00:00.000Z'),
			dateOnly: '2000-02-01',
			uuid: 'aa2bd832-191e-4d2b-98d4-b0d4778844f9',
			uuidv1: '2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d',
			uuidv4: 'aa2bd832-191e-4d2b-98d4-b0d4778844f9',
			blob: Buffer.from('whatever'),
			enum: 'test'
		})

		// Clear the database.
		await Data.truncate()
	})
})