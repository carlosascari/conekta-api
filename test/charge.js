var should = require('should')

describe("Charge namespace", function() {
	this.timeout(20000)
	var conekta 		= require('./../lib/conekta')
	conekta.api_key 	= 'YOUR_API_KEY'
	conekta.verbose 	= true
	var PREV_CHARGE_ID 	= []

	it.skip("should simulate a credit card charge", function(done) {
		var SAMPLE = {
			"description": 		"Hot Mocha",
			"amount": 			100 * 22.50,
			"currency": 		"MXN",
			"reference_id": 	"mocha test",
			"card": 			"tok_test_visa_4242"
		}
		conekta.Charge.create(SAMPLE, function(err, result){
			if (err) console.log(err)
			should.not.exist(err)
			should.exist(result)
			should(result).be.type('object')
			result.should.have.property('id')
			result.should.have.property('livemode').equal(false)
			result.should.have.property('created_at')
			result.should.have.property('status')
			result.should.have.property('currency').and.equal(SAMPLE.currency)
			result.should.have.property('description').and.equal(SAMPLE.description)
			result.should.have.property('reference_id').and.equal(SAMPLE.reference_id)
			result.should.have.property('failure_code')
			result.should.have.property('failure_message')
			result.should.have.property('monthly_installments')
			result.should.have.property('object').and.equal('charge')
			result.should.have.property('amount').and.equal(SAMPLE.amount)
			result.should.have.property('paid_at')
			result.should.have.property('fee')
			result.should.have.property('customer_id')
			result.should.have.property('refunds')
			result.should.have.property('payment_method')
			result.should.have.property('details')
			result.payment_method.should.have.property('name')
			result.payment_method.should.have.property('exp_month')
			result.payment_method.should.have.property('exp_year')
			result.payment_method.should.have.property('auth_code')
			result.payment_method.should.have.property('object').and.equal('card_payment')
			result.payment_method.should.have.property('last4')
			result.payment_method.should.have.property('brand')
			PREV_CHARGE_ID.push(result.id)
			done()
		})
	})

	it.skip("should simulate a OXXO charge", function(done) {
		var SAMPLE = {
			"currency":"MXN",
			"amount": 20000,
			"description":"Warm Mocha",
			"reference_id":"test-mocha",
			"cash": {
				"type":"oxxo"
			},
			"details": {
				"name":"Wolverine",
				"email":"logan@x-men.org",
				"phone":"403-342-0642"
			}
		}
		conekta.Charge.create(SAMPLE, function(err, result){
			if (err) console.log(err)
			should.not.exist(err)
			should.exist(result)
			should(result).be.type('object')
			result.should.have.property('id')
			result.should.have.property('livemode').equal(false)
			result.should.have.property('created_at')
			result.should.have.property('status')
			result.should.have.property('currency').and.equal(SAMPLE.currency)
			result.should.have.property('description').and.equal(SAMPLE.description)
			result.should.have.property('reference_id').and.equal(SAMPLE.reference_id)
			result.should.have.property('failure_code')
			result.should.have.property('failure_message')
			result.should.have.property('monthly_installments')
			result.should.have.property('object').and.equal('charge')
			result.should.have.property('amount').and.equal(SAMPLE.amount)
			result.should.have.property('paid_at')
			result.should.have.property('fee')
			result.should.have.property('customer_id')
			result.should.have.property('refunds')
			result.should.have.property('payment_method')
			result.should.have.property('details')
			result.payment_method.should.have.property('expiry_date')
			result.payment_method.should.have.property('barcode')
			result.payment_method.should.have.property('barcode_url')
			result.payment_method.should.have.property('object').equal('cash_payment')
			result.payment_method.should.have.property('type').equal('oxxo')
			result.payment_method.should.have.property('expires_at')
			result.details.should.have.property('name').equal(SAMPLE.details.name)
			result.details.should.have.property('phone').equal(SAMPLE.details.phone)
			result.details.should.have.property('email').equal(SAMPLE.details.email)
			PREV_CHARGE_ID.push(result.id)
			done()
		})
	})

	it.skip("should simulate a Bank charge", function(done) {
		var SAMPLE = {
			"currency":"MXN",
			"amount": 20000,
			"description":"Ice Mocha",
			"reference_id":"mocha-test",
			"bank": {
				"type":"banorte"
			},
			"details": {
				"name":"Wolverine",
				"email":"logan@x-men.org",
				"phone":"403-342-0642"
			}
		 }
		conekta.Charge.create(SAMPLE, function(err, result){
			should.not.exist(err)
			should.exist(result)
			should(result).be.type('object')
			result.should.have.property('id')
			result.should.have.property('livemode').equal(false)
			result.should.have.property('created_at')
			result.should.have.property('status')
			result.should.have.property('currency').and.equal(SAMPLE.currency)
			result.should.have.property('description').and.equal(SAMPLE.description)
			result.should.have.property('reference_id').and.equal(SAMPLE.reference_id)
			result.should.have.property('failure_code')
			result.should.have.property('failure_message')
			result.should.have.property('monthly_installments')
			result.should.have.property('object').and.equal('charge')
			result.should.have.property('amount').and.equal(SAMPLE.amount)
			result.should.have.property('paid_at')
			result.should.have.property('fee')
			result.should.have.property('customer_id')
			result.should.have.property('refunds')
			result.should.have.property('payment_method')
			result.should.have.property('details')
			result.payment_method.should.have.property('service_name')
			result.payment_method.should.have.property('service_number')
			result.payment_method.should.have.property('reference')
			result.payment_method.should.have.property('object').equal('bank_transfer_payment')
			result.payment_method.should.have.property('type').equal(SAMPLE.bank.type)
			result.payment_method.should.have.property('expires_at')
			result.details.should.have.property('name').equal(SAMPLE.details.name)
			result.details.should.have.property('phone').equal(SAMPLE.details.phone)
			result.details.should.have.property('email').equal(SAMPLE.details.email)
			PREV_CHARGE_ID.push(result.id)
			done()
		})
	})

	it.skip("should retrieve a previous charge", function(done) {
		conekta.Charge.retrieve(PREV_CHARGE_ID[0], function(err, result){
			should.not.exist(err)
			should.exist(result)
			should(result).be.type('object')
			result.should.have.property('id').and.equal(PREV_CHARGE_ID[0])
			done()
		})	
	})

	it.skip("should list all previous charges", function(done) {
		conekta.Charge.list(function(err, result){
			should.not.exist(err)
			should.exist(result)
			should(result).be.type('object')
			result.should.have.property('length').be.type('number')
			for (var j = result.length - 1; j >= 0; j--)
			{
				result[j].should.have.property('id').ok
			}
			done()
		})
	})

	it.skip("should list all previous charges that have not been paid", function(done) {
		conekta.Charge.list({'status.ne': 'paid', limit: 100}, function(err, result){
			should.not.exist(err)
			should.exist(result)
			should(result).be.type('object')
			result.should.have.property('length').be.type('number')
			for (var j = result.length - 1; j >= 0; j--)
			{
				result[j].should.have.property('id').ok	
			}
			done()
		})
	})

})