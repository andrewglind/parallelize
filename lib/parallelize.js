"use strict"

let cluster = require("cluster")
let cpus = require("os").cpus().length

module.exports = (map, reduce) => {
 let results = []
 if(cluster.isMaster) {
  for(let i = 0; i < cpus; i++) {
   let worker = cluster.fork()
   worker.on("message", (result) => {
    results.push(result)
    if(results.length == cpus) {
     reduce(null, cpus, results)
    }
   })
  }
 } else {
  process.send(map(cpus))
 }
}
