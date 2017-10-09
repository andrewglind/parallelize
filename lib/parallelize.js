"use strict"

let cluster = require("cluster")
let cpus = require("os").cpus().length

module.exports = (map, reduce) => {
 let results = []
 if(cluster.isMaster) {
  for(let i = 0; i < cpus; i++) {
   let worker = cluster.fork()
   worker.on("message", (msg) => {
    results.push(msg)
    if(results.length == cpus) {
     let err = null
     for(let j = 0; j < results.length; j++) {
      if(results[j].err != undefined) {
       err = results[j].err
       break
      }
     }
     reduce(err, cpus, results)
    }
   })
  }
 } else {
  new Promise((resolve, reject) => {
   resolve(process.send(map(cpus)))
  }).catch((err) => {
   process.send({err:err})
  })
 }
}
