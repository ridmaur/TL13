"use strict"

// Dependencies
var request = require('request'),
    jwt = require('jwt-simple'),
    _config = require('./config.js');

/**
 * The entry point for this action.
 * It should be invoked once the authentication has succeeded.
 * @param params Input object
 * @returns {Promise}
 */

function main(params) {
    console.log('in main: ', params);

    // read config
    var clientID = _config.campaign.campaignClientID,
        clientSecret = _config.campaign.campaignClientSecret,
        orgID = _config.campaign.campaignOrgID,
        technicalAccount = _config.campaign.campaignTechnicalAccount,
        PEM = _config.campaign.campaignPEM,
        IMSEndpoint = _config.campaign.campaignIMSEndpoint,
        tenant = _config.target.targetTenant,
        action = params.action,
        cusCrmId = params.cusCrmId,
        email = params.email,
        firstName = params.firstName,
        lastName = params.lastName;

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

    // set payload for retrieving access token
    var url = 'https://ims-na1.adobelogin.com/ims/exchange/jwt/';
    var formData = {
        client_id: clientID,
        client_secret: clientSecret,
        jwt_token: JWTToken
    };

    // main function
    return new Promise(function (resolve, reject) {
        try {
            request.post({
                url: url,
                formData: formData
            }, function optionalCallback(err, httpResponse, body) {
                if (err) {
                    reject(err);
                } else {
                    var result = JSON.parse(body);
                    accessToken = "Bearer " + result.access_token;
                    console.log("Get Bearer token success");
                    
                    CreateACSProfile(accessToken, (result) => {
                            console.log("ACS Create Profile...");
                        });
                }
            });

        } catch (e) {
            console.log("error");
        }
        
        // function to create ACS Profile
        function CreateACSProfile(accessToken, completedCallback) {
            var jsonObj = {};
            if (firstName) {
                jsonObj.firstName = firstName;
            }
            if (lastName) {
                jsonObj.lastName = lastName;
            }
            if (email) {
                jsonObj.email = email;
            }
            if (cusCrmId) {
                jsonObj.cusCrmId = cusCrmId;
            }
            
            var messageString = JSON.stringify(jsonObj);

            console.log('payload: '+messageString);
            var options = {
                url: 'https://mc.adobe.io/rob-in-der-maur-141117.campaign-demo.adobe.com/campaign/profileAndServicesExt/profile/',
                body: messageString,
                method: 'POST',
                headers: {
                    'x-api-key': clientID,
                    authorization: accessToken
                }
            };

            request(options, function (error, response, body) {
                if (error) throw new Error(error);

                console.log("Create ACS profile success");
                var content_response = JSON.parse(body);
                completedCallback = body;

                resolve({
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    },
                    statusCode: 200,
                    create: body,
                    status: 'success create'

                });
            });
        }
    })
}

exports.main = main;
