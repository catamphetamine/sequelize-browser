import { expect } from 'chai'

import Sequelize from '../sequelize.js'
import SequelizeCJS from '../sequelize.cjs'

describe('exports', () => {
	it('should export ES6', () => {
		expect(Sequelize).to.be.a('function')
	})

	it('should export CommonJS', () => {
		expect(SequelizeCJS).to.be.a('function')
	})
})