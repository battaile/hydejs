var fs = require('fs');
var marked = require('marked');

var target = ('../watchjits'); // todo: as an npm module, this will run on current directory
var sourcePostsDirectory = target + '/posts/';
var targetDirectory = target + '/dist/';
var targetPostsDirectory = targetDirectory + 'posts/';

var files = fs.readdirSync(sourcePostsDirectory).sort();

files.forEach(processSourceFiles);
createHomePage();

function createHomePage() {

  var mwd = '';
  var txtFiles = files.filter(function(x){return isMwd(x);});

  for (var i = 0; i < txtFiles.length; i++){
    mwd += '[' + txtFiles[i].replace(/-/g,' ').replace('.mwd','') + '](posts/' + txtFiles[i].replace(/(\.mwd)/,'.html') + ')<br/>';
  }
  console.log(mwd);
  fs.writeFileSync(targetDirectory + 'index.html', getHtmlFullPage(mwd));
}

// refactor homepage generation to work off arrays getting built when processign source files so it can access the data there
function processSourceFiles(element, index, array) {
  console.log("processing " + element);
  var sourcePath = sourcePostsDirectory + element;
  var targetPath = targetPostsDirectory + element.replace(/(\.mwd)/,'.html');

  if (isMwd(element)){
    processMwdFile(sourcePath, targetPath);
  }
  if (/^.*(\.png)/.test(element)){
    copyImage(sourcePath, targetPath);
  }
}

function isMwd(file){
  var result = /^.*(\.mwd)/.test(file);
  console.log('isMwd result for ' + file + ' is ' + result);
  return result;
}

function copyImage(sourcePath, targetPath){
  fs.createReadStream(sourcePath).pipe(fs.createWriteStream(targetPath));
}

function processMwdFile(sourcePath, targetPath){
  var text = fs.readFileSync(sourcePath, {encoding:'utf8'});

  // wrap .png's in an image tag
  text = text.replace(/^.*(\.png)/mg,'<p><img src=\'$&\' /></p>');
  text = getHtmlFullPage(text);
  fs.writeFileSync(targetPath, text);
}

function getHtmlFullPage(body){
  return marked(body);
  //return '<html><head></head><body>' + body + '</body></html>';
}
