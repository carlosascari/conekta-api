# conekta-api 
version `0.3.x`

[Conekta](http://conekta.io/) is a web service that accepts online payments such as subscriptions and direct purchases with a credit or debit card, a bank transfer or by paying through a local OXXO, in case local for you means Mexico.

This is Conekta's Unofficial REST API for Node.js

## Install

You should have registered at conekta.io by now.

$ npm install conekta-api --save

## Test

Mocha.js is used for unit testing. You will have to place your own sandboxed API keys in the files found in the `tests`

$ npm install conekta-api --dev

$ mocha

## Usage

You will need your api key to use conekta's service, otherwise all your requests will fail. You can use either your public or private api, as well as change them at will. However, keep in mind there are operations that require you use a private key. See Conekta's Documentation for details

```javascript
var conekta = require('conekta-api')

conekta.api_key = 'YOUR_PRIVATE_API_KEY'
```

`conekta.api_key` is a GETTER/SETTER property, you only need to call it once. Setting this value places the api_key in the *Authorization* header on every request that is made.

During development you may want to enable verbose error messages. Every error object returned from Conekta contains a `message` property, it may or may not contain a type and a code to further describe what caused the error.

```javascript
var conekta = require('conekta-api')

conekta.api_key = 'YOUR_PRIVATE_API_KEY'
conekta.verbose = true
```
If verbose is set, every error returned from Conekta's API will have it's `code` and `type` looked up for it's meaning and the `message` property will be populated with a more detailed description based on the error's type, code and basic message. This could save you trips to the documentation

## API

All methods are `async`, they require a callback function. 
This function will always output `null` or an `Error` object as the first argument. 
The second argument will either be `undefined` or have the orignal *response object* from Conekta. 

Two types of errors exist, your coding errors and conektas *response error objects*. If an error occurs, the first argument will hold a native `Error` with the `message` property set if it a `new Error` object or a conekta `response error object`. You can differ between these errors by checking the second argument, an error from conekta will have the original response error object in the second argument. A native `Error`, will have it's second argument `undefined`.

- `conekta.api_key` This property takes your api key, either private or public and sets the request header to use it via Basic Auth. This property must be set with a valid api key, otherwise you will always get an authentication error.

- `conekta.version` This will cause all request response objects to have the structure of a specific api version. 
This property will only accept a string with the following format: (such as "0.3.0")

```regex
/\d.\d.\d/
```
- `conekta.verbose` This property is `false` by default, if set to `true` all Conekta errors will have their `message` property altered to show more information, basically everything you'll find in the API documentation about the error.

##### Charges

- `conekta.Charge.create(chargeObject, callback)`
  Charges a credit/debit card, bank transfer or OXXO payment, depending on the `chargeObject` parameter. See the API Documentation for details on the *Charge Object*.

- `conekta.Charge.retrieve(charge_id, callback)`
	Gets a previous charge by it's id. `callback` if successful, returns a *Charge Object* as its response object

- `conekta.Charge.refund(charge_id, callback)`
  `conekta.Charge.refund(charge_id, amount, callback)`
  Refunds a previous charge of type `card_payment` in full. If an amount is specified, only that amount is refunded. If the amount is *falsy* , It will be refunded in full.

- `conekta.Charge.capture(charge_id, callback)`
	Process a charge by its id that was authorized, but not complete. if succesful, the callbacks second argument will be the same as of `Charge.create` or `Charge.refund`

- `conekta.Charge.list(callback)`
  `conekta.Charge.list(queryObject, callback)`
  Lists all charges. The `query` argument allows you to filter, sort and page results, it becomes the query string. See the API documentation for more details. **Still under dev.**. The succesful callback result will be an array of *Charge Objects*.

##### Customers
	
- `conekta.Customer.create(detailsObject, callback)`
  Creates a new customer. detailsObject is a *Customer Object*, you can find information about its properties in the documentation. A succesful response will be a *Customer Object* 

- `conekta.Customer.update(customer_id, detailsObject, callback)`
  Updates an existing customer. Does not include their **cards** and **subscriptions**. The succesful callback result will be an array of *Charge Objects*.

- `conekta.Customer.delete(customer_id, callback)`
  Deletes an existing Customer including their cards, their subscriptions will be cancelled. The succesful callback result will be a *Charge Object*.

##### Cards

- `conekta.Card.create(customer_id, card_token, callback)`
  Creates a new card using tokenized data on a specified customer. `card_token` will be created by the client side conekta.js api. 

- `conekta.Card.update(customer_id, card_id, card_token, optionsObject, callback)`
  Updates an exisiting card by it's id, using a `card_token` from the client or a subscription. The only property expected inside the optionsObject is `active` to indicate the card can be used or not.

- `conekta.Card.delete(customer_id, card_id, callback)`
  Deletes a card. Response object is a *Card Object*  

##### Subscriptions

- `conekta.Subscription.create(customer_id, plan_id, callback)`
  `conekta.Subscription.create(customer_id, plan_id, card_id, callback)`
  Creates a new subscription. If a `card_id` is included, that card will be used instead of the default. The Card must already exist

- `conekta.Subscription.update(customer_id, plan_id, callback)`
  `conekta.Subscription.update(customer_id, plan_id, card_id, callback)`
  
- `conekta.Subscription.pause(customer_id, callback)` 
  Pause a subscription. 

- `conekta.Subscription.resume(customer_id, callback)` 
  Remove a paused subscription

- `conekta.Subscription.cancel(customer_id, callback)` 
  Cancel a subscription

##### Plans

- `conekta.Plan.create(planObject, callback)`
  Create a new plan. See Documentation on the *Plan Object*'s properties

- `conekta.Plan.update(plan_id, planObject, callback)`
  Updates an existing Plan by its id. A succesful result will be a *Plan Object* with the updated information set.

- `conekta.Plan.delete(plan_id, callback)`
  Deletes a Plan.

##### Events

- `conekta.Event.list(callback)`
  Lists event notifications from Conekta. A succesfull result will be an array of *Event Objects*
