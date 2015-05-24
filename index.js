var fs = require('fs');
var marked = require('marked');

var target = ('../watchjits'); // todo: as an npm module, this will run on current directory
var sourcePostsDirectory = target + '/posts/';
var targetDirectory = target + '/dist/';
var targetPostsDirectory = targetDirectory + 'posts/';

var files = fs.readdirSync(sourcePostsDirectory);

files.forEach(processSourceFiles);
createHomePage();

function createHomePage() {
  var html = "<a target='_blank' href='posts/cummings-v-gomez-adcc-trials.html'>first post (this wont really be hardcoded)</a>";
  fs.writeFileSync(targetDirectory + 'index.html', html);
}

function processSourceFiles(element, index, array) {
  console.log("processing " + element);
  var sourcePath = sourcePostsDirectory + element;
  var targetPath = targetPostsDirectory + element.replace(/(\.mwd)/,'.html');

  if (/^.*(\.mwd)/.test(element)){
    processMwdFile(sourcePath, targetPath);
  }
  if (/^.*(\.png)/.test(element)){
    copyImage(sourcePath, targetPath);
  }
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
