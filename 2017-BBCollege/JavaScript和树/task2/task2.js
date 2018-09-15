/*
  Traverse()
  功能：构造Traverse对象
  其中，preCount、afterCount分别是深度优先前序和深度优先后序遍历时计时器使用的起到计时作用的变量，下文称为计时器变量
 */
function Traverse() {
    this.preCount = 1;
    this.afterCount = 1;
    this.root = document.getElementById("root");
    this.flag = 0;
}

/*
 * Traverse.prototype对象
  * 功能：写有Traverse对象的方法
  */
Traverse.prototype = {
    //改变字面量对象创建时的constructor，从Object变为Traverse
    constructor: Traverse,

    /*
     * preOrderTraverse()
      * 功能：深度优先前序遍历
      */
    preOrderTraverse: function(root) {
        var searchInput = document.getElementById("search").value;
        while ((root.tagName === "p" )) {
            if (root.nextSibling !== null && root.nextSibling !== undefined ) {
                root = root.nextSibling;
            }else {
                return;
            }
        }
        if ((root.firstChild.nodeType === 3)) {//当找到文本节点时，对文字进行搜索
            this.searchNodes(root.firstChild, this.preCount, searchInput);
            return;
        }
        if (root !== null && root !== undefined) {
            setTimeout(function() {
                root.style.backgroundColor = "slateblue";
            }, this.preCount*125);
            this.preCount++;
            //console.log(this);
            //console.log(this.preCount);
            //console.log(root);
            setTimeout(function() {
                root.style.backgroundColor = "#cfcfcf";
            }, this.preCount*125+7);
            for (var i = 0; i<root.childNodes.length; i++) {
                arguments.callee.call(this, root.childNodes[i]);
            }
            /*在递归时，arguments.callee的this不是Traverse实例，而是指向了这个函数。
            由于preOrderTraverse是Traverse的一个方法（在Traverse的原型中），所以preOrderTraverse的this是Traverse实例。
            所以用call()方法传入this,这样preCount变量就可以被找到了。*/
        }
    },


    /*
     * afterOrderTraverse()
      * 功能：深度优先后序遍历
      */
    afterOrderTraverse: function (root) {
        var searchInput = document.getElementById("search").value;
        while ((root.tagName === "p" )) {
            if (root.nextSibling !== null && root.nextSibling !== undefined ) {
                root = root.nextSibling;
            }else {
                return;
            }
        }
        if ((root.firstChild.nodeType === 3)) {
            this.searchNodes(root.firstChild, this.preCount, searchInput);
            return;
        }

        if (root !== null && root !== undefined) {
            for (var i = 0; i<root.childNodes.length; i++) {
                arguments.callee.call(this, root.childNodes[i]);
            }
            setTimeout(function() {
                root.style.backgroundColor = "slateblue";
            }, this.afterCount*125);
            this.afterCount++;
            //console.log(this);
            //console.log(this.preCount);
            //console.log(root);
            setTimeout(function() {
                root.style.backgroundColor = "#cfcfcf";
            }, this.afterCount*125+7);
        }
    },


    /*
     * preOrder()
      * 功能：深度优先前序遍历后重置计时器变量，并恢复背景为白色
      */
    preOrder: function(root){
        this.preOrderTraverse(root);
        //alert(this.preCount);
        if(this.flag === 0) {
            setTimeout(function () {
                alert("未查询到任何结果");
            }, 22*125+7);
        }
        this.clearBackground(root, this.preCount);
        this.preCount = 1;
    },


    /*
     * afterOrder()
      * 功能：深度优先后序遍历后重置计时器变量，并恢复背景为白色
      */
    afterOrder: function(root){
        this.afterOrderTraverse(root);
        if(this.flag === 0) {
            setTimeout(function () {
                alert("未查询到任何结果");
            }, 22*125+7);
        }
        this.clearBackground(root, this.afterCount);
        this.afterCount = 1;
    },

    searchNodes:function(node, count, searchInput) {
    if (searchInput === "") {
        this.flag = 0;
        return;
    }
    searchInput = searchInput.trim();

    var reg = new RegExp(searchInput, "gi"); //g表示全局，i表示对大小写不敏感
    //console.log(reg);
    if(reg.test(node.nodeValue)){
        this.flag = 1;
        setTimeout(function () {
            node.parentElement.style.backgroundColor = "#74B391";
        }, count*125);
    } else {
        node.parentElement.style.backgroundColor = "";
    }
    },

    clearBackground: function (root, count){
        setTimeout(function(root) {
            while ((root.tagName === "p" )) {
                if (root.nextSibling !== null && root.nextSibling !== undefined ) {
                    root = root.nextSibling;
                }else {
                    return;
                }
            }
            if ((root.firstChild.nodeType === 3)) {
                return;
            }
            if (root !== null && root !== undefined) {
                root.style.backgroundColor = "white";
                for (var i = 0; i<root.childNodes.length; i++) {
                    arguments.callee(root.childNodes[i]);
                }
            }
        }, count*125+7, root); //注意将root传入clear函数里！
    }

};




var traverseInstance = new Traverse(); //创建Traverse实例
var processArray = []; //创建事件处理队列，当重复点击遍历按钮时弹出警示

//事件委托
document.addEventListener("click", function (event) {
   var target = event.target;
   switch (target.id) {
       case "pre-order":
           if (processArray.length === 0) {
               processArray.push("pre-order");
               traverseInstance.preOrder(traverseInstance.root);
               setTimeout(function (){
                   processArray.shift();
               }, 22*125+7)
           }else {
               alert("在进行遍历时不能重复点击遍历按钮");
           }
           break;
       case "after-order":
           if (processArray.length === 0) {
               processArray.push("after-order");
               traverseInstance.afterOrder(traverseInstance.root);
               setTimeout(function (){
                   processArray.shift();
               }, 22*125+7)
           }else {
               alert("在进行遍历时不能重复点击遍历按钮");
           }
           break;
   }
});
