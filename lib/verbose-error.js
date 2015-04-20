// Conekta API v0.3.0 Errors
var format 			= require('util').format
var ERR_STATUS_MESSAGES = {
	200: 'OK: Everything went perfectly with no errors.',
	400: 'Bad Request: The call could not be understood by the server due to incorrect syntax.',
	401: 'Unathorized: The API key used is invalid.',
	402: 'Payment Required: The payment could not be processed',
	404: 'Not Found: THe requested resource doest not exist in the call.',
	422: 'Unprocessable Entity: The syntax of the call is valid but the information within the parameters is invalid.',
	500: 'Server Error: Something was wrong from Conekta\'s end and the call could not be processed',
	503: 'Server Error: Something was wrong from Conekta\'s end and the call could not be processed',
}
var ERR_TYPE_MESSAGES = {
	malformed_request_error: 	'Error when call has an invalid syntax.',
	authentication_error: 		'The call could not be processed due to problems with the API key or with permission.',
	card_error: 				'Most common error that occurs when using the charge card and the card can not be charged for any reason.',
	resource_not_found_error: 	'The requested resource does not exist in the call.',
	parameter_validation_error: 'This error occurs when a parameter of any call is invalid.',
	api_error: 					'This error includes any other error (e.g. a temporary problem with Conekta servers) and should occur rarely.',
}
var ERR_CODE_MESSAGES = {
	invalid_amount: 		'The amount receivable is not present or is invalid. The amount should be an integer value in cents (eg $ 50.00 -> 5000).',
	invalid_payment_type: 	'The payment type is not present or is invalid. Payment types accepted are card, bank, and cash.',
	missing_description: 	'The charge description is not present. This description is mandatory.',
	unsupported_currency: 	'Given currency can not be recognized or is not supported so far.',
	invalid_number: 		'The card number is invalid.',
	invalid_expiry_month: 	'The month of expiry of the card is invalid.',
	invalid_expiry_year: 	'The year of expiry of the card is invalid.',
	invalid_cvc: 			'The security code is invalid.',
	expired_card: 			'The card has expired.',
	card_declined: 			'The card has been declined.',
	insufficient_funds: 	'The charge was not processed because the card does not have sufficient funds.',
}

function VerboseError(status, response)
{
	if (arguments.length === 1) response = status, status = undefined

	var v = []
	if (status && ERR_STATUS_MESSAGES[status])
	{
		v.push(format("[status] %s\n%s", status, ERR_STATUS_MESSAGES[status]))
	}

	if (response.code && ERR_CODE_MESSAGES[response.code])
	{
		v.push(format("[code] %s\n%s", response.code, ERR_CODE_MESSAGES[response.code]))
	}

	v.push(format("[message]\n%s", response.message))
	response.message = v.join('\n')
	return response
}

module.exports = VerboseError