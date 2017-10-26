let rect = new Shape('rect', { x: 60, y: 60, w: 40, h: 40, opacity: 0.3, fillStyle: "#2FB8AC", rotate: 0, needShadow: true, shadow: { color: "#cccccc" } }, 'mix', true)
let circle = new Shape('circle', { x: 100, y: 100, r: 40, sA: 0.7, fillStyle: "#C0D860", strokeStyle: "#CC333F", rotate: 20, lineWidth: 20 }, 'mix', true)
let ellipse = new Shape('ellipse', { x: 200, y: 200, a: 40, b: 100, fillStyle: "#00A0B0", rotate: Math.PI / 7, needGra: true, lg: [[0, '#00A0B0'], [0.2, '#6A4A3C'], [0.4, '#CC333F'], [0.6, '#EB6841'], [1, '#EDC951']] }, 'mix', true)
let cshape = new Shape('cshape', {
    rotate: Math.PI / 2,
    points: [[70, 85], [40, 20], [24, 46], [2, 4], [14, 6], [4, 46]],
    lineWidth: 5,
    fillStyle: "#00A0B0",
    rotate: Math.PI / 7,
    needGra: true,
    lg: [[0, '#00A0B0'], [0.2, '#6A4A3C'], [0.4, '#CC333F'], [0.6, '#EB6841'], [1, '#EDC951']]
}, 'fill', true)
let polygon = new Shape('polygon', { x: 200, y: 200, r: 40, sides: 9, fillStyle: "#FC354C", rotate: Math.PI / 4, needGra: 'line', lg: [[0, '#00A0B0'], [0.2, '#6A4A3C'], [0.4, '#CC333F'], [0.6, '#EB6841'], [1, '#EDC951']] }, 'mix', true)
let text = new Shape('text', { x: 200, y: 200, text: "我是测试文字", fillStyle: "#E6781E", rotate: Math.PI / 3 }, 'fill', true)
let line = new Shape('line', { points: [[70, 85], [40, 20], [24, 46], [2, 4], [14, 6], [4, 46]], strokeStyle: "#2FB8AC", lineWidth: 20, rotate: 0, needShadow: true }, 'fill', true)
console.log(cshape);
this.wxCanvas.add(rect);
this.wxCanvas.add(circle);
this.wxCanvas.add(ellipse);
this.wxCanvas.add(polygon);
this.wxCanvas.add(text);
this.wxCanvas.add(line);
this.wxCanvas.add(cshape);

//图形创建测试
// 测试结果
// 图形创建 渐变有问题 字体监测区域还要调节