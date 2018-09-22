/*储存提示信息的三种状态，分别是默认提示、验证错误、验证通过.
  其中：姓名的验证错误有两种类型：空白错误和长度错误，邮箱和手机没有默认提示*/
const Hint = {
    username: {
      info: "必填，长度为4~16个字符",
      validated: "名称格式正确",
      blankError: "姓名不能为空",
      lenError: "长度不符合要求 当前长度："
    },
    password: {
        info:"密码在8-16位之间,必须且只能包含英文和数字",
        validated: "密码可用",
        error:  "密码不合法"
    },
    passwdConform: {
        info: "请再次输入相同密码",
        validated: "密码输入一致",
        error: "两次密码输入不一致"
    },
    mail: {
        validated: "邮箱格式正确",
        error: "邮箱格式错误"
    },
    phone: {
        validated: "手机格式正确",
        error: "手机格式错误"
    }
};

//储存验证用户输入的所有方法，为Verify类提供服务
var Check = {
    //获得输入长度
    getStringLen: function(str) {
        var len = 0;
        for (var i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 0x00 && str.charCodeAt(i) < 0xFF) {
                len++;
            } else if (str.charCodeAt(i) > 0xFF) {
                len += 2;
            } else if (str.charCodeAt(i) < 0xD800 || str.charCodeAt(i) > 0xDBFF) {
                len += 2;
                i++; //对于32位编码的字符，跳过下一个16bit
            }
        }
        return len;
    },

    //检查输入长度
    checkStringLength: function (min, max, str) {
        var len = this.getStringLen(str);
        return !(len < min || len > max);
    },

    //检查输入是否空白
    checkStringBlank: function(str) {
        return !(str === "" || !str.trim());
    },

    //检查用户姓名是否合法
    username: function(str) {
        if (this.checkStringBlank(str)) {
            if( this.checkStringLength(4, 16, str)) {
                return "ok";
            } else {
                return this.getStringLen(str);
            }
        } else {
            return "blankError";
        }
    },

    //检查第一次输入的密码是否合法
    password: function (str) {
        var regNumber = /\d+/;
        var regString = /[a-zA-Z]+/;
        return this.checkStringLength(8, 16, str) && regNumber.test(str) && regString.test(str);
    },

    //检查第二次输入的密码是否合法
    passwdConform: function (str) {
        var previousPasswd = document.getElementById("passwd-1").value;
        return str === previousPasswd;
    },

    //检查邮箱是否合法
    mail: function (node) {
        if (node.value === "" || !node.value.trim()) {
            return false;
        }
        return node.validity.valid;
    },

    //检查手机是否合法
    phone: function (str) {
        var regMobile = /^[1][0-9]{10}$/;
        return regMobile.test(str);
    }
};

//储存通过调用Check中的方法进行验证的方法
var Varify = {
    //验证某一单独的项
    varifyOne: function(node){
        var oneflag = true;
        if (node.getAttribute("inputtype")) {
            var type = node.getAttribute("inputtype");
            var val = node.value;
            if (type === "username") {
                if (Check.username(val) === "ok") {
                    this.showValidity(node);
                } else if (Check.username(val) === "blankError") {
                    this.showBlankError(node);
                    oneflag = false;
                } else if (typeof Check.username(val) === "number") {
                    var len = Check.username(val);
                    this.showLenError(node, len);
                    oneflag = false;
                }
            } else if (type === "mail"){
                if (Check.mail(node)) {
                    this.showValidity(node);
                } else {
                    this.showError(node);
                    oneflag = false;
                }
            } else {
                if(Check[type](val)) {
                    this.showValidity(node);
                } else {
                    this.showError(node);
                    oneflag = false;
                }
            }
        }
        return oneflag;
    },

    //验证所有项
    varifyAll: function() {
        var flag = true;
        var nodesList = [];
        nodesList = document.querySelectorAll(".input-box");
        //console.log(nodesList);

        var missingFlag = false;
        for (i=0; i < nodesList.length; i++) {
            if (nodesList[i].validity.valueMissing) {
                nodesList[i].className = "input-box input-box-error";
                nodesList[i].nextSibling.nextSibling.innerText = Hint[nodesList[i].getAttribute("inputtype")].error;
                nodesList[i].nextSibling.nextSibling.className = "error-message active";
                missingFlag = true;
            }
        }
        if (missingFlag) {
            alert("您有信息未填写");
            flag = false;
        }

        var faultFlag = false;
        for (i=0; i < nodesList.length; i++) {
            var tempflag = this.varifyOne(nodesList[i]);
            if (!tempflag) {
                faultFlag = true;
            }
        }
        if(faultFlag) {
            alert("输入有误");
            flag = false;
        }

        return flag;
    },

    //显示提示信息
    showHint: function(node) {
        if (node.getAttribute("inputtype")) {
            var type = node.getAttribute("inputtype");
            node.className = "input-box input-box-hint";
            if(Hint[type].info) {
                node.nextSibling.nextSibling.innerText = Hint[type].info;
            }
            node.nextSibling.nextSibling.className = "error-message not-active";
        }
    },

    //显示通过验证的信息
    showValidity: function(node) {
        if (node.getAttribute("inputtype")) {
            var type = node.getAttribute("inputtype");
            node.nextSibling.nextSibling.className = "error-message validated";
            node.nextSibling.nextSibling.innerText = Hint[type].validated;
            node.className = "input-box input-box-validated"
        }
    },

    //显示空白错误信息
    showBlankError(node) {
        if (node.getAttribute("inputtype")) {
            var type = node.getAttribute("inputtype");
            node.className = "input-box input-box-error";
            node.nextSibling.nextSibling.innerText = Hint[type].blankError;
            node.nextSibling.nextSibling.className = "error-message active";
        }
    },

    //显示长度错误信息
    showLenError(node, len) {
        if (node.getAttribute("inputtype")) {
            var type = node.getAttribute("inputtype");
            node.className = "input-box input-box-error";
            //console.log(node.nextSibling);
            node.nextSibling.nextSibling.innerText = Hint[type].lenError + len;
            //console.log(node.nextSibling.innerText);
            node.nextSibling.nextSibling.className = "error-message active";
        }
    },

    //显示错误信息
    showError(node) {
        if (node.getAttribute("inputtype")) {
            var type = node.getAttribute("inputtype");
            node.className = "input-box input-box-error";
            node.nextSibling.nextSibling.innerText = Hint[type].error;
            node.nextSibling.nextSibling.className = "error-message active";
        }
    }
};
