
var DashButton = require("node-dash-button");
var hue = require("node-hue-api");
var HueApi = hue.HueApi;
var lightState = hue.lightState;
var hostname = "172.31.2.12";
var username = "dWAksDC1ms0uTSIVlgsD3XbyP4KLodto7o31L7X";
var api = new HueApi(hostname, username);
var state = lightState.create();
var dash = DashButton("88:71:e3:88:28:69", null, null, 'all');
dash.on("detected", function (){
    var bedroomId = 1;
    api.lightStatus(bedroomId)
    .then(function(status) {
        var newStatus = status.state.on ? state.off() : state.on();
        api.setLightState(bedroomId, newStatus)
        .then(function(result) { console.log(result); })
        .fail(function(error) { console.log(error); })
        .done();
    }).done();
});
//view rawaws_btn_click_to_hue_on.js hosted with ❤ by GitHub
