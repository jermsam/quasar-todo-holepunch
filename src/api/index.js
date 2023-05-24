
import socketIO from "socket.io-client";
import DHT from '@hyperswarm/dht-relay';
// import Stream from '@hyperswarm/dht-relay/ws';
// import Hyperswarm from 'hyperswarm';
// import goodbye from 'graceful-goodbye';
//
// function createTopic (topic) {
//   const prefix = 'some-app-prefix-'
//   const encoder = new TextEncoder();
//   const data = encoder.encode(prefix + topic);
//
//   return crypto.subtle.digest("SHA-256", data)
//   // return crypto.randomBytes(32)
// }
//
export const socket = socketIO.connect("http://localhost:8080");
//
const dht = new DHT(new Stream(true, socket))

export const swarm = new Hyperswarm({dht});
//
// let  topic
//   createTopic('todo-list').then(topic =>{
//   topic = topic
// })
//
// if(topic) {
//   console.log('line 26: ',topic);
//   swarm.join(topic)
// }
//
//
// goodbye(async () => {
//   if(topic) {
//     swarm.leave(topic).then(()=>{
//       swarm.destroy()
//     })
//   }
// })


