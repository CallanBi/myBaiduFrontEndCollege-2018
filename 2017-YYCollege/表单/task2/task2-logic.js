document.write("<script src='task2-method.js'></script>");

var form = document.getElementById("main-form");

//输入框获得焦点时，显示提示信息
form.addEventListener("focusin", function (e) {
    var event = e || window.event;
    var target = event.target;
    if (target.className = "input-box"){
        Varify.showHint(target);
    }
});

//输入框有用户输入时，显示提示信息
form.addEventListener("keyup",function (e) {
    var event = e || window.event;
    var target = event.target;
    if (target.className = "input-box") {
        Varify.showHint(target);
    }
});

//阻止用户在手机号码输入框输入除数字以外的字符
document.getElementById("phone").addEventListener("keypress", function (e) {
    var event = e || window.event;
    if (!/\d/.test(String.fromCharCode(event.charCode) || event.charCode  > 0xFF)) {
        event.preventDefault();
    }
});

//输入框失去焦点时，验证输入并显示相应信息
form.addEventListener("focusout", function (e) {
    var event = e || window.event;
    var target = event.target;
    Varify.varifyOne(target);
});

//用户点击提交按钮时，验证所有输入，若输入有误则给出提示,若无误则显示提交成功
document.addEventListener("click", function (e) {
    var event = e || window.event;
   var target = event.target;
   switch (target.id) {
       case "input-validate":
           var whetherSubmit = Varify.varifyAll();
           if(whetherSubmit) {
               alert("提交成功");
           }else {
               event.preventDefault();
           }
           break;
   }
});