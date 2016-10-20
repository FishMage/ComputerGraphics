
"use strict";

function Painter(canvas, context) {
    this.triangles = [];
    this.canvas = canvas;
    this.context = context || canvas.getContext('2d');
}

/**
 * empties the set of triangles (this does not clear the canvas!)
 */
Painter.prototype.clear = function() {
    this.triangles = [];
};

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

Painter.prototype.triangle = function(v1, v2, v3, fill, stroke){
    this.triangles.push(
        {
            "v1" : v1,
            "v2" : v2,
            "v3" : v3,
            "fill" : fill || "blue",
            "stroke" : stroke,
            "zmax" : Math.max(v1[2],v2[2],v3[2]),
            "zsum" : v1[2] + v2[2] +v3[2]
        }
    )
};

/**
 * draws the triangles into the context
 * @param {boolean} nosort - True if you don't want the Painter's Algorithm
 */
Painter.prototype.render = function(nosort)
{
    var that = this;
     if (!nosort) {
        this.triangles.sort(function (a, b) {
            if (a.zsum > b.zsum) {
                return -1;
            } else {
                return 1;
            }
        });
    } else {
        // console.log("Not Sorting");
    }
    this.triangles.forEach(function (t) {
        that.context.beginPath();
        that.context.fillStyle = t.fill;
        // it is an error to set this to undefined - even though it works
        that.context.strokeStyle = t.stroke || "black";
        that.context.moveTo(t.v1[0], t.v1[1]);
        that.context.lineTo(t.v2[0], t.v2[1]);
        that.context.lineTo(t.v3[0], t.v3[1]);
        that.context.closePath();
        that.context.fill();
        if (t.stroke) {
            that.context.stroke()
        }
    });
};

/** send an indexed triangle set as a bunch of triangles
 * makes use of the matrix stack
 * @param painter
 * @param mstack
 * @param verts
 * @param tris
 * @param fills
 * @param strokes
 */
Painter.prototype.addTris = function(mstack, verts, tris, fills, strokes) {
    // we can't use a foreach because we need to index into 3 arrays
    for (var i=0; i<tris.length; i++ ) {
        var t=tris[i];
        var p1 = mstack.transform(verts[t[0]]);
        var p2 = mstack.transform(verts[t[1]]);
        var p3 = mstack.transform(verts[t[2]]);
        this.triangle(p1,p2,p3,fills && fills[i],strokes&&strokes[i]);
    };
};


/**
 * static variables for drawing a cube - done this way since I don't know how to
 * do statics in JavaScript
 * These actually could even be constants (but they are array constants
 * @type {*[]}
 */
Painter.prototype.cubeVerts = [ [0,0,0], [1,0,0], [1,1,0], [0,1,0], [0,0,1], [1,0,1], [1,1,1], [0,1,1] ];
Painter.prototype.cubeTris = [
                     [0,1,2], [0,2,3],  // front is 0,1,2,3   z=0
                     [1,5,2], [5,2,6],  // side is  1,2,5,6   x=1
                     [4,5,6], [4,6,7],  // back is  4,5,6,7   z=1
                     [4,0,3], [4,3,7],  // side is  0,3,4,7   x=0
                     [3,2,7], [2,6,7],  // top is   2,3,6,7   y=1
                     [0,1,4], [1,4,5]
                    ];

Painter.prototype.cube = function(mstack, colors, strokes)
{
    this.addTris(mstack,this.cubeVerts,this.cubeTris,colors,strokes)
};

