## Sms Owl Node.js Wrapper

This package is wrapper of Sms Owl REST API hosted at [https://smsowl.in](https://smsowl.in). Sms Owl provides transactional and promotional SMS Gateway services.


### Installing Sms Owl package

Use following command to install npm package.

	$ npm install smsowl

### Requiring library

Library can be imported to node file with following line of code.

	var smsOwl = require("smsowl");


### Configuring credentials

Credentials should be configured before sending SMS.

	
    smsowl.configure({
        accountId: "YOUR-ACCOUNT-ID",
        apiKey: "YOUR-API-KEY"
    });


### Sending promotional SMS


##### sendPromotionalSms(senderId,to,message,smsType,callback)

 - senderId: Sender Id registered and approved in Sms Owl portal.
 - to: Either single number with country code or array of phone numbers.
 - message: Message to be sent.
 - smsType: It can have either of two values `normal` or `flash`
 - callback: Function to be called after success of failure.



		smsowl.sendPromotionalSms("TESTER",["+919876543210","+91123456789],"hello world","normal",function(error,result){
        	if(error){
            	// Handle Error
        	}else{
           		// Handle success
        	}
   		});

Variable `result` will content SMS id for single message sent or array of SMS ids for bulk sms sent.


##### sendPromotionalSms(senderId,to,message,callback)

Same as above but smsType defaults to `normal`


### Sending Transactional SMS

##### smsowl.sendTransactionalSms(senderId,to,templateId,placeholderObject,callback);

 - senderId: Sender Id registered and approved in Sms Owl portal.
 - to: Destination number with country prefix. Only single number can be specified.
 - templateId: Template Id of message. Only template message can be send via transactional route.
 - placeholderObject: Placeholder values.

Lets assume templateId of "39ec9de0efa8a48cb6e60ee5" with following template.

	Hello {customerName}, your invoice amount is Rs. {amount}.

    smsowl.sendTransactionalSms("TESTER","+919876543210","39ec9de0efa8a48cb6e60ee5",{customerName:"Bob",amount:500},function(error,result){
        if(error){
            //Handle error
        }else{
            //Handle success
        }
    });

Variable `result` will content SMS id



### Promise Pattern

Our API also support promise pattern. In above mentioned APIs just omit callback parameter and use returned promise. Following is example.

	smsowl.sendPromotionalSms("TESTER","+919876543210","hello world")
        .then(function(result){
          	//handle success
        },function(error){
            //handle error
        });


### Error object structure

On failure following object is sent to 1 parameter (error) of callback of to 1st parameter of promise's failure callback. The `message` field explains cause of error.
	
	{
	    "status": "error",
	    "message" : "Description of error"
	}