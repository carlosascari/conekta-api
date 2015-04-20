var should = require('should')

describe("module", function() {
	it("should have Conekta as constructor name", function() {
		var conekta = require('./../lib/conekta')
		conekta.constructor.name.should.equal('Conekta')
	})
	it("should be an instance", function() {
		var conekta = require('./../lib/conekta')
		should(typeof conekta).equal('object')
	})
	it("should have version 0.3.0", function() {
		var conekta = require('./../lib/conekta')
		should(conekta.version).equal('0.3.0')
	})
})

describe("methods", function() {
	var conekta = require('./../lib/conekta')
	it("should have method: #apiRequest", function() {
		should(conekta.apiRequest).be.type('function')
	})
	it("should have method: #Charge.create", function() {
		should(conekta.Charge.create).be.type('function')
	})
	it("should have method: #Charge.retrieve", function() {
		should(conekta.Charge.retrieve).be.type('function')
	})
	it("should have method: #Charge.refund", function() {
		should(conekta.Charge.refund).be.type('function')
	})
	it("should have method: #Charge.capture", function() {
		should(conekta.Charge.capture).be.type('function')
	})
	it("should have method: #Charge.list", function() {
		should(conekta.Charge.list).be.type('function')
	})
	it("should have method: #Customer.create", function() {
		should(conekta.Customer.create).be.type('function')
	})
	it("should have method: #Customer.retrieve", function() {
		should(conekta.Customer.retrieve).be.type('function')
	})
	it("should have method: #Customer.update", function() {
		should(conekta.Customer.update).be.type('function')
	})
	it("should have method: #Customer.delete", function() {
		should(conekta.Customer.delete).be.type('function')
	})
	it("should have method: #Card.create", function() {
		should(conekta.Card.create).be.type('function')
	})
	it("should have method: #Card.retrieve", function() {
		should(conekta.Card.retrieve).be.type('function')
	})
	it("should have method: #Card.update", function() {
		should(conekta.Card.update).be.type('function')
	})
	it("should have method: #Card.delete", function() {
		should(conekta.Card.delete).be.type('function')
	})
	it("should have method: #Subscription.create", function() {
		should(conekta.Subscription.create).be.type('function')
	})
	it("should have method: #Subscription.update", function() {
		should(conekta.Subscription.update).be.type('function')
	})
	it("should have method: #Subscription.pause", function() {
		should(conekta.Subscription.pause).be.type('function')
	})
	it("should have method: #Subscription.resume", function() {
		should(conekta.Subscription.resume).be.type('function')
	})
	it("should have method: #Subscription.cancel", function() {
		should(conekta.Subscription.cancel).be.type('function')
	})
	it("should have method: #Plan.create", function() {
		should(conekta.Plan.create).be.type('function')
	})
	it("should have method: #Plan.update", function() {
		should(conekta.Plan.update).be.type('function')
	})
	it("should have method: #Plan.delete", function() {
		should(conekta.Plan.delete).be.type('function')
	})

	it("should have method: #Event.list", function() {
		should(conekta.Event.list).be.type('function')
	})
})
