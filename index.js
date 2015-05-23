var fs = require('fs');

var target = ('../dracstudy');

var files = fs.readdirSync(target);

// for each txt file
files.forEach(processSourceFiles);


function processSourceFiles(element, index, array) {
  if (/^.*(\.txt)/.test(element)){
    processTextFile(element);
  }
}

function processTextFile(file){
  var sourcePath = target + '/' + file;
  var text = fs.readFileSync(sourcePath, {encoding:'utf8'});
  console.log(text.replace(/^.*(\.png)/mg,'<img src=title$& />'));
  fs.writeFileSync(target + '/dist/' + file.replace(/(\.txt)/,'.html'),
      text.replace(/^.*(\.png)/mg,'<img src=title$& />'));
}
