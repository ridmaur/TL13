'use strict';

var https = require('https');
var http = require('http');
var querystring = require('querystring');
var request = require('request');
var jwt = require('jwt-simple');
var _config = require('./config.js');

const Alexa = require('alexa-sdk');
const makePlainText = Alexa.utils.TextUtils.makePlainText;
const makeImage = Alexa.utils.ImageUtils.makeImage;


const languageStrings = {
    'en-US': {
        translation: {
            WELCOME: 'Welcome to Adobe Summit EMEA Lab TL13. How can I help you?',
            WELCOME_REPROMPT: 'You can choose to ask your profile info, to do this, first ask Alexa to login to Adobe. Alternatively you can ask to send a message to a phone number.',
            EXPERIENCECLOUDID_MESSAGE: 'You are successfully logged in into the Experience Cloud',
            NOEXPERIENCECLOUDID: 'You are not logged in yet, please ask to login to first',
            PROFILEINFO: 'It seems your name is %s',
            SMSINFO: 'We will send you a message shortly. Check your phone',
            HELP_MESSAGE: 'You can say tell me what you like to do, or, you can say exit... Ask me to login or ask me to get your profile?',
            HELP_REPROMPT: 'Where can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
        },
    },
    'en-GB': {
        translation: {
            WELCOME: 'Welcome to Adobe Summit EMEA Lab TL13. How can I help you?',
            WELCOME_REPROMPT: 'You can choose to ask your profile info, to do this, first ask Alexa to login to Adobe. Alternatively you can ask to send a message to a phone number.',
            EXPERIENCECLOUDID_MESSAGE: 'You are successfully logged in into the Experience Cloud',
            NOEXPERIENCECLOUDID: 'You are not logged in yet, please ask to login to first',
            PROFILEINFO: 'It seems your name is %s',
            SMSINFO: 'We will send you a message shortly. Check your phone',
            HELP_MESSAGE: 'You can say tell me what you like to do, or, you can say exit... Ask me to login or ask me to get your profile?',
            HELP_REPROMPT: 'Where can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
        },
    },
};


const handlers = {
        'LaunchRequest': function () {
            var sessionAttributes = {};

            console.log("Summit Lab TL13 initiated, now move on with the next command");
            this.attributes['speechOutput'] = this.t("WELCOME", "");
            this.attributes['repromptSpeech'] = this.t("WELCOME_REPROMPT", "");

            const builder = new Alexa.templateBuilders.BodyTemplate1Builder();

            const template = builder.setTitle('Adobe Summit EMEA Lab TL13')
                // .setBackgroundImage(makeImage('http://img.e-marketing.fr/Img/BREVE/2017/5/317071/Adobe-Summit-2017-machine-learning-prochaine-revolution--F.jpg'))
                .setBackgroundImage(makeImage('https://public.adobecc.com/files/1E1TTCPD50OSKMY5SMQFRQ1SNHCEFF'))
                .setTextContent(makePlainText(''))
                .build();

            this.response.speak(this.attributes['speechOutput'])
                .renderTemplate(template)
                .listen(this.attributes['repromptSpeech']);
            this.emit(':responseReady');
        },
    
        MyAdobeLoginIntent: function () {
            var action = "";
            console.log("Adobe Login request initiated");
            this.attributes['speechOutput'] = this.t("EXPERIENCECLOUDID_MESSAGE", "");
            this.attributes['repromptSpeech'] = this.t("WELCOME_REPROMPT", "");

            doGetAdobeLoginBearer(action, (result) => {
                const logintoken = result;
                console.log("Adobe Login token: " + result);
                this.attributes['logintoken'] = result;

                const builder = new Alexa.templateBuilders.BodyTemplate1Builder();

                const template = builder.setTitle('Your Adobe login token')
                    .setBackgroundImage(makeImage('https://public.adobecc.com/files/1E1TTCPD50OSKMY5SMQFRQ1SNHCEFF'))
                    .setTextContent(makePlainText(logintoken))
                    .build();

                this.response.speak(this.attributes['speechOutput'])
                    .renderTemplate(template)
                    .listen(this.attributes['repromptSpeech']);
                this.emit(':responseReady');

            });
        },
    
        MyAdobeProfileInfoIntent: function () {
            var action = "";
            var cid = "1";
            cid = this.event.request.intent.slots.Customerid.value;

            console.log("Adobe Profile request initiated");
            const logintoken = this.attributes['logintoken'];
            if (logintoken) {

                doGetProfileInfo(logintoken, cid, (result) => {

                    this.attributes['speechOutput'] = this.t("PROFILEINFO", result.fullname);
                    this.attributes['repromptSpeech'] = this.t("WELCOME_REPROMPT", "");

                    const builder = new Alexa.templateBuilders.BodyTemplate2Builder();

                    const template = builder.setTitle('Your name:')
                        // .setBackgroundImage(makeImage('http://img.e-marketing.fr/Img/BREVE/2017/5/317071/Adobe-Summit-2017-machine-learning-prochaine-revolution--F.jpg'))
                        .setBackgroundImage(makeImage('https://public.adobecc.com/files/1E1TTCPD50OSKMY5SMQFRQ1SNHCEFF'))
                        .setImage(makeImage(result.image))
                        .setTextContent(makePlainText(result.fullname))
                        .build();

                    this.response.speak(this.attributes['speechOutput'])
                        .renderTemplate(template)
                        .listen(this.attributes['repromptSpeech']);
                    this.emit(':responseReady');

                });
            } 
            else {

                this.attributes['speechOutput'] = this.t("NOEXPERIENCECLOUDID", "");
                this.attributes['repromptSpeech'] = this.t("WELCOME_REPROMPT", "");

                const builder = new Alexa.templateBuilders.BodyTemplate1Builder();

                const template = builder.setTitle('No Adobe login yet')
                    // .setBackgroundImage(makeImage('http://img.e-marketing.fr/Img/BREVE/2017/5/317071/Adobe-Summit-2017-machine-learning-prochaine-revolution--F.jpg'))
                    .setBackgroundImage(makeImage('https://public.adobecc.com/files/1E1TTCPD50OSKMY5SMQFRQ1SNHCEFF'))
                    .setTextContent(makePlainText('Ask login adobe first'))
                    .build();

                this.response.speak(this.attributes['speechOutput'])
                    .renderTemplate(template)
                    .listen(this.attributes['repromptSpeech']);
                this.emit(':responseReady');

            }
        },
    
        MyAdobeSendSMSIntent: function () {
            var telephoneNumber = this.event.request.intent.slots.TelephoneNumber.value;

            console.log("Adobe Send SMS request initiated");

            doSendSMS(telephoneNumber, (result) => {

                this.attributes['speechOutput'] = this.t("SMSINFO", "");
                this.attributes['repromptSpeech'] = this.t("WELCOME_REPROMPT", "");

                const builder = new Alexa.templateBuilders.BodyTemplate1Builder();

                const template = builder.setTitle('Your Reward!...')
                    // .setBackgroundImage(makeImage('http://img.e-marketing.fr/Img/BREVE/2017/5/317071/Adobe-Summit-2017-machine-learning-prochaine-revolution--F.jpg'))
                    .setBackgroundImage(makeImage('https://public.adobecc.com/files/1E1TTCPD50OSKMY5SMQFRQ1SNHCEFF'))
                    .setTextContent(makePlainText('We will send you an SMS shortly. Check your phone!'))
                    .build();

                this.response.speak(this.attributes['speechOutput'])
                    .renderTemplate(template)
                    .listen(this.attributes['repromptSpeech']);
                this.emit(':responseReady');

            });
        }
};


var mymain = function (event) {
    return new Promise(
        (resolve, reject) => {

            var alexa = Alexa.handler(event, {
                succeed: function (arg) {
                    resolve({
                        statusCode: 200,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: new Buffer(JSON.stringify(arg)).toString("base64")
                    });
                },
                fail: reject
            });

            alexa.appId = "amzn1.ask.skill.<your_skill_id>"; // replace this with your unique skill id, associated with your seat
            alexa.resources = languageStrings;
            alexa.registerHandlers(handlers);
            return alexa.execute();

        });

};
global.main = mymain;

function doGetAdobeLoginBearer(token, completedCallback) {

    var clientID = _config.campaign.campaignClientID,
        clientSecret = _config.campaign.campaignClientSecret,
        orgID = _config.campaign.campaignOrgID,
        technicalAccount = _config.campaign.campaignTechnicalAccount,
        PEM = _config.campaign.campaignPEM,
        IMSEndpoint = _config.campaign.campaignIMSEndpoint,
        tenant = _config.target.targetTenant;
    var accessToken, JWTToken;

    // generate JWT Token
    var aud = "https://ims-na1.adobelogin.com/c/" + clientID;
    var jwtPayload = {
        "exp": Math.round(87000 + Date.now() / 1000),
        "iss": orgID,
        "sub": technicalAccount,
        "aud": aud
    };

    jwtPayload[IMSEndpoint] = true;
    JWTToken = jwt.encode(jwtPayload, PEM, 'RS256');

    console.log("JWT Token success");

    var url = 'https://ims-na1.adobelogin.com/ims/exchange/jwt/';
    var formData = {
        client_id: clientID,
        client_secret: clientSecret,
        jwt_token: JWTToken
    };


    request.post({
        url: url,
        formData: formData
    }, function optionalCallback(err, httpResponse, body) {
        if (err) {
            reject(err);
        } else {
            var result = JSON.parse(body);
            accessToken = "Bearer " + result.access_token;
            completedCallback(accessToken);
        }
    });

}

function doGetProfileInfo(token, cid, completedCallback) {


    console.log("doGetProfileInfo with token: " + token);
    console.log("doGetProfileInfo for id :" + cid);

    var clientID = _config.campaign.campaignClientID;
    var options = {
        method: 'GET',
        url: 'https://mc.adobe.io/rob-in-der-maur-141117.campaign-demo.adobe.com/campaign/profileAndServicesExt/profile/byCrmid?_parameter=' + cid,
        headers: {
            'x-api-key': clientID,
            authorization: token
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        var content_response = JSON.parse(body);
        console.log("Response: " + JSON.stringify(content_response));
        var firstname = content_response.content[0].firstName;
        var lastname = content_response.content[0].lastName;
        var fullname = firstname + " " + lastname;
        var thumbnail = content_response.content[0].thumbnail;
        console.log(fullname);
        console.log(thumbnail);
        var alexaResult = {
            fullname: fullname,
            image: thumbnail
        };

        completedCallback(alexaResult);
        //completedCallback("Kees");

    });
}

function doSendSMS(telephoneNumber, completedCallback) {

    console.log("doSendSMS for telephone number: " + telephoneNumber);

    var jsonObj = {};

    jsonObj.mobilePhone = telephoneNumber;
    var messageString = JSON.stringify(jsonObj);

    console.log('payload: ' + messageString);

    var options = {
        method: 'POST',
        url: 'https://rob-in-der-maur-141117.campaign-demo.adobe.com/rest/mcrob-in-der-maur/EVTsummitLabUnlockAdobeIORewardSMS',
        body: messageString,
        headers: {
            'Authorization': 'Basic bWNQdXNoOg==',
            'Content-Type': 'application/json; charset=utf-8'
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        var content_response = JSON.parse(body);
        console.log("Response: " + JSON.stringify(content_response));
        var status = content_response.status;

        completedCallback(status);
        //completedCallback("Kees");

    });

}
