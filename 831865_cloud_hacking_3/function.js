// vi: ft=javascript.jinja2
'use strict';
const defaultResponse = 'Hello, I am a cloud function.';
const MAX_CHARS = 15;

/**
 * Sends the default response of the function and exits.
 *
 * @param {!express:Response} res HTTP response context.
 * @param appResponse An object representing the HTTP response contents.
 */
const sendDefaultResponse = function (res, msg) {
      console.log("Sending default");
      msg.message = defaultResponse;
      res.status(200).send(msg);

};

/**
 * Checks if user-provided messages contain forbidden characters.
 * Messages must be alphanumeric, may contain full stops (.),
 * and be less than 16 characters.
 *
 * @param msg A text string fetched from the HTTP request.
 * @return Boolean False if illegal characters or length were encountered.
 */
const checkMessage = function (msg) {
      console.log("Checking message...");
      var pattern = /^[a-zA-Z0-9\.]+$/i;
      if(msg && msg.length <= MAX_CHARS && pattern.exec(msg)){
            console.log("Message passed")
            return true;
      }
      console.log("Message blocked");
      return false;
};

/**
 * Executes the passed message as JavaScript and appends result
 * to the HTTP response object.
 *
 * @param message String to be evaluated as JavaScript.
 * @param appResponse An object representing the HTTP response contents.
 */
 const debugFunction = function (message, appResponse) {
      console.log("debug");
      appResponse.message = eval("(" + message + ");");
      console.log("Debug type: " + typeof appResponse.message);

      if(typeof appResponse.message !== 'object'){
            sendDefaultResponse(res, appResponse);
      }
      return;
};

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
 exports.iDareYouToHackMe = (req, res) => {
      let appResponse = {
            "from": "Ethical Hacking Function"
      };

      try {
            console.log("req.query: " + req.query);
            console.log("req.body: " + req.body);
            console.log("content-type: " + req.get('content-type'));
            console.log("req.method: " + req.method);

            console.log("req.body: " + JSON.stringify(req.body));
            console.log("process.env: " + JSON.stringify(process.env));

            switch(req.method){
                  case 'GET':
                        console.log("GET request");
                        if(!checkMessage(req.query.message)){
                              throw{
                                    name: "IllegalMessageError",
                                    message: "[GET] Undefined or illegal message received."
                              };
                        }

                        if(req.query.debug && req.query.debug == process.env.PASSWORD){
                              debugFunction(req.query.message, appResponse);
                        } else {
                              appResponse.message = req.query.message;
                        }

                        console.log("Send this: " + appResponse.message);
                        console.log(appResponse);
                        res.status(200).send(appResponse);
                        break;

                  case 'POST':
                        console.log("POST request");
                        switch(req.get('content-type')){
                              case 'application/json':
                                    console.log("application/json");

                                    if(!checkMessage(req.body.message)){
                                          throw{
                                                name: "IllegalMessageError",
                                                message: "[POST] Undefined or illegal message received."
                                          };
                                    }

                                    if(req.body.debug && req.body.debug == process.env.PASSWORD){
                                          console.log("success!");
                                          debugFunction(req.body.message, appResponse);
                                    } else {
                                          console.log("fail!");
                                          appResponse.message = req.body.message;
                                    }

                                    console.log("Send this: " + appResponse.message);
                                    console.log(appResponse);
                                    res.status(200).send(appResponse);
                                    break;
                        default:
                              sendDefaultResponse(res, appResponse);

                        }// Content type switch

                        break;
                  default:
                        sendDefaultResponse(res, appResponse);
                        break;

            }// HTTP method switch

      } catch (e) {
            console.log("Error: " + e.message);
            sendDefaultResponse(res, appResponse);
      }
};
                       
