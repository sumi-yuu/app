/// <reference path="p5.global-mode.d.ts" />
var pDeviceOrientation;
// タッチした情報を格納するクラス
var touchObject = /** @class */ (function () {
    function touchObject(_touch) {
        this.touch = _touch;
        this.id = _touch.id;
        this.count = 0;
    }
    touchObject.prototype.update = function () {
        var _this = this;
        this.count++;
        // 削除判定
        // 同じIDのtouchが存在しなければ削除
        var isExist = false;
        touches.forEach(function (element) {
            if (element.id === _this.id) {
                _this.touch = element;
                isExist = true;
            }
        });
        this.draw();
        return isExist;
    };
    touchObject.prototype.draw = function () {
        noFill();
        stroke(255, 255, 255);
        strokeWeight(1);
        ellipse(this.touch.x, this.touch.y, 30, 30);
        text(this.touch.x+"/"+this.touch.y,this.touch.x,this.touch.y)
    };
    return touchObject;
}());
var touchObjectList;
function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    touchObjectList = new Array();
    pDeviceOrientation = deviceOrientation;
}
function draw() {
    if (pDeviceOrientation !== undefined && pDeviceOrientation !== deviceOrientation) {
        // 向きが変わったとき
        noCanvas();
        createCanvas(window.innerWidth, windowHeight);
    }
    pDeviceOrientation = deviceOrientation;
    blendMode(BLEND);
    background(0, 2);
    blendMode(ADD);
    stroke(255);
    if (touches.length != 0) {
        // 初出現のIDを探す
        touches.forEach(function (element) {
            console.log(element);
            var isExist = false;
            touchObjectList.forEach(function (object) {
                if (element.id === object.id) {
                    isExist = true;
                }
            });
            if (isExist === false) {
                // 要素の追加
                touchObjectList.push(new touchObject(element));
            }
        });
    }
    touchObjectList.forEach(function (element) {
        if (element.update() === false) {
            touchObjectList.pop(element);
        }
    });
}
//# sourceMappingURL=main.js.map
