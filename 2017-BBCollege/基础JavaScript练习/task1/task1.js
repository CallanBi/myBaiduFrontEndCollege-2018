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
        var newNumber = document.createElement("div");
        newNumber.className = "number"; //不是class,class是javaScript的保留字
        newNumber.innerHTML = input;
        queue.insertBefore(newNumber, queue.firstChild);
        var textNode = document.createTextNode(" ");
        queue.insertBefore(textNode, queue.firstChild);
    } else {
        alert("请输入有效的数字");
    }
}

function rightIn() {
    var input = document.getElementById("input-number").value;
    if (input === "") { //未输入数字时仍能插入空白的div标签，所以增加此判断语句.若输入空白，此时input的类型为string,值为""
        alert("请输入数字");
    } else if (!isNaN(input)) {
        var newNumber = document.createElement("div");
        newNumber.className = "number";
        newNumber.innerHTML = input;
        queue.appendChild(newNumber);
        var textNode = document.createTextNode(" "); //保持格式一致
        queue.appendChild(textNode);
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
    document.getElementById("input-number").value = Math.floor(Math.random() * 1000); //产生0~1000的随机数
}
