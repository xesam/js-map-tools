let fs = require("fs");
let lineReader = require("line-reader");

lineReader.eachLine("./019_2018-04-15.csv", "utf-8", function(line, last) {
  line = JSON.parse(line);
  fs.writeFile(
    `./lines/${line.name}.js`,
    `let data_${line.name}=${JSON.stringify(line)}`,
    "utf-8",
    function(err) {
      if (err) {
        console.log(err);
      }
    }
  );
  if (last) {
    return false;
  }
});
