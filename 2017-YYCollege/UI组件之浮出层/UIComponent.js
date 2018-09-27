var wrapper = document.getElementById("float-wrapper");

document.addEventListener("click", function (e) {
    var event = e || window.event;
    var target = event.target;
    switch (target.id) {
        case "cancel":
            wrapper.style.display = "none";
            break;
        case "ok":
            wrapper.style.display = "none";
            break;
        case "btn":
            wrapper.style.display = "block";
            break;
    }
});

wrapper.addEventListener("click", function(e) {
    var event = e || window.event;
    var target = event.target;
    if (target === this) {
        wrapper.style.display = "none";
    }
});