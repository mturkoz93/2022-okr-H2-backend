import { Injectable } from '@nestjs/common';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import jwt from 'jsonwebtoken';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TagDocument } from 'src/app/models/tags.model';
import { User, UserDocument } from 'src/app/models/users.model';

// import SocketIO from 'socket.io';
const { Server } = require('socket.io');

// const socketio = require('socket.io')

class _SocketService {
  private io;
  get server() {
    return this.io;
  }
  constructor() // private readonly userModel
  {
    console.log('conttructor çalıştı');
  }
  /* constructor(
    // private io
    // @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {} */

  CreateSocketServer(server: any): any {
    console.log('created');
    if (this.io) {
      // console.log('io zaten var')
      throw new Error('socket.io already initialized1');
    }
    // initalize socket.io to this server
    const io = new Server(server, {
      transports: ['websocket', 'xhr-polling'],
    });
    this.io = io;
    // console.log('io oluşturuldu.....')

    // put other socket.io initialization code here

    return this.io;
  }

  // TODO: Bir kere çalışmalı!
  onConnect() {
    this.io.use(function (socket, next) {
      try {
        const accessToken = socket.handshake.query.accesstoken || null;

        if (!accessToken) {
          console.log('Token yok......')
          return next(new Error('Socket Authentication error'))
        }

        const decoded = verifyToken(accessToken)


        socket.user = decoded;

        return next();
      } catch (error) {
        return next(error);
      }
    });

    this.io.on('connection', (socket: any) => {
      console.log(`${socket.id} connected`);
      // Disable max listener limit
      socket.setMaxListeners(0);

      socket.emit('sayHello', 'Hello!');

      socket.on('generalChat', (msg) => {
        console.log(msg);
        this.io.emit('generalChat', msg)
      });

      socket.on('newChatRequest', (msg) => {
        console.log(msg);
        this.io.emit('generalChat', msg)
      });

      socket.on('disconnect', () => {
        console.log('bir kişi çıktı..');
      });
    });
  }

  test() {
    return 'test';
  }

  
}

function verifyToken(accessToken) {
  try {
    jwt.verify(
      accessToken,
      process.env.JWT_PUBLIC_KEY,
      (err, decoded) => {
        if (err) {
          return false;
        } else {
          return decoded;
        }
      },
    );
  } catch (error) {
    return false;
  }
}

const SocketService = new _SocketService();
export default SocketService;
