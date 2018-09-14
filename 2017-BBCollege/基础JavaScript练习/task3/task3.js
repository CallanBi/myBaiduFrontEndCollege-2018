document.addEventListener("click", function (event) {
    var target = event.target;
    switch (target.id) {
        case "input-ok":
            //console.log("input-ok");
            putWordNodes();
            break;
        case  "search-ok":
            //console.log("search-ok");
            searchNodes();
            break;
    }
});

//阻止tab键切换焦点，并把tab键转化为4个空格
document.getElementById("input-area").addEventListener("keydown", function(event) {
    if (event.keyCode === 9) {
        //console.log("tab");
        var textArea = document.getElementById("input-area");
        textArea.value = textArea.value + "    ";
        event.preventDefault();
    }
});

queue = document.getElementById("queue");

function putWordNodes() {
    var rawInput = document.getElementById("input-area").value;
    //console.log(rawInput);
    var nodes = getWordNodes(rawInput);
    //console.log(nodes);
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i] !== "") { //防止第一个输入是空格
            var newNode = document.createElement("div");
            newNode.className = "word";
            newNode.innerText = nodes[i];
            queue.appendChild(newNode);
        }
    }
}

function getWordNodes(input) {
    var pattern = /[,，、\s\t\n\r]+/;
    return input.split(pattern);
}

function searchNodes() {
    var searchInput = document.getElementById("search").value;

    //检查输入是否包含正则表达式的元字符
    if (/\./g.test(searchInput)) {
        searchInput = searchInput.replace(/\./g, "\\.");
    }
    if (/\+/g.test(searchInput)) {
        searchInput = searchInput.replace(/\+/g, "\\+");
    }
    if (/\*/g.test(searchInput)) {
        searchInput = searchInput.replace(/\*/g, "\\*");
    }
    if (/\(/g.test(searchInput)) {
        searchInput = searchInput.replace(/\(/g, "\\(");
    }
    if (/\)/g.test(searchInput)) {
        searchInput = searchInput.replace(/\)/g, "\\)");
    }
    if (/\*/g.test(searchInput)) {
        searchInput = searchInput.replace(/\*/g, "\\*");
    }
    if (/\^/g.test(searchInput)) {
        searchInput = searchInput.replace(/\^/g, "\\^");
    }
    if (/\$/g.test(searchInput)) {
        searchInput = searchInput.replace(/\$/g, "\\$");
    }
    if (/\?/g.test(searchInput)) {
        searchInput = searchInput.replace(/\?/g, "\\?");
    }
    if (/\{/g.test(searchInput)) {
        searchInput = searchInput.replace(/\{/g, "\\{");
    }
    if (/\}/g.test(searchInput)) {
        searchInput = searchInput.replace(/\}/g, "\\}");
    }
    if (/\[/g.test(searchInput)) {
        searchInput = searchInput.replace(/\[/g, "\\[");
    }
    if (/\]/g.test(searchInput)) {
        searchInput = searchInput.replace(/\]/g, "\\]");
    }
    if (/[,，、\s\t\n\r]+/g.test(searchInput)) {
        alert("您输入了非法字符。请勿包含分隔符，如\"，\"和空格等");
        return;
    }

    var reg = new RegExp(searchInput, "gi"); //g表示全局，i表示对大小写不敏感
    //console.log(reg);
    var flag = 0; //是否查询到结果的标志
    for (var i = 0; i < queue.childNodes.length; i++) {
        if(reg.test(queue.childNodes[i].innerText)) {
            flag = 1;
            queue.childNodes[i].style.background = "#74B391";
            var context = queue.childNodes[i].innerText;
            //console.log(context);
            //console.log(typeof context);
            var original = context.match(reg); //因为设置了大小写不敏感，所以应先取得原先大小写形式的字符
            //console.log(newContext);
            queue.childNodes[i].innerHTML = context.replace(reg, '<span class="highlight">' + original + '</span>'); //innerHTML中HTML应大写
            //console.log(queue.childNodes[i].innerHTML);
        } else { //消除原来的查询效果
            queue.childNodes[i].style.background = "";
            queue.childNodes[i].innerHTML = queue.childNodes[i].innerHTML.replace(/<span class="highlight">/g, "");
            queue.childNodes[i].innerHTML = queue.childNodes[i].innerHTML.replace(/<\/span>/g, "");
        }
    }

    if (flag === 0) {
        alert("未查询到任何结果");
    }
}
