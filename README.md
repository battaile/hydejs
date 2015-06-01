# IN EARLY STAGES, NOT READY FOR PRIME TIME, DONT USE AAAAA

# hydejs
Static site generator that likely will be hideous compared to Jekyll.  See the 'watchjits' repository for sample source files.

# goals
- dead simple, just type some text and/or picture names in a text file
- looks good on mobile, or at least the (insert whatever I currently own here)

# How to Use
- Create directory/repo for project. (todo: this path is currently hardcoded, need to change this to run as watcher in the target directory)
- Create subfolder named posts.
- Add mwd (see below) and png files to posts directory.
- Run 'node index [directory path] [site title]' from terminal, eg node index.js '../watchjits' 'Watch Jits!';

# MWD (mark WAY down)
Supports regular markdown with the following additions:
- Any line ending in '.png' will be replaced with an img tag

# header section:
Must be the first non-blank lines in the document
```
date: 5/23/15
title: Eddie Cummings vs Walter Gomez, 2015 ADCC trials
```

# stuff I'm using:
- node - server/runtime
- node-inspector - godsend for debugging node
- npm - package manager
- skeleton - css
- atom - javascript ide (sorta)
- http-server - at least initially, my preferred way of testing the output in a browser but this is going to be changing
- marked - for md-to-html conversion
