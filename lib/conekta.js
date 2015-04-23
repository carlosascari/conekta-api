var format 			= require('util').format
var request 		= require('request')
var API_VERSION		= '0.3.0'
var API_URL 		= 'https://api.conekta.io/'
var CHARGE_RES 		= API_URL + 'charges'
var CUSTOMER_RES	= API_URL + 'customers'
var PLAN_RES		= API_URL + 'plans'
var EVENT_RES		= API_URL + 'events'
var HEADERS = {
	'accept': 'application/vnd.conekta-v0.3.0+json',
	'content-type': 'application/json'
}

// Constructor
function Conekta()
{
	Object.defineProperty(this, 'version', { //todo change accept header
		get: function()
		{
			return this._version || API_VERSION
		},
		set: function(value)
		{
			if (/\d.\d.\d/.exec(value + ''))
			{
				var version = (value + '').split('.')
				HEADERS['accept'] = format(
					'application/vnd.conekta-v%d.%d.%d+json',
					 parseInt(version[0], 10)|0,
					 parseInt(version[1], 10)|0,
					 parseInt(version[2], 10)|0
				)
				this._version = value + ''
			} else { throw new Error('invalid version format, should be: "%d.%d.%d"')}
		}
	})
	Object.defineProperty(this, 'api_key', {
		get: function()
		{
			return this._api_key || null
		},
		set: function(value)
		{
			HEADERS['authorization'] = format('Token token="%s"', value)
			this._api_key = value
		}
	})
	Object.defineProperty(this, 'verbose', {
		get: function()
		{
			return !!this._verbose
		},
		set: function(value)
		{
			this._verbose = !!value
		}
	})
}; var instance = new Conekta()

// Request Utility
Conekta.prototype.apiRequest = function(type, options, callback)
{
	request[type](options, function(err, res, data){
		if (err) return callback(err)
		try
		{
			var obj = JSON.parse(data)
			if (obj.object === 'error')
			{
				if (this.verbose)
				{
					obj = require('./verbose-error')(res.status, obj)
				}
				callback(new Error(obj.message), obj)
			}
			else
			{
				callback(null, obj)
			}
		}
		catch(ex)
		{
			callback(ex)
		}
	}.bind(this))
}

/* Charges
 ******************************************************************************/
Conekta.prototype.Charge = {
	create: function(chargeObject, callback)
	{
		this.apiRequest('post', {url: CHARGE_RES, headers: HEADERS, form: chargeObject}, callback)
	}.bind(instance),
	
	retrieve: function(charge_id, callback)
	{
		this.apiRequest('get', {url: format("%s/%s", CHARGE_RES, charge_id), headers: HEADERS}, callback)
	}.bind(instance),

	refund: function(charge_id, amount, callback)
	{
		if (arguments.length === 2) callback = amount
		this.apiRequest('post', {url: format("%s%s/%s", API_URL, 'charges', charge_id), headers: HEADERS}, callback)
	}.bind(instance),

	capture: function(charge_id, callback)
	{
		this.apiRequest('post', {url: format("%s/%s/capture", CHARGE_RES, charge_id), headers: HEADERS}, callback)
	},

	list: function(query, callback){
		if (arguments.length === 1) callback = query, query = {}
		this.apiRequest('get', {url: CHARGE_RES, headers: HEADERS, qs: query}, callback)
	}.bind(instance),
}

/* Customers
 ******************************************************************************/
Conekta.prototype.Customer = {
	create: function(detailsObject, callback)
	{
		this.apiRequest('post', {url: CUSTOMER_RES, headers: HEADERS, form: detailsObject}, callback)
	}.bind(instance),

	retrieve: function(customer_id, callback)
	{
		this.apiRequest('get', {url: format("%s/%s", CUSTOMER_RES, customer_id), headers: HEADERS}, callback)
	}.bind(instance),

	update: function(customer_id, detailsObject, callback)
	{
		this.apiRequest('put', {url: format("%s/%s", CUSTOMER_RES, customer_id), headers: HEADERS, form: customerDetailsObject}, callback)
	}.bind(instance),

	delete: function(customer_id, callback)
	{
		this.apiRequest('del', {url: format("%s/%s", CUSTOMER_RES, customer_id), headers: HEADERS}, callback)
	}.bind(instance),
}

/* Cards
 ******************************************************************************/
Conekta.prototype.Card = {
	create: function(customer_id, card_token, callback)
	{
		this.apiRequest('post', {url: format("%s/%s/cards", CUSTOMER_RES, customer_id), headers: HEADERS, form: {token: card_token}}, callback)
	}.bind(instance),

	retrieve: function(customer_id, card_id, callback)
	{
		this.apiRequest('get', {url: format("%s/%s/cards/%s", CUSTOMER_RES, customer_id, card_id), headers: HEADERS}, callback)
	}.bind(instance),

	update: function(customer_id, card_id, card_token, callback)
	{
		this.apiRequest('put', {url: format("%s/%s/cards/%s", CUSTOMER_RES, customer_id, card_id), headers: HEADERS, form: {token: card_token}}, callback)
	}.bind(instance),

	delete: function(customer_id, card_id, callback) 
	{
		this.apiRequest('del', {url: format("%s/%s/cards/%s", CUSTOMER_RES, customer_id, card_id), headers: HEADERS}, callback)
	}.bind(instance),
}

/* Subscriptions
 ******************************************************************************/
Conekta.prototype.Subscription = {
	create: function(customer_id, plan_id, card_id, callback)
	{
		if (arguments.length === 3) callback = card_id, card_id = undefined
		this.apiRequest('post', {url: format("%s/%s/subscription", CUSTOMER_RES, customer_id), headers: HEADERS, form: {plan: plan_id, card: card_id}}, callback)
	}.bind(instance),

	update: function(customer_id, card_id, plan_id, callback)
	{
		if (arguments.length === 3) callback = plan_id, plan_id = undefined
		this.apiRequest('put', {url: format("%s/%s/subscription", CUSTOMER_RES, customer_id), headers: HEADERS, form: {plan: plan_id, card: card_id}}, callback)
	}.bind(instance),

	pause: function(customer_id, callback) 
	{
		this.apiRequest('post', {url: format("%s/%s/subscription/pause", CUSTOMER_RES, customer_id), headers: HEADERS}, callback)
	}.bind(instance),

	resume: function(customer_id, callback) 
	{
		this.apiRequest('post', {url: format("%s/%s/subscription/resume", CUSTOMER_RES, customer_id), headers: HEADERS}, callback)
	}.bind(instance),

	cancel: function(customer_id, callback) 
	{
		this.apiRequest('post', {url: format("%s/%s/subscription/cancel", CUSTOMER_RES, customer_id), headers: HEADERS}, callback)
	}.bind(instance),
}

/* Plans
 ******************************************************************************/
Conekta.prototype.Plan = {
	create: function(planObject, callback)
	{
		this.apiRequest('post', {url: PLAN_RES, headers: HEADERS, form: planObject}, callback)
	}.bind(instance),

	update: function(plan_id, planObject, callback)
	{
		this.apiRequest('put', {url: format("%s/%s", PLAN_RES, plan_id) , headers: HEADERS, form: planObject}, callback)
	}.bind(instance),

	delete: function(plan_id, callback)
	{
		this.apiRequest('del', {url: format("%s/%s", PLAN_RES, plan_id) , headers: HEADERS}, callback)
	}.bind(instance),
}

/* Events
 ******************************************************************************/
Conekta.prototype.Event = {
	list: function(callback)
	{
		this.apiRequest('get', {url: EVENT_RES, headers: HEADERS}, callback)
	}.bind(instance),
}

module.exports = instance
