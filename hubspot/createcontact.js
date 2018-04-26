"use strict"

// Dependencies
var request = require('request');
var https = require('https');

/**
 * This Adobe IO runtime function creates a contact in Hubspot and return a vid
 * API key is cc20872a-3077-442f-94fb-f1f11bae2f89
 * @param params Input object
 * @returns {Promise}
 */

function main(params) {
    var method = params.__ow_method;
    var apikey = "cc20872a-3077-442f-94fb-f1f11bae2f89";
    var emailParam = params.email;
    var firstnameParam = params.firstname;
    var lastnameParam = params.lastname;
    var property = {};
    var value = {};
    var properties = [];
    var url = 'https://api.hubapi.com/contacts/v1/contact/?hapikey=' + apikey;

    // set first name
    var firstname = {
        property: "firstname",
        value: firstnameParam
    };
    properties.push(firstname);

    // set last name
    var lastname = {
        property: "lastname",
        value: lastnameParam
    };
    properties.push(lastname);

    // set email
    var email = {
        property: "email",
        value: emailParam
    };
    properties.push(email);

    // set JSON body for POST
    var formData = {
        "properties": properties
    }
    var postData = JSON.stringify(formData);
    console.log("JSON: " + postData);

    // set options for POST request
    var options = {
        host: 'api.hubapi.com',
        port: 443,
        path: 'contacts/v1/contact/?hapikey=' + apikey,
        method: 'POST',
        url: url,
        body: postData
    };

    // send post to Hubspot and handle result
    return new Promise(function (resolve, reject) {
        request.post(options, function (error, response, body) {
            if (error) {
                reject(error);
            } else {
                var vid = JSON.parse(body).vid;
                resolve({
                    email: emailParam,
                    firstName: firstnameParam,
                    lastName: lastnameParam,
                    cusCrmId: vid
                });
            }
        });
    });

}

exports.main = main;
