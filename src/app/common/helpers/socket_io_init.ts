const socketio = require('socket.io')
let io

export default {
  init: function(server) {
    if (io) {
      // console.log('io zaten var')
      throw new Error('socket.io already initialized1')
    }
    // initalize socket.io to this server
    io = socketio(server, {
      transports: ['websocket', 'xhr-polling']
    })
    // console.log('io oluşturuldu.....')

    // put other socket.io initialization code here
    
    return io
  },
  get: function() {
    if (!io) {
      throw new Error('socket.io has not yet been initialized')
    }
    return io
  }
}