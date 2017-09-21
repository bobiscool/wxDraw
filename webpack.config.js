const path = require('path');

module.exports = {
  entry:"./src/",
  output:{
      path:path.resolve(__dirname,'dist')
  }
}