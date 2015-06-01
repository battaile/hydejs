exports.sourceDirectory = process.argv.slice(2)[0];
exports.sourcePostsDirectory = exports.sourceDirectory + '/posts/';
exports.targetDirectory = exports.sourceDirectory + '/dist/';
exports.targetCssDirectory = exports.targetDirectory + 'css/';
exports.targetPostsDirectory = exports.targetDirectory + 'posts/';
exports.postsDirectoryHtmlRelativePath = '../posts/';
exports.masterTemplate = 'templates/master.html.template';
