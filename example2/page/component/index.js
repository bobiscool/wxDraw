Page({
  data: {
    list: [
      {
        id: 'view',
        name: "图形",
        open: false,
        pages: ['view', 'scroll-view', 'swiper'],
        id: 'content',
        name: '图形创建演示',
        open: false,
        pages: ['rect','circle','ellipse','polygon','text', 'line', 'cshape','img']
      }, {
        id: 'form',
        name: '图形动画演示',
        open: false,
        pages: ['demo1','demo2','demo3','demo4','demo5']
      }, {
        id: 'nav',
        name: '图形事件演示',
        open: false,
        pages: ['all']
      }
    ]
  },
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  }
})

