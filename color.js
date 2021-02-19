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
function rgb_to_hex(a) {
    a = (a[2] | (a[1] << 8) | (a[0] << 16)).toString(16);
    return "000000".substr(0, 6 - a.length) + a;
}
function css_to_rgb(a) {
    return "#" == a[0]
        ? hex_to_rgb(a)
        : $.map(a.substring(4, a.length - 1).split(","), function (a) {
              return parseInt(a.trim());
          });
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
var blend_filters = {
    multiply: function (a, b) {
        // console.log("multiply " + a + " " + b);
        
               
        return (255*a)/b;
    },
    screen: function (a, b) {
        // console.log("screen " + a + " " + b);

        return 255 - (((255 - b) * (255 - a)) >> 8);

    },
    overlay: function (a, b) {
        // console.log("overlay " + a + " " + b);

        return 128 > a ? (2 * b * a) / 255 : 255 - (2 * (255 - a) * (255 - b)) / 255;

    },
    dodge: function (a, b) {
        // console.log("dodge " + a + " " + b);

        return 255 == a ? a : Math.min(255, (b << 8) / (255 - a));

    },
    burn: function (a, b) {
        // console.log("burn " + a + " " + b);

        return 0 == a ? a : Math.max(0, 255 - ((255 - b) << 8) / a);

    },
    negate: function (a, b) {        console.log("negate " + a + " " + b);

        return 255 - Math.abs(255 - a - b);

    },
};
function blend(a, b, c) {
  

     var reverse = {}; 
     var o = {0:79, 1:36, 2:102}; 

     reverse [0]= (255 * o[0])/b[0];
     reverse [1]= (255 * o[1])/b[1];
     reverse [2]= (255 * o[2])/b[2];
    var logcolor = []; 
    console.log("blend with " + reverse[0] + ", " +  reverse[1] + ", " + reverse[2]);

    a = apply_filter(b, c, blend_filters[a]);
    return [Math.min(Math.round(a[0]), 255), Math.min(Math.round(a[1]), 255), Math.min(Math.round(a[2]), 255)];
}
function ctx_xy_to_rgb(a, b) {
    var c = a.getImageData(b[0], b[1], 1, 1);
    return [c.data[0], c.data[1], c.data[2]];
}
var canvas_draw_gradient_square = function (a, b) {
        for (
            var c = a.canvas.width,
                d = a.canvas.height,
                e = [
                    ["#ffffff", "#ffffff"],
                    [rgb_a_to_css(b, 0), rgb_a_to_css(b, 255)],
                    [rgb_a_to_css([0, 0, 0], 1), rgb_a_to_css([0, 0, 0], 0)],
                ],
                f = [
                    [0, 0, c, 0],
                    [0, 0, 0, d],
                    [0, 0, c, 0],
                ],
                g = 0;
            3 > g;
            g++
        ) {
            var k = a.createLinearGradient(f[g][0], f[g][1], f[g][2], f[g][3]);
            k.addColorStop(0, e[g][0]);
            k.addColorStop(1, e[g][1]);
            a.fillStyle = k;
            a.fillRect(0, 0, c, d);
        }
    },
    canvas_draw_circle = function (a, b, c, d, e) {
        a.beginPath();
        a.arc(c, d, b, 0, 2 * Math.PI, !0);
        a.closePath();
        a.strokeStyle = e;
        a.lineWidth = 1.5;
        a.stroke();
    },
    canvas_draw_filled_circle = function (a, b, c, d, e) {
        a.beginPath();
        a.arc(c, d, b, 0, 2 * Math.PI, !0);
        a.closePath();
        a.fillStyle = e;
        a.fill();
    };
function clip(a, b, c, d) {
    0 > a && (a = 0);
    0 > b && (b = 0);
    a >= c && (a = c - 1);
    b >= d && (b = d - 1);
    return [a, b];
}
function ColorPicker(a) {
    this.target = a;
    this.rgb = [0, 0, 0];
    this.picker = $('<canvas class="picker" width="208px" height="208px"></canvas>');
    this.picker_canvas = this.picker[0].getContext("2d");
    this.picker_pos = [0, 0];
    this.spectrum = $('<canvas class="spectrum" width="208px" height="25px"></canvas>');
    this.spectrum_canvas = this.spectrum[0].getContext("2d");
    this.spectrum_pos = 0;
    this.container = $('<div class="color-picker"></div').append(this.picker).append(this.spectrum);
    $(a).after(this.container);
    this.draw();
    var b = this,
        c = !1,
        d = !1;
    this.picker
        .click(function (a) {
            return b._picker_select_event(a);
        })
        .mousedown(function (a) {
            c = b;
            b.container.trigger("dragstart");
        });
    this.spectrum
        .click(function (a) {
            return b._spectrum_select_event(a);
        })
        .mousedown(function (a) {
            d = b;
            b.container.trigger("dragstart");
        });
    $(document)
        .mousemove(function (a) {
            if (c == b) return b._picker_select_event(a);
            if (d == b) return b._spectrum_select_event(a);
        })
        .mouseup(function (a) {
            (c || d) && b.container.trigger("dragstop");
            d = c = !1;
        });
}
ColorPicker.prototype = {
    add_listener: function (a, b) {
        this.container.bind(a, b);
    },
    set_color: function (a) {
        this.rgb = a;
        a = rgb_to_hsv(a);
        this.spectrum_pos = a[0];
        this.picker_pos = [a[2] * this.picker_canvas.canvas.width - 1, a[1] * this.picker_canvas.canvas.height - 1];
        this.draw();
    },
    get_color: function () {
        return hsv_to_rgb([this.spectrum_pos, this.picker_pos[1] / (this.picker_canvas.canvas.height - 1), this.picker_pos[0] / (this.picker_canvas.canvas.width - 1)]);
    },
    draw: function () {
        this._draw_spectrum();
        this._draw_picker();
    },
    _draw_spectrum: function () {
        for (
            var a = this.spectrum_canvas,
                b = a.canvas.width,
                c = a.canvas.height,
                d = Math.floor(this.spectrum_pos * b),
                e = a.createLinearGradient(0, 0, b, 0),
                f = 1 / 6,
                g = "#FF0000 #FFFF00 #00FF00 #00FFFF #0000FF #FF00FF".split(" "),
                f = [0, f, 2 * f, 3 * f, 4 * f, 5 * f, 6 * f],
                k = 0;
            7 > k;
            k++
        )
            e.addColorStop(f[k], g[k % 6]);
        a.fillStyle = e;
        a.fillRect(0, 0, b, c);
        a.beginPath();
        a.moveTo(d, 0);
        a.lineTo(d, c);
        a.closePath();
        a.strokeStyle = rgb_to_css(invert_rgb(ctx_xy_to_rgb(a, [d, 0])));
        a.lineWidth = 4;
        a.stroke();
    },
    _draw_picker: function () {
        var a = this.picker_canvas,
            b = this.spectrum_canvas,
            c = [parseInt(this.spectrum_pos * (b.canvas.width - 1)), 0];
        canvas_draw_gradient_square(a, invert_rgb(ctx_xy_to_rgb(b, c)));
        b = this.picker_pos;
        this.container.trigger("change", [this.rgb]);
        canvas_draw_filled_circle(a, 7, b[0], b[1], "#" + rgb_to_hex(this.rgb));
        canvas_draw_circle(a, 7.5, b[0], b[1], "#000000");
        canvas_draw_circle(a, 6, b[0], b[1], "#ffffff");
    },
    _spectrum_select_event: function (a) {
        a.stopPropagation();
        var b = this.spectrum_canvas,
            c = b.canvas.width,
            b = b.canvas.height,
            d = this.spectrum.offset();
        this.spectrum_pos = clip(a.pageX - d.left, a.pageY - d.top, c, b)[0] / c;
        this.rgb = this.get_color();
        this.draw();
    },
    _picker_select_event: function (a) {
        a.stopPropagation();
        var b = this.picker_canvas,
            c = this.picker.offset();
        this.picker_pos = clip(a.pageX - c.left, a.pageY - c.top, b.canvas.width, b.canvas.height);
        this.rgb = this.get_color();
        this.draw();
    },
};
var reset_pickers,
    p1,
    p2,
    blend_mode,
    changing_picker = !0,
    changed_picker = !0,
    current_url = !1;
function get_blend_mode() {
    return blend_mode ? blend_mode.text().toLowerCase() : "multiply";
}
function write_url() {
    location.hash = "#!/" + get_blend_mode() + "/" + rgb_to_hex(p1.rgb) + "/" + rgb_to_hex(p2.rgb);
    current_url = location.hash;
}
function read_url() {
    var a = location.hash;
    a && "#!/" == a.substring(0, 3) && a != current_url && ((current_url = a), (a = location.hash.substring(3).split("/")), set_mode(a[0]), p1.set_color(hex_to_rgb(a[1])), p2.set_color(hex_to_rgb(a[2])), render_blend());
}
function render_blend() {
    try {
        $("#color-bottom-preview").css("background-color", assure_hash_prefix($("#color-bottom").val()));
        $("#color-top-preview").css("background-color", assure_hash_prefix($("#color-top").val()));
        var a = css_to_rgb($("#color-bottom-preview").css("background-color")),
            b = css_to_rgb($("#color-top-preview").css("background-color")),
            c = blend(get_blend_mode(), a, b);
        $("#color-blended-preview").css("background-color", rgb_to_css(c));
        $("#color-blended").val("#" + rgb_to_hex(c));
        $("h1:first a").css("color", rgb_to_css(invert_rgb(a)));
    } catch (d) {
        throw (alert("Unsupported color format."), d);
    }
    changing_picker || write_url();
}
function set_mode(a) {
    blend_mode && $(blend_mode).removeClass("active");
    blend_mode = $("#blend-mode #mode-" + a).addClass("active");
    render_blend();
}
$(document).ready(function () {
    var a = $("form:first").submit(function () {
        render_blend();
        reset_pickers();
        b.enableTextSelect();
        $("#color-blended").select();
        return !1;
    });
    $("input", a).change(function () {
        render_blend();
        reset_pickers();
    });
    blend_mode = $("#blend-mode li.active");
    $("#blend-mode li").click(function (a) {
        set_mode($(this).text().toLowerCase());
    });
    p1 = new ColorPicker($("#color-bottom"));
    p2 = new ColorPicker($("#color-top"));
    
    p1.preview = $("#color-bottom-preview");
    p2.preview = $("#color-top-preview");
    var b = $("body"),
        c = !1;
    $.map([p1, p2], function (a, e) {
        a.target
            .focus(function (b) {
                c && c != a && (c.container.hide(), (changed_picker = c = !1));
                a.container.show();
                c = a;
            })
            .blur(function (a) {
                c && !changing_picker && (c.container.hide(), (changed_picker = c = !1));
            })
            .click(function (a) {
                a.stopPropagation();
            });
        a.add_listener("change", function (b, c) {
            b.stopPropagation();
            a.preview.css("background-color", rgb_to_css(c));
            a.target.val("#" + rgb_to_hex(c));
            render_blend();
        });
        a.add_listener("dragstart", function (a) {
            // console.log("dragstart");
            b.disableTextSelect();
            changed_picker = changing_picker = !0;
        });
        a.add_listener("dragstop", function (a) {
            b.enableTextSelect();
            changing_picker = !1;
        });
    });
    $(document).click(function (a) {
        c && !changing_picker && (c.container.hide(), (changed_picker = c = !1));
    });
    reset_pickers = function () {
        var a = css_to_rgb($("#color-bottom-preview").css("background-color")),
            b = css_to_rgb($("#color-top-preview").css("background-color"));
        p1.set_color(a);
        p2.set_color(b);
    };
    read_url();
    setInterval(read_url, 200);
    reset_pickers();
    changed_picker = changing_picker = !1;
    $(document).keydown(function (a) {
        c && changed_picker && c.target.blur();
        38 == a.which || 75 == a.which
            ? $(blend_mode).prev().click()
            : 40 == a.which || 74 == a.which
            ? $(blend_mode).next().click()
            : 9 == a.which && "3" == $(a.target).attr("tabindex") && (a.preventDefault(), $("input[tabindex=1]").focus());
    });
});
(function (a) {
    a.browser.mozilla
        ? ((a.fn.disableTextSelect = function () {
              return this.each(function () {
                  a(this).css({ MozUserSelect: "none" });
              });
          }),
          (a.fn.enableTextSelect = function () {
              return this.each(function () {
                  a(this).css({ MozUserSelect: "" });
              });
          }))
        : a.browser.msie
        ? ((a.fn.disableTextSelect = function () {
              return this.each(function () {
                  a(this).bind("selectstart.disableTextSelect", function () {
                      return !1;
                  });
              });
          }),
          (a.fn.enableTextSelect = function () {
              return this.each(function () {
                  a(this).unbind("selectstart.disableTextSelect");
              });
          }))
        : ((a.fn.disableTextSelect = function () {
              return this.each(function () {
                  a(this).bind("mousedown.disableTextSelect", function () {
                      return !1;
                  });
              });
          }),
          (a.fn.enableTextSelect = function () {
              return this.each(function () {
                  a(this).unbind("mousedown.disableTextSelect");
              });
          }));
})(jQuery);
