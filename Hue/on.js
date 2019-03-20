var Hue = require('philips-hue');
var hue = new Hue();

hue.bridge= "192.168.0.8";
hue.username= "fypfJh24fgnR0lkMPIqUXQZZ-fngZ3P8UcGekkOu";
hue.light(2).on();