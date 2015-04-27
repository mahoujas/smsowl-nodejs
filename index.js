var q = require("q");

var config;

var requestOption = {
    hostname: "smsowl.in",
    port: 443,
    path: "/api/v1/sms",
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    }
};

function configure(options){
    if(!!options){
        throw new Error("Options must be specifed");
    }

    if(!!options.accountId){
        throw new Error("Account id must be specified.")
    }

    if(!!options.apiKey){
        throw new Error("API Key must be specified.")
    }

    config = {
        accountId: options.accountId,
        apiKey: options.apiKey
    }
}

function sendPromotionalSms(senderId,to,message,smsType,callback){
    var defer = q.defer();

    if(!!config){
        throw new Error("Account id and api key not configured. Call smsOwl.configure(options)")
    }

    if(typeof(smsType) === "function"){
        callback = smsType;
        smsType = "normal";
    }

    if(!(smsType == "normal" || smsType == "flash")){
        throw new Error("Sms type parameter should be 'normal' or 'flash'");
    }

    if(!smsType){
        smsType = "normal";
    }

    var postData = {
        accountId: config.accountId,
        apiKey: config.apiKey,
        dndType: "promotional",
        smsType: smsType,
        senderId: senderId,
        to: to,
        message: message
    };

    var response = "";
    var statusCode;

    var req = http.request(requestOption, function(res) {
        statusCode = res.statusCode;
        res.on('data', function (chunk) {
            response += chunk;
        });

        res.on('end', function () {
            var responseJson = JSON.parse(response);
            if(statusCode == 200){
                if(!!callback){
                    callback(null,responseJson);
                }
                defer.resolve(responseJson);
            }else{
                if(!!callback){
                    callback(responseJson);
                }
                defer.reject(responseJson);
            }
        });
    });

    req.on('error', function(e) {
        if(!!callback){
            callback(e);
        }
        defer.reject(e);
    });

    req.write(JSON.stringify(postData));
    req.end();



    return defer.promise;
}


function sendTransactionalSms(senderId,to,templateId,placeholders,callback){
    var defer = q.defer();

    if(!!config){
        throw new Error("Account id and api key not configured. Call smsOwl.configure(options)")
    }

    var postData = {
        accountId: config.accountId,
        apiKey: config.apiKey,
        dndType: "transactional",
        smsType: "normal",
        senderId: senderId,
        to: to,
        templateId: templateId,
        placeholders: placeholders
    };


    var response = "";
    var statusCode;

    var req = http.request(requestOption, function(res) {
        statusCode = res.statusCode;
        res.on('data', function (chunk) {
            response += chunk;
        });

        res.on('end', function () {
            var responseJson = JSON.parse(response);
            if(statusCode == 200){
                if(!!callback){
                    callback(null,responseJson);
                }
                defer.resolve(responseJson);
            }else{
                if(!!callback){
                    callback(responseJson);
                }
                defer.reject(responseJson);
            }
        });
    });

    req.on('error', function(e) {
        if(!!callback){
            callback(e);
        }
        defer.reject(e);
    });

    req.write(JSON.stringify(postData));
    req.end();

    return defer.promise;
}




module.exports = {
    configure: configure,
    sendPromotionalSms: sendPromotionalSms,
    sendTransactionalSms: sendTransactionalSms
};