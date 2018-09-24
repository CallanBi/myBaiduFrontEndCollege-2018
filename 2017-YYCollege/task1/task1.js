var myBlock = document.getElementById("block");
var sign = document.getElementById("sign");
var instruction = document.getElementById("instruction");

//构造作用域安全的blockConfig
var blockConfig = function() {
    if (this instanceof blockConfig) {
        this.x =  0;
        this.y =  0;
        this.signTop = 0;
        this.signLeft = 0;
        this.rotatePhase =  0; //用于改变方向，旋转多少个90度
        this.dirIndex = 0; //this.dir的索引，0，1,2,3代表顺时针的上、右、下、左
        this.dir = [[0,-1], [1,0], [0, 1], [-1, 0]]; //移动方向
        this.step = 80; //移动量，也就是格子的宽度
    } else {
        return new blockConfig();
    }
};

blockConfig.prototype = {
    constructor: blockConfig,
    setBlockConfigPosition: function (x, y) {
        this.x += x;
        this.y += y;
    },

    setBlockConfigSignPosition: function (){
        var signPosition = sign.getBoundingClientRect();
        this.signTop = signPosition.top;
        this.signLeft = signPosition.left;
    },

    setMyBlockPosition: function(){
        myBlock.style.left = (parseFloat(this.signLeft) + parseFloat(this.x * this.step)) + "px";
        myBlock.style.top = (parseFloat(this.signTop) + parseFloat(this.y * this.step)) + "px";
    },

    setMyBlockHeading: function() {
        myBlock.style.transform = "rotate" + "(" + 90 * this.rotatePhase + "deg" + ")";
    },

    myBlockGoForward: function() {
        if (this.rotatePhase > 0) {
            this.dirIndex = this.rotatePhase % 4;
        } else if (this.rotatePhase < 0) {
            if (this.rotatePhase%4 === 0) {
                this.dirIndex = this.rotatePhase % 4;
            } else {
                this.dirIndex = 4 + (this.rotatePhase%4);
            }
        } else {
            this.dirIndex = 0;
        }
        //console.log(this.dirIndex);
        if (this.checkRange(this.dir[this.dirIndex][0], this.dir[this.dirIndex][1])) {
            this.setBlockConfigPosition(this.dir[this.dirIndex][0], this.dir[this.dirIndex][1]);
            this.setMyBlockPosition();
        }
    },
    
    myBlockTurnLeft: function () {
        this.rotatePhase = this.rotatePhase - 1;
        this.setMyBlockHeading();
    },

    myBlockTurnRight: function () {
        this.rotatePhase = this.rotatePhase + 1;
        //console.log(blockConfigInstance.rotatePhase);
        this.setMyBlockHeading();
    },

    myBlockTurnBack: function() {
        this.myBlockTurnRight();
        this.myBlockTurnRight();
    },

    checkRange: function (xOffset, yOffset) {
        return !(this.x + xOffset < -5 || this.x + xOffset > 4 || this.y + yOffset < -4 || this.y + yOffset > 5);
    }
};

var blockConfigInstance = new blockConfig();

function  init() {
    blockConfigInstance.setBlockConfigSignPosition();
    blockConfigInstance.setMyBlockPosition();
}

//节流函数
function throttle(method, context){
    clearTimeout(method.tId);
    method.tId = setTimeout(function() {
        method.call(context);
    }, 100);
}

//当视口改变时重新计算myBlock的位置
window.addEventListener("resize", function() {
    throttle(init);
});

document.addEventListener("click", function (e) {
    var event = window.event || event;
    var target = event.target;
    switch (target.id) {
        case "go-forward":
            blockConfigInstance.myBlockGoForward();
            break;
        case "turn-left":
            blockConfigInstance.myBlockTurnLeft();
            break;
        case "turn-right":
            blockConfigInstance.myBlockTurnRight();
            break;
        case "turn-back":
            blockConfigInstance.myBlockTurnBack();
            break;
        case "do-instruction":
            if(instruction.value === "GO"){
                blockConfigInstance.myBlockGoForward();
            } else if(instruction.value === "TUN LEF") {
                blockConfigInstance.myBlockTurnLeft();
            } else if(instruction.value === "TUN RIG") {
                blockConfigInstance.myBlockTurnRight();
            } else if(instruction.value === "TUN BAC") {
                blockConfigInstance.myBlockTurnBack();
            } else {
                alert("非法指令!");
            }
            break;
    }
});


init();
