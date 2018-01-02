// Utilities.js

function keyCodeEvent(input, obj, func) {
    if (keyIsPressed)
        if (keyCode === input)
            func(obj);
}

function keyEvent(input, obj, func) {
    if (keyIsPressed)
        if (key === input)
            func(obj);
}