var app = require("./route/route.js");



app.listen(app.get('port'), function() {
console.log("ciao, siamo collegati alla porta " + app.get("port"));
});


