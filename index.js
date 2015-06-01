var fs = require('fs');
var marked = require('marked');
var paths = require('./js/paths.js');

var siteTitle = process.argv.slice(3)[0];
 // todo: as an npm module, this will run on current directory

var masterTemplate = fs.readFileSync(paths.masterTemplate, {encoding:'utf8'});
var files = fs.readdirSync(paths.sourcePostsDirectory).sort(); //todo sort by date
copyImages();
var posts = getPosts();
createHomePage(posts);
createPosts();
// todo - copy css, favicon

function copyImages(){
  var pngs = files.filter(function(x){return /^.*(\.png)/.test(x);});

  for (var i = 0; i < pngs.length; i++){
    copyImage(paths.sourcePostsDirectory + pngs[i], paths.targetPostsDirectory + pngs[i]);
  }
}

function getPosts(){
  var txtFiles = files.filter(function(x){return isMwd(x);});
  var posts  = new Array(txtFiles.length);
  for (var i = 0; i < txtFiles.length; i++){
    posts[i] = new Post(txtFiles[i]);
  }
  return posts;
}

function Post(filename){
  this.pagetitle = null;
  this.date = new Date();
  this.sourcePath = paths.sourcePostsDirectory + filename;
  this.htmlFileName = filename.replace(/(\.mwd)/,'.html');
  this.targetPath = paths.targetPostsDirectory + this.htmlFileName;
  this.md = getMd(this.sourcePath);
  this.getDefaultTitle = function(){
    return filename.replace(/-/g,' ').replace('.mwd','');
  };
}

//get markdown for this post
function getMd(sourcePath){
  var md = fs.readFileSync(sourcePath, {encoding:'utf8'});

  // wrap .png's in an image tag
  md = md.replace(/^.*(\.png)/mg,'<p><img src=\'$&\' /></p>');

  return marked(md);
}

function createPosts(){
  var i;
  for ( i = 0; i < posts.length; i++ ){ // convert to foreach?
    fs.writeFileSync(posts[i].targetPath, getHtmlFullPage(posts[i].pagetitle, marked(posts[i].md)));
  }
}

function createHomePage(posts) {
  var i, html = '', title = '';

  for (i = 0; i < posts.length; i++){
    title = posts[i].pagetitle || posts[i].getDefaultTitle();
    html += '<a href="' + paths.postsDirectoryHtmlRelativePath + posts[i].htmlFileName + '"/>'  + title + '</a><br/>';
  }
  console.log(html);
  fs.writeFileSync(paths.targetDirectory + 'index.html', getHtmlFullPage(siteTitle, html));
}

function isMwd(file){
  var result = /^.*(\.mwd)/.test(file);
  console.log('isMwd result for ' + file + ' is ' + result);
  return result;
}

function copyImage(sourcePath, targetPath){
  fs.createReadStream(sourcePath).pipe(fs.createWriteStream(targetPath));
}

function getHtmlFullPage(pagetitle, body){
  html = masterTemplate.replace(/(~~title~~)/g,pagetitle).replace(/(~~body~~)/,body);
  return html;
}
