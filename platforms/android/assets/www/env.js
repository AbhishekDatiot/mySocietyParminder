(function (window) {
  window.__env = window.__env || {};

  var environment = "qa"; //can be dev, test or prod.qa

  if(environment === "qa"){
    window.__env.dataServerUrl = 'http://ec2-52-201-226-155.compute-1.amazonaws.com:8080';
    window.__env.baseUrl = '/';
    window.__env.enableDebug = true;
    window.__env.user = "";
    window.__env.password = "";
  }
  else  {
    window.__env.dataServerUrl = 'http://192.168.122.1:8080';
    window.__env.baseUrl = '/';
    window.__env.enableDebug = true;
    // window.__env.user = "9999999999";
    // window.__env.password = "secret";
  }

}(this));

