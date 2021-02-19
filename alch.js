
"function" !== typeof String.prototype.trim &&
(String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "");
});
function assure_hash_prefix(a) {
return "#" != a[0] && /^[\dabcdef]{3,6}$/.test(a) ? "#" + a : a;
}
function hex_to_rgb(a) {
"#" == a[0] && (a = a.substring(1, 7));
6 > a.length && (a += "000000".substr(0, 6 - a.length));
return [parseInt(a.substring(0, 2), 16), parseInt(a.substring(2, 4), 16), parseInt(a.substring(4, 6), 16)];
}


function formSubmit(){
    var blendmode = document.getElementById("blendmode").value;
    var squared = document.getElementById("squared");
    console.log(blendmode)
    var direction = document.querySelector('input[name="direction"]:checked').value;
        var color1 = "color-bottom";
        var color2 = "color-top";
        var color3 = "color-blended";
    var genColor = [];
    var given1 = [];
    var given2 = [];
    var a = [];
    var b = [];
    var c = [];
    var g1; 
    var g2; 
    var gCol; 
    var newCol = [];

    
            if (direction == 2){
                var given1 = [];
                var given2 = [];
                var a = [];
                var b = [];
                var c = [];
                    g1 = color1; 
                    g2 = color3;
                    gCol = color2;  
             
                given1 = document.getElementById(g1).value;
                given2 = document.getElementById(g2).value;
                genCol = document.getElementById(gCol).value;

                a = hex_to_rgb(given1);
                c = hex_to_rgb(given2);


                if (blendmode==1){
                    
                        if (squared.checked){
                            for (var i = 0; i < c.length; i++) {
                            newCol.push(sqtMultiply(c[i]));
                            }
                            var genCol = rgb_to_hex(newCol); 
                            document.getElementById(gCol + "-preview").setAttribute("style", "background-color: #" + genCol);
                            document.getElementById(gCol).setAttribute("value","#" + genCol);
                        
                            document.getElementById(g1 + "-preview").setAttribute("style", "background-color: #" + genCol);
                            document.getElementById(g1).setAttribute("value","#" + genCol);
                        
                            document.getElementById(g2 + "-preview").setAttribute("style", "background-color: " + given2);
                            document.getElementById(g2).setAttribute("value", given2);
                        }else{
                            for (var i = 0; i < a.length; i++) {
                                newCol.push(revMultiply(a[i],c[i]));
                        }
                        var genCol = rgb_to_hex(newCol); 
                        document.getElementById(gCol + "-preview").setAttribute("style", "background-color: #" + genCol);
                        document.getElementById(gCol).setAttribute("value","#" + genCol);
                    
                        document.getElementById(g1 + "-preview").setAttribute("style", "background-color: #" + given1);
                        document.getElementById(g1).setAttribute("value", given1);
                    
                        document.getElementById(g2 + "-preview").setAttribute("style", "background-color: #" + given2);
                        document.getElementById(g2).setAttribute("value", given2);
                    }
                
                }else if (blendmode==2){
                    for (var i = 0; i < a.length; i++) {
                        newCol.push(revScreen(a[i],c[i]));
                    }
                    squared.prop(disabled, true);
                    var genCol = rgb_to_hex(newCol); 
                    document.getElementById(gCol + "-preview").setAttribute("style", "background-color: #" + genCol);
                    document.getElementById(gCol).setAttribute("value","#" + genCol);
                
                    document.getElementById(g1 + "-preview").setAttribute("style", "background-color:" + given1);
                    document.getElementById(g1).setAttribute("value", given1);
                
                    document.getElementById(g2 + "-preview").setAttribute("style", "background-color:" + given2);
                    document.getElementById(g2).setAttribute("value", given2);
                }else if (blendmode==3){
                }else if (blendmode==4){
                }else if (blendmode==5){
            
                }else if (blendmode==6){
            
                }
            }
            
             else if (direction == 1) {
                var given1 = [];
                var given2 = [];
                var a = [];
                var b = [];
                var c = [];
                   
             
                g1 = color1; 
                g2 = color2;
                gCol = color3; 
                given1 = document.getElementById(g1).value;
                given2 = document.getElementById(g2).value;
                genCol = document.getElementById(gCol).value;

                a = hex_to_rgb(given1);
                b = hex_to_rgb(given2);

                if (blendmode==1){
                    for (var i = 0; i < a.length; i++) {
                        newCol.push(stdMultiply(a[i],b[i]));
                    }
                }else if (blendmode==2){
                    for (var i = 0; i < a.length; i++) {
                        newCol.push(stdScreen(a[i],b[i]));
                    }

                }else if (blendmode==3){
                    for (var i = 0; i < a.length; i++) {
                        newCol.push(stdOverlay(a[i],b[i]));
                    }
                }else if (blendmode==4){
                    for (var i = 0; i < a.length; i++) {
                        newCol.push(stdDodge(a[i],b[i]));
                    }
                }else if (blendmode==5){
                    for (var i = 0; i < a.length; i++) {
                        newCol.push(stdBurn(a[i],b[i]));
                    }
            
                }else if (blendmode==6){
                    for (var i = 0; i < a.length; i++) {
                        newCol.push(stdNegate(a[i],b[i]));
                    }
            
                }
                var genCol = rgb_to_hex(newCol); 
                        document.getElementById(gCol + "-preview").setAttribute("style", "background-color: #" + genCol);
                        document.getElementById(gCol).setAttribute("value","#" + genCol);
                    
                        document.getElementById(g1 + "-preview").setAttribute("style", "background-color: " + given1);
                        document.getElementById(g1).setAttribute("value", given1);
                    
                        document.getElementById(g2 + "-preview").setAttribute("style", "background-color: " + given2);
                        document.getElementById(g2).setAttribute("value", given2);
            }
            
            
  
     

    
  


    console.log("this ran" + newCol)

}


function setUpdate(){
    var direction = document.querySelector('input[name="direction"]:checked').value;
    if (direction==1){
        document.getElementById("color-blended").setAttribute('readonly', 'readonly');
        document.getElementById("color-top").removeAttribute('readonly');


    }else if (direction==2) {
        document.getElementById("color-blended").removeAttribute('readonly');
        document.getElementById("color-top").setAttribute('readonly', 'readonly');

    }
    formSubmit();

}



function assure_hash_prefix(a) {
    return "#" != a[0] && /^[\dabcdef]{3,6}$/.test(a) ? "#" + a : a;
}
function hex_to_rgb(a) {
    "#" == a[0] && (a = a.substring(1, 7));
    6 > a.length && (a += "000000".substr(0, 6 - a.length));
    return [parseInt(a.substring(0, 2), 16), parseInt(a.substring(2, 4), 16), parseInt(a.substring(4, 6), 16)];
}
function rgb_to_hex(a) {
    a = (a[2] | (a[1] << 8) | (a[0] << 16)).toString(16);
    return "000000".substr(0, 6 - a.length) + a;
}
function rgb_to_css(a) {
    return "rgb(" + a[0] + "," + a[1] + "," + a[2] + ")";
}
function rgb_a_to_css(a, b) {
    return "rgba(" + a[0] + "," + a[1] + "," + a[2] + "," + b + ")";
}
function rgb_to_hsv(a) {
    var b = a[0] / 255,
        c = a[1] / 255,
        d = a[2] / 255;
    a = Math.max(b, c, d);
    var e = Math.min(b, c, d);
    if (a == e) return [0, 0, a];
    var f = (a - b) / (a - e),
        g = (a - c) / (a - e),
        d = (a - d) / (a - e);
    h = b == a ? d - g : c == a ? 2 + f - d : 4 + g - f;
    h = (h / 6) % 1;
    0 > h && (h += 1);
    return [h, (a - e) / a, a];
}
function hsv_to_rgb(a) {
    var b = a[0],
        c = a[1];
    a = 255 * a[2];
    if (0 == c) return [a, a, a];
    var d = Math.floor(6 * b),
        e = 6 * b - d,
        b = a * (1 - c),
        f = a * (1 - c * e),
        c = a * (1 - c * (1 - e)),
        d = d % 6;
    if (0 == d) return [a, c, b];
    if (1 == d) return [f, a, b];
    if (2 == d) return [b, a, c];
    if (3 == d) return [b, f, a];
    if (4 == d) return [c, b, a];
    if (5 == d) return [a, b, f];
}
function rgb_to_hsl(a) {
    var b = a[0] / 255,
        c = a[1] / 255,
        d = a[2] / 255;
    a = Math.max(b, c, d);
    var e = Math.min(b, c, d),
        f = (e + a) / 2;
    if (e == a) return [0, 0, f];
    var g = (a - b) / (a - e),
        k = (a - c) / (a - e),
        d = (a - d) / (a - e),
        b = ((b == a ? d - k : c == a ? 2 + g - d : 4 + k - g) / 6) % 1;
    0 > b && (b += 1);
    return [b, 0.5 >= f ? (a - e) / (a + e) : (a - e) / (2 - a - e), f];
}
function hsl_to_rgb(a) {
    var b = a[0],
        c = a[1];
    a = a[2];
    var d;
    if (0 == c) return [255 * a, 255 * a, 255 * a];
    c = 0.5 >= a ? a * (1 + c) : a + c - a * c;
    d = 2 * a - c;
    a = hue_to_rgb(d, c, b + 1 / 3);
    var e = hue_to_rgb(d, c, b),
        b = hue_to_rgb(d, c, b - 1 / 3);
    return [255 * a, 255 * e, 255 * b];
}
function hue_to_rgb(a, b, c) {
    0 > c && (c += 1);
    1 < c && (c -= 1);
    return 1 > 6 * c ? a + 6 * (b - a) * c : 1 > 2 * c ? b : 2 > 3 * c ? a + 6 * (b - a) * (2 / 3 - c) : a;
}
function invert_rgb(a) {
    return [255 - a[0], 255 - a[1], 255 - a[2]];
}
function apply_filter(a, b, c) {
    return [c(a[0], b[0]), c(a[1], b[1]), c(a[2], b[2])];
}


function stdScreen(a,b){

    var newNum = 255 - ( ( 255 - b ) * ( 255 - a ) >> 8 );
        if (newNum > 255){
            newNum = 255; 
            alert("color does not exist")
        }
    
    return newNum;
    }

function revScreen(a,c){
    var newNum = (255 - ( ( (255-c) << 8 ) / (255-a) ));
        if ((newNum > 255) || newNum < 0) { 
            alert("color does not exist")
        }
    
    return newNum;
    }

    function stdOverlay(a,b){
        var newNum = 128 > a ? 2 * b * a / 255 : 255 - 2 * ( 255 - a ) * ( 255 - b ) / 255
        if ((newNum > 255) || newNum < 0) { 
            alert("color does not exist")
        }
    
    return newNum;
    }
    


    function stdDodge(a,b){
        var newNum = 255 == a ? a : Math.min( 255, ( b << 8 ) / ( 255 - a ) )
        if ((newNum > 255) || newNum < 0) { 
            alert("color does not exist")
        }
    
    return newNum;
 
    
    }
    

  function stdBurn(a,b){
    var newNum = 0 == a ? a : Math.max( 0, 255 - ( 255 - b << 8 ) / a )
    if ((newNum > 255) || newNum < 0) { 
        alert("color does not exist")
    }

    return newNum;

    }


function stdNegate(a,b){
    var newNum = 255 - Math.abs( 255 - a - b )
    if ((newNum > 255) || newNum < 0) { 
        alert("color does not exist")
    }

return newNum;

}








function revMultiply(a,c){
     var newNum = (255*c)/a;
        if (newNum > 255){
            newNum = 255; 
            alert("color does not exist")
        }
    
    return newNum;

}
function sqtMultiply(c){
     var newNum = Math.sqrt(255*c)
        if (newNum > 255){
            newNum = 255; 
            alert("color does not exist")
        }
    
    return newNum;

}

function stdMultiply(a,b){
    var newNum = ((a*b)/255);
       if (newNum > 255){
           newNum = 255; 
           alert("color does not exist")

       }
   
   return newNum;

}



// function write_url() {
//     location.hash = "#!/" + get_blend_mode() + "/" + rgb_to_hex(p1.rgb) + "/" + rgb_to_hex(p2.rgb);
//     current_url = location.hash;
// }
// function read_url() {
//     var a = location.hash;
//     a && "#!/" == a.substring(0, 3) && a != current_url && ((current_url = a), (a = location.hash.substring(3).split("/")), set_mode(a[0]), p1.set_color(hex_to_rgb(a[1])), p2.set_color(hex_to_rgb(a[2])), render_blend());
// }


