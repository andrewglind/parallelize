"use strict"

let parallelize = require("../lib/parallelize")
let _ = require("underscore")

const NUM_SAMPLES = process.env.NUM_SAMPLES || 1000000

let inside = (p) => {
 let [x, y] = [Math.random(), Math.random()]
 return (x*x + y*y) < 1
}

parallelize((cpus) => { return _.chain(_.range(Math.floor(NUM_SAMPLES / cpus))).filter(inside).size().value() }, (err, cpus, results) => {
 let count = _.reduce(results, (m, i) => { return m + i }, 0)
 console.log(`PI is roughly ${4.0 * (count / NUM_SAMPLES)}`)
 process.exit()
})
