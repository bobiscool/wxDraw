   let rect = new Shape('rect', { x: 60, y: 60, w: 40, h: 40, opacity: 0.3, fillStyle: "#2FB8AC", rotate: 0, needShadow: true, shadow: { color: "#cccccc" },needGra: 'line', gra: [[0, '#00A0B0'], [0.2, '#6A4A3C'], [0.4, '#CC333F'], [0.6, '#EB6841'], [1, '#EDC951']] }, 'mix', true)
    let circle = new Shape('circle', { x: 100, y: 100, r: 40, sA: 0, fillStyle: "#C0D860", strokeStyle: "#CC333F", rotate: 20, lineWidth: 0, needGra: 'circle', gra: [[0, '#00A0B0'], [0.2, '#6A4A3C'], [0.4, '#CC333F'], [0.6, '#EB6841'], [1, '#EDC951']]}, 'mix', true)
    console.log(circle);
    let ellipse = new Shape('ellipse', { x: 200, y: 200, a: 40, b: 100, fillStyle: "#00A0B0", rotate: Math.PI / 7, needGra:'circle', gra: [[0, '#00A0B0'], [0.2, '#6A4A3C'], [0.4, '#CC333F'], [0.6, '#EB6841'], [1, '#EDC951']] }, 'mix', true)
    let cshape = new Shape('cshape', {
      rotate: Math.PI / 2,
      points: [[70, 85], [40, 20], [24, 46], [2, 4], [14, 6], [4, 46]],
      lineWidth: 5,
      fillStyle: "#00A0B0",
      rotate: Math.PI / 7,
      needGra: 'circle',
      gra: [[0, '#00A0B0'], [0.2, '#6A4A3C'], [0.4, '#CC333F'], [0.6, '#EB6841'], [1, '#EDC951']]
    }, 'fill', true)
    let polygon = new Shape('polygon', { x: 200, y: 200, r: 40, sides: 9, fillStyle: "#FC354C", rotate: Math.PI / 4, needGra:'circle', gra: [[0, '#00A0B0'], [0.2, '#6A4A3C'], [0.4, '#CC333F'], [0.6, '#EB6841'], [1, '#EDC951']] }, 'mix', true)
    let text = new Shape('text', { x: 200, y: 200, text: "我是测试文字", fillStyle: "#E6781E", rotate: Math.PI / 3, needGra: 'circle', gra: [[0, '#00A0B0'], [0.2, '#6A4A3C'], [0.4, '#CC333F'], [0.6, '#EB6841'], [1, '#EDC951']]}, 'fill', true)
    let line = new Shape('line', { points:[[240.01411043138435,373.59473029572973],[11.197396632144073,329.8681748862602],[281.1773097081336,423.4713044483486],[127.3538421245179,105.00858089920418],[203.93330134932464,415.7246879127203],[128.93515710133283,0.06697857766635451]], strokeStyle: "#2FB8AC",lineWidth:1, rotate: 0, needShadow: true }, 'fill', true)
    // console.log(cshape);
    this.wxCanvas.add(rect);
    this.wxCanvas.add(circle);
    this.wxCanvas.add(ellipse);
    this.wxCanvas.add(polygon);
    this.wxCanvas.add(text);
    this.wxCanvas.add(line);
    this.wxCanvas.add(cshape);



    rect.animate("x","+=100",{duration:1000}).animate({"x":"+=100","y":"-=30","rotate":"10","fillStyle":"#1BB0CE"},{duration:1000}).
        animate({"x":"-=100","y":"+=30","rotate":"+10","fillStyle":"#6A5E72"},{duration:1000}).
        animate({"fillStyle":"#563444"},{duration:1000}).start(3);