const Config = {
    "北京": {
        schoolList: ["北京大学", "清华大学", "北京航空航天大学", "北京理工大学", "北京邮电大学","北京交通大学", "北京工业大学"]
    },
    "上海": {
        schoolList: ["复旦大学", "上海交通大学", "同济大学", "华东师范大学", "上海大学"]
    },
    "广州": {
        schoolList: ["中山大学", "华南理工大学", "暨南大学", "广东外语外贸大学"]
    }
};

var region = document.getElementById("region");
var school = document.getElementById("school");

var undergraduate = document.getElementById("undergraduate");
var graduate = document.getElementById("graduate");

var undergraduateRadio = document.getElementById("undergraduate-radio");
var graduateRadio = document.getElementById("graduate-radio");

var undergraduateLabel = document.getElementById("undergraduate-label");
var graduateLabel = document.getElementById("graduate-label");

function init() {
    undergraduateRadio.checked = "checked";
    for (key in Config) {
        region.add(new Option(key));
    }
    for (var i=0; i<Config["北京"].schoolList.length; i++){
        school.add(new Option(Config["北京"].schoolList[i]));
    }
    graduate.style.display = "none";
}

region.addEventListener("change", function () {
    var city = region.options[region.selectedIndex].text;
    while (school.options.length !== 0){
        school.options.remove(0);
    }
    for (var i=0; i<Config[city].schoolList.length; i++) {
        school.add(new Option(Config[city].schoolList[i]));
    }

});

graduateLabel.addEventListener("click", function () {
    undergraduateRadio.checked = "";

   graduateRadio.checked = "checked";
   graduate.style.display = "block";
   undergraduate.style.display = "none";
});

undergraduateLabel.addEventListener("click", function () {
    graduateRadio.checked = "";

    undergraduateRadio.checked = "checked";
    undergraduate.style.display = "block";
    graduate.style.display = "none";
});

init();