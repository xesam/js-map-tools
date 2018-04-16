let fs = require("fs");
let lineReader = require("line-reader");

let lines = [];

lineReader.eachLine("./019_2018-04-15.csv", "utf-8", function(line, last) {
  line = JSON.parse(line);
  lines.push(line);
  if (last) {
    fs.writeFile("./019.data.js", `let data=${JSON.stringify(lines)}`, "utf-8", function(err) {
      console.log(err);
    });
    return false;
  }
});
