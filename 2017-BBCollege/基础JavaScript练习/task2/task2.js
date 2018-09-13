var control = document.getElementById("control");

//事件委托
document.addEventListener("click", function(event){
    var target = event.target;
    switch (target.id) {
        case "left-in":
            //console.log("left-in");
            leftIn();
            break;
        case "right-in":
            //console.log("left-out");
            rightIn();
            break;
        case "left-out":
            //console.log("right-in");
            leftOut();
            break;
        case "right-out":
            //console.log("right-out");
            rightOut();
            break;
        case "random-number":
            getRandomNumber();
            break;
        case "generate-random-queue":
            getRandomQueue();
            break;
        case "bubble-sort":
            bubbleSort();
            break;
    }
});

document.addEventListener("click", function(event){
    var target = event.target;
    switch (target.className) {
        case "number":
            removeNumber(target);
            break;
    }
});

var queue = document.getElementById("queue");

function leftIn() {
    var input = document.getElementById("input-number").value;
    if (input === "") {
        alert("请输入数字");
    } else if (!isNaN(input)) {
        if (input >= 10 && input <= 100) {
            var newNumber = document.createElement("div");
            newNumber.className = "number"; //不是class,class是javaScript的保留字
            newNumber.innerHTML = input;
            newNumber.style.height = input*3 + "px";
            queue.insertBefore(newNumber, queue.firstChild);
        } else {
            alert("请输入10~100范围内的数字");
        }
    } else {
        alert("请输入有效的数字");
    }
}

function rightIn() {
    var input = document.getElementById("input-number").value;
    if (input === "") { //未输入数字时仍能插入空白的div标签，所以增加此判断语句.若输入空白，此时input的类型为string,值为""
        alert("请输入数字");
    } else if (!isNaN(input)) {
        if (input >= 10 && input <= 100) {
            var newNumber = document.createElement("div");
            newNumber.className = "number";
            newNumber.innerHTML = input;
            newNumber.style.height = input*3 + "px";
            queue.appendChild(newNumber);
        } else {
            alert("请输入10~100范围内的数字");
        }
    } else {
        alert("请输入有效的数字");
    }
}

function leftOut() {
    if (queue.firstChild !== null) { //先判断节点是否是null再在内部判断nodeType的值，否则会抛出错误
        if (queue.firstChild.nodeType === 1) {
            alert("您将要删除的项的值为：" + queue.firstChild.firstChild.nodeValue);
            queue.removeChild(queue.firstChild);
        } else if (queue.firstChild.nodeType !== 1) {
            queue.removeChild(queue.firstChild); //删除空白Text节点
            return arguments.callee(); //递归调用,删除Element节点
        } else {
            alert("something went wrong");
        }
    } else {
        alert("队列中没有数啦，不能出队列啦");
    }
}

function rightOut() {
    if (queue.lastChild !== null) {
        if (queue.lastChild.nodeType === 1) {
            alert("您将要删除的项的值为：" + queue.lastChild.firstChild.nodeValue);
            queue.removeChild(queue.lastChild);
        } else if (queue.lastChild.nodeType !== 1) {
            queue.removeChild(queue.lastChild);
            return arguments.callee();
        } else {
            alert("something went wrong");
        }
    } else {
        alert("队列中没有数啦，不能出队列啦");
    }
}

function removeNumber(target) {
    alert("您将要删除的项的值为：" + target.firstChild.nodeValue);
    queue.removeChild(target);
}

function getRandomNumber() {
    document.getElementById("input-number").value = Math.floor(Math.random() * 91 + 10); //产生10~100的随机数
}

function getRandomQueue() {
    for (var i = 0; i <= 10; i++) {
        getRandomNumber();
        leftIn();
    }
}

//setTImeout方法实现可视化
function swapNumber(item1, item2, count, i, j, listNumber) {
    //console.log(listNumber[i]);
    //console.log(listNumber[j]);
    var temp = listNumber[i];
    listNumber[i] = listNumber[j];
    listNumber[j] = temp;

    setTimeout(function(item1, item2) {
        item1.style.background = "#456";
        item2.style.background = "#456";
    }, count*250-125, item1, item2);

    setTimeout(function(item1, item2, x, y) {
        item1.innerText = x;
        item1.style.height = x*3 + "px";
        item2.innerText = y;
        item2.style.height = y*3 + "px";
    }, count*250, item1, item2, listNumber[i], listNumber[j]);

    setTimeout(function (item1, item2){
        item1.style.background = "red";
        item2.style.background = "red";
    }, count*250+125, item1, item2);
}


//可视化冒泡排序
function bubbleSort() {
    //由于DOM树是动态的，在异步操作dom时，之前的DOM可能就不是现在的DOM了。所以应该先建一个数组储存之前的值
    var listNumber = [];
    for(var i = 0;i < queue.childNodes.length; i++) {
        var val = queue.childNodes[i].innerText;
        listNumber.push(parseInt(val));
    }
    var count = 1;
    for (i = 0; i < queue.childNodes.length; i++) {
        for (var j = i+1; j < queue.childNodes.length; j++) {
            if (listNumber[i] > listNumber[j]) {
                count ++;
                console.log(count);
                swapNumber(queue.childNodes[i], queue.childNodes[j], count, i, j, listNumber);
            }
        }
    }
}