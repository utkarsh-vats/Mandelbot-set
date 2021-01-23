const canvas = document.getElementById("canvas1");
var ctx = canvas.getContext("2d");

let slider = document.getElementById("mySlider");

canvas.width = 400;
canvas.height = 400;

var width = canvas.width;
var height = canvas.height;

// var min = -3;
// var max = -1 * min;
var size = 3;

var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
var data = imageData.data;

function scaleRange(num, in_min, in_max, out_min, out_max) {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function draw() {    
    for(var i = 0; i < width; i++){
        for(var j = 0; j < height; j++) {

            var a = scaleRange(i, 0, width, -size, size);
            var b = scaleRange(j, 0, height, -size, size);

            var ca = a;
            var cb = b;

            var n = 0;

            while(n < 100) {
                var aa = a*a - b*b;
                var bb = 2 * a * b;
                a = aa + ca;
                b = bb + cb;

                if(Math.abs(a + b) > 32)
                    break;

                n++;
            }

            var bright = scaleRange(n, 0, 100, 0, 255);

            var pix = (i + j * width) * 4;
            data[pix + 0] = bright;
            data[pix + 1] = bright;
            data[pix + 2] = bright;
            data[pix + 3] = 255;
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

draw();

slider.onchange = () => {
    size = slider.value;
    draw();
}

// slider.oninput = () => {
//     console.log(slider.value);
// }