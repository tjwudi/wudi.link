var secretPromptFactory = require('./modules/secret-prompt');
var secretPrompt = secretPromptFactory.attach(document.querySelector('#secret-prompt'));

var urlPromptFactory = require('./modules/url-prompt');
var urlPropmt = urlPromptFactory.attach(document.querySelector('#url-prompt'));