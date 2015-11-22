var cvs, ctx;
var elements = [];
var elements2 = [];

function getPosition(event)
{
  var x = event.x;
  var y = event.y;

  x -= cvs.offsetLeft;
  y -= cvs.offsetTop;

  for(var h = 0; h < elements.length; h++){
    if(Math.pow(elements[h].posx - x, 2) + Math.pow(elements[h].posy - y, 2) <= 400)
      window.location = "http://www.wolframalpha.com/input/?i=atomic+number+" + elements[h].number;
  }

}

function init() {
   cvs = document.getElementById("periodicTable");
   cvs.addEventListener("mousedown", getPosition, false);
   ctx = cvs.getContext("2d");
   ctx.fillStyle = 'black';
   ctx.strokeStyle = 'white';
   drawImg();

}
function drawImg() {
  var count = 0;
  for(var j = 0; j < 10; j++){
    for(var i = 0; i < 18; i++){
        if(j === 0 && i > 0 && i < 17)
          continue;
        else if (j > 0 && j < 3 && i > 1 && i < 12)
          continue;
        else if (i == 2 && j > 4 && j<7)
          continue;
        else if (j == 7)
          continue;
        else if (j > 7 && j < 10 && i >= 0 && i < 3)
          continue;
        else {
          count++;
          if(j == 5 && i > 2)
            elements.push(new Element(count + 15,i*44+75, j*44+50));
          else if(j == 8 && i > 2)
              elements.push(new Element(count - 32,i*44+75, j*44+50));
          else if(j == 6 && i < 2)
              elements.push(new Element(count + 15,i*44+75, j*44+50));
          else if(j == 6 && i > 1)
              elements.push(new Element(count + 30,i*44+75, j*44+50));
          else if(j == 9)
               elements.push(new Element(count - 15,i*44+75, j*44+50));
          else
            elements.push(new Element(count,i*44+75, j*44+50));
        }
     }
  }
  for(var m = 1; m < 119; m++){
    for(var n = 0; n < elements.length; n++){
      if(elements[n].number == m)
        elements2.push(elements[n]);
    }
  }
  elements = elements2;

  for(var x = 0; x < elements.length; x++){
    ctx.fillStyle = 'black';
    ctx.moveTo(elements[x].posx+20,elements[x].posy);
    ctx.arc(elements[x].posx, elements[x].posy, 20, 0, 2*Math.PI);
    ctx.stroke();
    ctx.textAlign = "center";
    ctx.fillStyle = 'white';
    ctx.fillText(elements[x].number,elements[x].posx, elements[x].posy+2.5);
    console.log(elements[x].number);
  }
}

function Element(number, posx, posy) {
    this.number = number;
    this.posx = posx;
    this.posy = posy;
}
window.onload = init;
