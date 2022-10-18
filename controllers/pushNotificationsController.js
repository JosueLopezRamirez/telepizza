/** @format */

const https = require("https");
console.log("LO QUE FALTA");

module.exports = {
  sendNotification(token, data) {
    const notification = JSON.stringify({
      to: token,
      data: {
        title: data.title,
        body: data.body,
        id_notification: data.id_notification,
        priority: "high",
        ttl: "4500s"
      }
    });

    const options = {
      hostname: "fcm.googlapis.com",
      path: "/fcm/send",
      method: "POST",
      port: 443,
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "key=AAAAVtzCK28:APA91bGlHK4xgu0eD3bAmpgx2qxLHGyJKynqCyH3JHl-VmuK1D7bjzNZWkU702Mrtz4UbUbEpYgQvqUiwnJcXx695ia5IvY2a_ZD9S1sk1UfHE008uEr7DObu-kZtqpT23TTP1gp_Yw5"
      }
    };

    const req = https.request(options, (res) => {
      console.log("STATUS CODE FIREBASE: ", res.statusCode);
      res.on("data", (d) => {
        process.stdout.write(d);
      });
    });

    req.on("error", (error) => {
      console.log("ERROR DE FIREBASE NOTIFICATION:", erro);
    });
    req.write(notification);
    req.end();
  }
};
