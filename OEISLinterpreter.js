var OEIS = {seq:[],
            input:process.argv.slice(3),
            program:process.argv[2]}
​
async function get(a, n) {
  if (OEIS.seq[a]) return OEIS.seq[a][n]
  
  let id = "0".repeat(6-a.toString().length) + a
  let got = require("got")
  let page = await got("http://oeis.org/A" + id + "/b" + id + ".txt")

  let list = page.body. split("\n").map(x=>x.split(" "))
  let sequence = []
  for (let i of list) {
    sequence[i[0]] = i[1]
  }
  OEIS.seq[a]=sequence
  return OEIS.seq[a][n]
}
​
while (previous != OEIS.program) {
  var previous = OEIS.program.toString()
  //console.log(OEIS.program) //for debug
  
  if(OEIS.program.match(/i\((\d)\)/)) { 
    OEIS.program = OEIS.program.replace(/i\((\d)\)/g,(match,p1)=>OEIS.input[p1])
  } else if (OEIS.program.match(/A(\d{1,6})\((\d+)\)/)) {
    var a, n
    OEIS.program.replace(/A(\d{1,6})\((\d+)\)/,(match,p1,p2)=>[a=p1,n=p2])
    await get(a,n)
    OEIS.program = OEIS.program.replace(/A(\d{1,6})\((\d+)\)/,(match,a,n)=>OEIS.seq[a][n])
  }
}
console.log(OEIS.program)
