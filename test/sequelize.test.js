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
})