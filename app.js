var config = require('./config.json');
var util = require('util');
var randomWord = require('random-word');
var rnd = require('random-number');
var http = require('http');

var getRandomLength = function () {
	return rnd({
		min: config.minPossibleLength,
		max: config.maxPossibleLength,
		integer: true
	});
}

getRandomWord = function () {
	var length1 = getRandomLength();
	var length2 = getRandomLength();
	var minLength = Math.min(length1, length2);
	var maxLength = Math.max(length1, length2);
	var result = [];
	var rejected = []

	result.push('Word of the day! You must sneak the chosen word into your scrum/annual review/delivery of bad news');
	result.push(util.format('I\'ve decided that today\'s word will be between %s and %s characters', minLength, maxLength));

	var word = randomWord();
	while (word.length < minLength || word.length > maxLength) {
		if (word.length < minLength) rejected.push(util.format('%s, but it\'s too short', word));
		if (word.length > maxLength) rejected.push(util.format('%s, but it\'s too long', word));
		word = randomWord();
	}

	result.push('');
	result.push(util.format('I\'ve decided the word of the day is "%s". That\'s: "%s". Good luck!', word, word));
	result.push('');

	if (rejected.length) {
		result.push('(I considered:')
		result = result.concat(rejected);
		result.push(')');
	}

	return result.join("\n");
}



var server = http.createServer();
server.on('request', function (req, res) {
	var body = getRandomWord()
	res.writeHead(200, {
		'Content-Length': body.length,
	  'Content-Type': 'text/plain'
	});

	res.end(body, 'utf-8');
});

server.listen(config.port);
