var errorMessage = document.getElementsByClassName("error-message")[0];
var inputText = document.getElementById("input-text-1");
var flag = true;

inputText.addEventListener("focus", function () {
    checkInputBlank();
    if (flag === true) {
        checkInputLength();
    }
    if (flag === true) {
        errorMessage.className = "error-message validated";
        errorMessage.innerText = "名称格式正确";
        inputText.className = "input-box input-box-validated"
    }
});

inputText.addEventListener("blur", function () {
    errorMessage.innerText = "必填，长度为4~16个字符";
    errorMessage.className = "error-message not-active";
    inputText.className = "input-box";
});

inputText.addEventListener("keyup",function () {
    checkInputBlank();
    if (flag === true) {
        checkInputLength();
    }
    if (flag === true) {
        errorMessage.className = "error-message validated";
        errorMessage.innerText = "名称格式正确";
        inputText.className = "input-box input-box-validated"
    }

});

document.addEventListener("click", function (event) {
   var target = event.target;
   switch (target.id) {
       case "input1-validate":
           checkInputBlank();
           if (flag === true) {
               checkInputLength();
           }
           if (flag === true) {
               errorMessage.className = "error-message validated";
               errorMessage.innerText = "名称格式正确";
               inputText.className = "input-box input-box-validated"
           }
   }
});

function checkInputBlank() {
    var value = inputText.value;
    if (value === "" || !value.trim()) { //如果姓名为空或姓名中全是空格
        //console.log(value);
        //console.log(/\0/.test(value));
        errorMessage.innerText = "姓名不能为空";
        errorMessage.className = "error-message active";
        inputText.className = "input-box input-box-error";
        flag = false;
    } else {
        errorMessage.innerText = "必填，长度为4~16个字符";
        errorMessage.className = "error-message not-active";
        inputText.className = "input-box";
        flag = true;
    }
}

function checkInputLength() {
    var value = inputText.value;
    var valLen = 0;
    for (var i = 0; i < value.length; i++) {
        if(value.charCodeAt(i) > 0x00 && value.charCodeAt(i) < 0xFF) {
            valLen++;
        } else if (value.charCodeAt(i) > 0xFF){
            valLen += 2;
        } else if (value.charCodeAt(i) < 0xD800 || value.charCodeAt(i) > 0xDBFF) {
            valLen +=2;
            i++; //对于32位编码的字符，跳过下一个16bit
        }
    }
    if(valLen < 4 || valLen > 16) {
        errorMessage.innerText = "长度不符合要求 当前长度：" + valLen;
        errorMessage.className = "error-message active";
        inputText.className = "input-box input-box-error";
        flag = false;
    } else {
        errorMessage.innerText = "必填，长度为4~16个字符";
        errorMessage.className = "error-message not-active";
        inputText.className = "input-box";
        flag = true;
    }
}