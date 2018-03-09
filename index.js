    // We need this to build our post string
    var querystring = require('querystring');
    var https       = require('https');
    // Your login credentials
    var username = 'NodewithAfricastalking';
    var apikey   = '1a9c2a01b0ca08b4afd617201576d08a2c145b0bfe85885ece30e213a7eac5f8';   
    function sendMessage() {
        
        // Define the recipient numbers in a comma separated string
        // Numbers should be in international format as shown
        var to      = '+254792718714';
        
        // And of course we want our recipients to know what we really do
        var message = "Hey am Nicholas Barkote a developer studing at dedan kimathi university in nyeri kenya am good at both web and app development  ni nico ";
        
        // Build the post string from an object
        
        var post_data = querystring.stringify({
            'username' : username,
            'to'       : to,
            'message'  : message
        });
        
        var post_options = {
            host   : 'api.africastalking.com',
            path   : '/version1/messaging',
            method : 'POST',
            
            rejectUnauthorized : false,
            requestCert        : true,
            agent              : false,
            
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Content-Length': post_data.length,
                'Accept': 'application/json',
                'apikey': apikey
            }
        };
        
        var post_req = https.request(post_options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                var jsObject   = JSON.parse(chunk);
                var recipients = jsObject.SMSMessageData.Recipients;
                if ( recipients.length > 0 ) {
                    for (var i = 0; i < recipients.length; ++i ) {
                        var logStr  = 'number=' + recipients[i].number;
                        logStr     += ';cost='   + recipients[i].cost;
                        logStr     += ';status=' + recipients[i].status; // status is either "Success" or "error message"
                        console.log(logStr);
                        }
                    } else {
                        console.log('Error while sending: ' + jsObject.SMSMessageData.Message);
                }
            });
        });
        
        // Add post parameters to the http request
        post_req.write(post_data);
        
        post_req.end();
    }
    //Call sendMessage method
    sendMessage();