function setup() { "use strict";
  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');
  var m4 = twgl.m4;
  var ctr= 0;
  var slider1 = document.getElementById('slider1');
  slider1.value = 0;
  var img=document.getElementById("crystal");
  var pat=context.createPattern(img,"repeat");

  var img2=document.getElementById("metal");
  var patMet=context.createPattern(img2,"repeat");

  var background = new Image();
  background.src = "light.jpg"
  context.drawImage(background,-540,-300);
  background.onload = function(){
    context.drawImage(background,-540,-300);
  }
  function moveToTx(x,y,z,Tx) {
    var loc = [x,y,z];
    var locTx = m4.transformPoint(Tx,loc);
    context.moveTo(locTx[0]+250,-locTx[1]+250);
  }

  function lineToTx(x,y,z,Tx) {
    var loc = [x,y,z];
    var locTx = m4.transformPoint(Tx,loc);
    context.lineTo(locTx[0]+250,-locTx[1]+250);
  }
                
  function drawAxes(Tx) {
    // A little cross on the front face, for identification
    context.save();
    context.beginPath(); context.strokeStyle="red"; 
    moveToTx(200,100,200,Tx);lineToTx(350,100,200,Tx);
    context.stroke();context.closePath();

    context.beginPath(); context.strokeStyle = "green";
   moveToTx(200,100,200,Tx);lineToTx(200,300,200,Tx);
    context.stroke();context.closePath();

    context.beginPath(); context.strokeStyle = "blue";
  
    moveToTx(200,100,200,Tx);lineToTx(200,100,350,Tx);
    context.stroke();context.closePath();
   context.restore();
  }

  
  function drawPylon(Tx){
   
    drawCrystal(Tx);
  }

  function drawLargeSup(Tx){
    context.beginPath(); moveToTx(200,200,200,Tx);
  }
  function drawSmallSup(Tx){
  }
    function drawCrystal(Tx){
    //upper  Part
     context.beginPath(); moveToTx(200,200,200,Tx);lineToTx(140,100,200,Tx); lineToTx(170,100,240,Tx); lineToTx(200,200,200,Tx);
     moveToTx(200,200,200,Tx);lineToTx(170,100,240,Tx); lineToTx(230,100,240,Tx);lineToTx(200,200,200,Tx); 
     moveToTx(200,200,200,Tx);lineToTx(230,100,240,Tx);lineToTx(260,100,200,Tx);lineToTx(200,200,200,Tx); 
     moveToTx(200,200,200,Tx);lineToTx(260,100,200,Tx);lineToTx(230,100,160,Tx);lineToTx(200,200,200,Tx); 
     moveToTx(200,200,200,Tx);lineToTx(230,100,160,Tx);lineToTx(170,100,160,Tx);lineToTx(200,200,200,Tx);
     moveToTx(200,200,200,Tx);lineToTx(170,100,160,Tx);lineToTx(140,100,200,Tx); lineToTx(200,200,200,Tx);  
      //Lower Part
    context.beginPath(); moveToTx(200,0,200,Tx);lineToTx(140,100,200,Tx); lineToTx(170,100,240,Tx); lineToTx(200,200,200,Tx);
     moveToTx(200,0,200,Tx);lineToTx(170,100,240,Tx);lineToTx(230,100,240,Tx);lineToTx(200,200,200,Tx); 
     moveToTx(200,0,200,Tx);lineToTx(230,100,240,Tx);lineToTx(260,100,200,Tx);lineToTx(200,200,200,Tx); 
     moveToTx(200,0,200,Tx);lineToTx(260,100,200,Tx);lineToTx(230,100,160,Tx);lineToTx(200,200,200,Tx); 
     moveToTx(200,0,200,Tx);lineToTx(230,100,160,Tx);lineToTx(170,100,160,Tx);lineToTx(200,200,200,Tx);
     moveToTx(200,0,200,Tx);lineToTx(170,100,160,Tx);lineToTx(140,100,200,Tx); lineToTx(200,200,200,Tx);  
     context.lineWidth = 0.5;
     context.fillStyle = pat;
      context.fill();
      context.strokeStyle = "black";
      context.stroke();
      context.lineWidth = 0.;

  }

  function drawCircle(Tx){
      var xc=200,yc=100,zc=200;
      var rx=200,ry=100,rz=200;
      var theta=0,phi=0;
  
      for(theta=(1/2)*Math.PI;theta<0.999*Math.PI;theta=theta+(1/2)*Math.PI){
          phi=0;
          moveToTx(xc+rx*Math.sin(theta)*Math.cos(phi),yc+ry*Math.cos(theta),zc+rz*Math.sin(theta)*Math.sin(phi),Tx);
          for(phi=(1/64)*Math.PI;phi<2.001*Math.PI;phi=phi+(1/64)*Math.PI)
              lineToTx(xc+rx*Math.sin(theta)*Math.cos(phi),yc+ry*Math.cos(theta),zc+rz*Math.sin(theta)*Math.sin(phi),Tx);
            context.closePath();
            context.strokeStyle = "rgba(179,217,255,0.4)";
            context.fillStyle  = "rgba(191,128,255,0.4)"
            context.fill();
            context.lineWidth = 10;
           context.stroke();
          context.lineWidth = 0.5;
      }

  }


  function draw() {

    // hack to clear the canvas fast
    canvas.width = canvas.width;
    
    var angle1 = slider1.value*0.01*Math.PI;
    var angle2 =0
    var axis = [1,1,1];
  
    var Tmodel=m4.axisRotation(axis,angle2);

    var eye=[400*Math.cos(angle1),250,400*Math.sin(angle1)];
    var target=[200,100,200];
    var up=[0,1,0];
    var Tcamera=m4.inverse(m4.lookAt(eye,target,up));   
    var Tmodelview=m4.multiply(Tmodel,Tcamera);
          context.rotate(0.3);
       context.drawImage(background,-540,-300);
       drawCircle(Tcamera);
       drawPylon(Tmodelview);
       drawAxes(Tmodelview);
  }

  slider1.addEventListener("input",draw);
  draw();

}
window.onload = setup;

