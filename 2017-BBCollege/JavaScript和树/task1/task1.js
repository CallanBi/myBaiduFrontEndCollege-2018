/*
  Traverse()
  功能：构造Traverse对象
  其中，preCount、midCount、afterCount分别是前序、中序和后序遍历时计时器使用的起到计时作用的变量，下文称为计时器变量
 */
function Traverse() {
    this.preCount = 1;
    this.midCount = 1;
    this.afterCount = 1;
    this.root = document.getElementById("root");
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
      * 功能：前序遍历
      */
    preOrderTraverse: function(root) {
        if (root !== null && root !== undefined) {
            setTimeout(function() {
                root.style.backgroundColor = "slateblue";
            }, this.preCount*500);
            this.preCount++;
            //console.log(this);
            //console.log(this.preCount);
            //console.log(root);
            setTimeout(function() {
                root.style.backgroundColor = "#cfcfcf";
            }, this.preCount*500+25);
            arguments.callee.call(this, root.childNodes[0]);
            /*在递归时，arguments.callee的this不是Traverse实例，而是指向了这个函数。
            由于preOrderTraverse是Traverse的一个方法（在Traverse的原型中），所以preOrderTraverse的this是Traverse实例。
            所以用call()方法传入this,这样preCount变量就可以被找到了。*/
            arguments.callee.call(this, root.childNodes[1]);
        }
    },

    /*
     * midOrderTraverse()
      * 功能：中序遍历
      */
    midOrderTraverse: function(root) {
        if (root !== null && root !== undefined) {
            arguments.callee.call(this, root.childNodes[0]);
            setTimeout(function() {
                root.style.backgroundColor = "slateblue";
            }, this.midCount*500);
            this.midCount++;
            //console.log(this);
            //console.log(this.preCount);
            //console.log(root);
            setTimeout(function() {
                root.style.backgroundColor = "#cfcfcf";
            }, this.midCount*500+25);
            arguments.callee.call(this, root.childNodes[1]);
        }
    },

    /*
     * afterOrderTraverse()
      * 功能：后序遍历
      */
    afterOrderTraverse: function (root) {
        if (root !== null && root !== undefined) {
            arguments.callee.call(this, root.childNodes[0]);
            arguments.callee.call(this, root.childNodes[1]);
            setTimeout(function() {
                root.style.backgroundColor = "slateblue";
            }, this.afterCount*500);
            this.afterCount++;
            //console.log(this);
            //console.log(this.preCount);
            //console.log(root);
            setTimeout(function() {
                root.style.backgroundColor = "#cfcfcf";
            }, this.afterCount*500+25);
        }
    },


    /*
     * preOrder()
      * 功能：前序遍历后重置计时器变量，并恢复背景为白色
      */
    preOrder: function(root){
        this.preOrderTraverse(root);
        this.clearBackground(root, this.preCount);
        this.preCount = 1;
    },

    /*
     * midOrder()
      * 功能：中序遍历后重置计时器变量，并恢复背景为白色
      */
    midOrder: function(root){
        this.midOrderTraverse(root);
        //alert(this.midCount);
        this.clearBackground(root, this.midCount);
        this.midCount = 1;
    },

    /*
     * afterOrder()
      * 功能：后序遍历后重置计时器变量，并恢复背景为白色
      */
    afterOrder: function(root){
        this.afterOrderTraverse(root);
        this.clearBackground(root, this.afterCount);
        this.afterCount = 1;
    },

    clearBackground: function (root, count){
        setTimeout(function(root) {
            if (root !== null && root !== undefined) {
                root.style.backgroundColor = "white";
                arguments.callee(root.childNodes[0]);
                arguments.callee(root.childNodes[1]);
            }
        }, count*500+250, root); //注意将root传入clear函数里！
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
               }, 16*500+250)
           }else {
               alert("在进行遍历时不能重复点击遍历按钮");
           }
           break;
       case  "mid-order":
           if (processArray.length === 0) {
               processArray.push("mid-order");
               traverseInstance.midOrder(traverseInstance.root);
               setTimeout(function (){
                   processArray.shift();
               }, 16*500+250)
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
               }, 16*500+250)
           }else {
               alert("在进行遍历时不能重复点击遍历按钮");
           }
           break;
   }
});
