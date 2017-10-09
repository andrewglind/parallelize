"use strict"

let {join} = require("path")
let parallelize = require(join("..", "lib", "parallelize"))
let _ = require("underscore")

const NUM_SAMPLES = process.env.NUM_SAMPLES || 1000000

let inside = (p) => {
 let [x, y] = [Math.random(), Math.random()]
 return (x*x + y*y) < 1
}

parallelize(() => { return _.chain(_.range(NUM_SAMPLES)).filter(inside).size().value() }, (err, cores, results) => {
 let count = _.reduce(results, (m, i) => { return m + i }, 0)
 console.log(`PI is roughly ${4.0 * (count / (NUM_SAMPLES * cores))}`)
 process.exit()
})
