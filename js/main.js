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
         background(0); 
  for(int i = 0; i < points.size(); i++){
    point = (PVector)points.get(i); //配列から添え字の情報を取り出しPVectorにキャストして一時変数に格納しています
    stroke(0,255,0); //色を緑にしています
    noFill(); //円の内部を塗りつぶさないようにします
    ellipse(point.x,point.y,100,100); //円を描いています//point.xとpoint.yで一時変数に格納した点の座標を取り出しています
    textSize(32); //表示する点の座標の文字の大きさです
    text("x:"+point.x+" y:"+point.y,point.x,point.y); //座標を表示しています
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
