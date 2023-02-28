// Start up
console.log("Loaded")

// Validationalization
Test = ((((2*2)+2)**2)/2)-2
if (Test ==  4**2)
    console.log("VALID")
else
    console.log("INVALID")

AlreadyTold = localStorage.getItem("tell")
if (AlreadyTold == "Yes")
    AlreadyTold = true
else
    AlreadyTold = false

let userAgent = navigator.userAgent;
let browserName;

if (userAgent.match(/chrome|chromium|crios/i) || userAgent.match(/edg/i)) {
    console.log("Browser is well supported by the website!")
}
else if (userAgent.match(/firefox|fxios/i))
{
    console.error("Browser is not supported by the website!")
}
else {
    console.warn("Browser is just compatible with the website")
    if (!AlreadyTold) {
        alert("Hi sir, Thanks for using our website, we suggest you to use chrome/edge instead of the browser you are using currently for better performance and better design")
        localStorage.setItem("tell","Yes")
    }
}

// Crisp chat
window.$crisp=[];window.CRISP_WEBSITE_ID="b4db9d72-b002-49a6-9a95-11a315b87392";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();