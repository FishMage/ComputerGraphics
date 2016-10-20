function setup() { "use strict";
  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');
  
  //var painter = new Painter(myCanvas);
  var m4 = twgl.m4;
  var ctr= 0;
  var slider1 = document.getElementById('slider1');
  slider1.value = 100;
  var slider2 = document.getElementById('slider2');
  slider2.value = 100;

  var img=document.getElementById("crystal");
  var pat=context.createPattern(img,"repeat");

  var img2=document.getElementById("metal");
  var patMet=context.createPattern(img2,"repeat");
  var counter1 = 0;
   var counter2 = 0;
  //var triangles = [];
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

  function drawGround(Tx){
     context.beginPath(); moveToTx(0,0,0,Tx);lineToTx(0,0,400,Tx);lineToTx(400,0,400,Tx); lineToTx(400,0,0,Tx);context.closePath();
     context.fillStyle = "rgba(224,224,235,0.98)"; context.fill();
  }
  
  function drawPylon(Tx,Ty){
   
   drawCrystal(Tx,Ty);
  //  drawSup(Ty);
  }

  function drawSup(Tx){
    var top = [90,150,200];
    var bot = [90,50,200];
    var triList =[
       //new Triangle(top,[90,120,220],[70,120,210],"#e6ac00",Tx)
    ];

    triList.sort(
       function(a,b){
        return b.zsum[2]-a.zsum[2];
       }
     );
    
     for(var i= 0; i < triList.length; i++ ){
       triList[i].drawTriangle();
     }
  }

    function drawCrystal(Tx,Ty){
      var top = [200,200,200];
      var bot = [200,0,200];
      var supTop = [90,150,200];
      var supBot = [90,50,200];
      //var Tz = Ty;
      var TrotY = m4.axisRotation([0,1,0],Math.PI);
     // var TrotX = m4.axisRotation([1,0,0],Math.PI);
      var Trans = m4.translation([0,30,0])
      var Trans2 = m4.translation([0,-20,0])
      //var TrotX = m4.axisRotation([1,0,0],Math.PI);
       var Tz = m4.multiply(m4.multiply(Tx,TrotY),Trans2);
     //  Tz = m4.multiply(Tz,TrotX);
       Ty = m4.multiply(Ty,Trans);
       
       //Ty = m4.multiply(Ty,TrotY);
      //var Ty = m4.multiply(Tx, TrotY2);
      //Ty  = Tz;
    //upper  Part
     var triList =[
       new Triangle(top,[140,100,200],[170,100,240],"#cce6ff",Tx,Tx),
       new Triangle(top,[170,100,240],[230,100,240],"#b3daff",Tx,Tx),
       new Triangle(top,[230,100,240],[260,100,200],"#99ceff",Tx,Tx),
       new Triangle(top,[260,100,200],[230,100,160],"#80c1ff",Tx,Tx),
       new Triangle(top,[230,100,160],[170,100,160],"#66b5ff",Tx,Tx),
       new Triangle(top,[170,100,160],[140,100,200],"#4da9ff",Tx,Tx),
    //  context.beginPath(); 
    //  moveToTx(200,200,200,Tx);lineToTx(140,100,200,Tx); lineToTx(170,100,240,Tx);context.closePath();
    //  moveToTx(200,200,200,Tx);lineToTx(170,100,240,Tx); lineToTx(230,100,240,Tx); context.closePath(); 
    //  moveToTx(200,200,200,Tx);lineToTx(230,100,240,Tx);lineToTx(260,100,200,Tx);lineToTx(200,200,200,Tx); 
    //  moveToTx(200,200,200,Tx);lineToTx(260,100,200,Tx);lineToTx(230,100,160,Tx);lineToTx(200,200,200,Tx); 
    //  moveToTx(200,200,200,Tx);lineToTx(230,100,160,Tx);lineToTx(170,100,160,Tx);lineToTx(200,200,200,Tx);
    //  moveToTx(200,200,200,Tx);lineToTx(170,100,160,Tx);lineToTx(140,100,200,Tx); context.closePath(); 
    //Lower Part
       new Triangle(bot,[140,100,200],[170,100,240],"#cce6ff",Tx,Tx),
       new Triangle(bot,[170,100,240],[230,100,240],"#b3daff",Tx,Tx),
       new Triangle(bot,[230,100,240],[260,100,200],"#99ceff",Tx,Tx),
       new Triangle(bot,[260,100,200],[230,100,160],"#80c1ff",Tx,Tx),
       new Triangle(bot,[230,100,160],[170,100,160],"#66b5ff",Tx,Tx),
       new Triangle(bot,[170,100,160],[140,100,200],"#4da9ff",Tx,Tx),
     
    //  context.beginPath(); 
    //  moveToTx(200,0,200,Tx);lineToTx(140,100,200,Tx); lineToTx(170,100,240,Tx); lineToTx(200,200,200,Tx);
    //  moveToTx(200,0,200,Tx);lineToTx(170,100,240,Tx);lineToTx(230,100,240,Tx);lineToTx(200,200,200,Tx); 
    //  moveToTx(200,0,200,Tx);lineToTx(230,100,240,Tx);lineToTx(260,100,200,Tx);lineToTx(200,200,200,Tx); 
    //  moveToTx(200,0,200,Tx);lineToTx(260,100,200,Tx);lineToTx(230,100,160,Tx);lineToTx(200,200,200,Tx); 
    //  moveToTx(200,0,200,Tx);lineToTx(230,100,160,Tx);lineToTx(170,100,160,Tx);lineToTx(200,200,200,Tx);
    //  moveToTx(200,0,200,Tx);lineToTx(170,100,160,Tx);lineToTx(140,100,200,Tx); lineToTx(200,200,200,Tx);  
    // context.lineWidth = 0.5;
    // context.fillStyle = pat;
    // context.fill();
    // context.strokeStyle = "black";
    // context.stroke();
    // context.lineWidth = 0.;

   // Draw side Support
      new Triangle(supTop,[90,120,220],[70,120,210],"#e6ac00",Ty,Tx),
      new Triangle(supTop,[70,120,210],[70,120,190],"#cc9900",Ty,Tx),//1
      new Triangle(supTop,[70,120,190],[90,120,180],"#e6ac00",Ty,Tx),//2
      new Triangle(supTop,[90,120,220],[90,120,180],"#994d00",Ty,Tx),//back
      
      new Triangle([70,120,210],[70,80,210],[70,120,190],"#663300",Ty,Tx),
      new Triangle([70,120,190],[70,80,210],[70,80,190],"#663300",Ty,Tx),
      
      new Triangle([70,80,190],[90,80,180],[70,120,190],"#663300",Ty,Tx),
      new Triangle([70,120,190],[90,120,180],[90,80,180],"#663300",Ty,Tx),
      new Triangle([70,120,210],[90,120,220],[90,80,220],"#663300",Ty,Tx),
      new Triangle([90,80,220],[70,80,210],[70,120,210],"#663300",Ty,Tx),

      new Triangle([90,120,220],[90,120,180],[90,80,180],"#994d00",Ty,Tx),//back
      new Triangle([90,120,220],[90,80,220],[90,80,180],"#994d00",Ty,Tx), //back
      new Triangle([90,120,220],[90,80,220],[90,80,180],"#994d00",Ty,Tx),

      new Triangle(supBot,[90,120,220],[70,120,210],"#e6ac00",Ty,Tx),
      new Triangle(supBot,[70,120,210],[70,120,190],"#cc9900",Ty,Tx),//1
      new Triangle(supBot,[70,120,190],[90,120,180],"#e6ac00",Ty,Tx),//2
      new Triangle(supBot,[90,120,220],[90,120,180],"#994d00",Ty,Tx),//back

    //Draw another Side Support
      new Triangle(supTop,[90,120,220],[70,120,210],"#e6ac00",Tz,Tx),
      new Triangle(supTop,[70,120,210],[70,120,190],"#cc9900",Tz,Tx),//1
      new Triangle(supTop,[70,120,190],[90,120,180],"#e6ac00",Tz,Tx),//2
      new Triangle(supTop,[90,120,220],[90,120,180],"#994d00",Tz,Tx),//back
      
      new Triangle([70,120,210],[70,80,210],[70,120,190],"#663300",Tz,Tx),
      new Triangle([70,120,190],[70,80,210],[70,80,190],"#663300",Tz,Tx),
      
      new Triangle([70,80,190],[90,80,180],[70,120,190],"#663300",Tz,Tx),
      new Triangle([70,120,190],[90,120,180],[90,80,180],"#663300",Tz,Tx),
      new Triangle([70,120,210],[90,120,220],[90,80,220],"#663300",Tz,Tx),
      new Triangle([90,80,220],[70,80,210],[70,120,210],"#663300",Tz,Tx),

      new Triangle([90,120,220],[90,120,180],[90,80,180],"#994d00",Tz,Tx),//back
      new Triangle([90,120,220],[90,80,220],[90,80,180],"#994d00",Tz,Tx), //back
      new Triangle([90,120,220],[90,80,220],[90,80,180],"#994d00",Tz,Tx),

      new Triangle(supBot,[90,120,220],[70,120,210],"#e6ac00",Tz,Tx),
      new Triangle(supBot,[70,120,210],[70,120,190],"#cc9900",Tz,Tx),//1
      new Triangle(supBot,[70,120,190],[90,120,180],"#e6ac00",Tz,Tx),//2
      new Triangle(supBot,[90,120,220],[90,120,180],"#994d00",Tz,Tx)//back


    ];
      triList.sort(
       function(a,b){
        return b.zsum[2]-a.zsum[2];
       }
     );
    
     for(var i= 0; i < triList.length; i++ ){
       triList[i].drawTriangle();
     }
  }

function Triangle(v1,v2,v3,color,Tx,Tm){
    this.v1 = v1;
    this.v2 = v2;
    this.v3 = v3;
    this.color = color;
    this.Tx = Tx;
    this.Tm = Tm;
    this.ctr= [(v1[0] + v2[0] +v3[0])/3,(v1[1] + v2[1] +v3[1])/3,(v1[2] + v2[2] +v3[2])/3];
    this.zsum = m4.multiply([this.ctr[0],this.ctr[1],this.ctr[2],1],Tm);
    this.drawTriangle = function(){
      context.beginPath(); 
     // moveToTx(200,0,200,Tx);lineToTx(170,100,240,Tx);lineToTx(230,100,240,Tx);lineToTx(200,200,200,Tx); 
      moveToTx(v1[0],v1[1],v1[2],Tx); lineToTx(v2[0],v2[1],v2[2],Tx); lineToTx(v3[0],v3[1],v3[2],Tx); lineToTx(v1[0],v1[1],v1[2],Tx); 
      context.closePath(); 
      context.lineWidth = 0.5;
      //context.stroke();
      context.fillStyle = color;
      context.fill();
      
    }
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
    var speed = slider2.value*0.00005;
    var angle1 = -counter1*speed*Math.PI;
    var angle2 = counter1*speed*Math.PI;
    var axis = [1,1,1];
    var angle3 = slider1.value;
    //var Tmodel=m4.axisRotation(axis,angle2);
 //alert(counter1);
    var eye=[800*Math.cos(angle1),50,800*Math.sin(angle1)];
    var eye2=[800*Math.cos(angle2),50,-800*Math.sin(angle2)];
    var target=[200,angle3,200];
    var up=[0,1,0];
    var Tcamera = m4.inverse(m4.lookAt(eye,target,up));
    var Tcamera2 = m4.inverse(m4.lookAt(eye2,target,up));
    var Tprojection=m4.perspective(Math.PI/3,1,5,400);

    var Tviewport = m4.multiply(m4.scaling([200,200,200]),m4.translation([0,0,0]));
    var Tviewport2 = m4.multiply(m4.scaling([-200,200,-200]),m4.translation([100,0,0]));
    var Tcpv1=m4.multiply(m4.multiply(Tcamera,Tprojection),Tviewport);
    var Tcpv2=m4.multiply(m4.multiply(Tcamera2,Tprojection),Tviewport);

  //  var Tcamera2 = m4.inverse(m4.lookAt(eye2,target,up));
  //  var Tfix = m4.inverse(m4.lookAt([1000,250,1000], target, up));
   //var Tmodelview = m4.multiply(Tmodel,Tcamera);
   
     context.drawImage(background,-540,-300);
     //drawCircle(Tcpv);
      drawGround(Tcpv1);
      drawPylon(Tcpv1,Tcpv2);
     //drawAxes(Tcpv);
     counter1++;
     //counter2++;
     window.requestAnimationFrame(draw);
  }
   draw();
   //slider1.addEventListener("input",draw);

  
  //window.requestAnimationFrame(draw);

}
window.onload = setup;

