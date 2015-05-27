# hydejs
Static site generator that likely will be hideous compared to Jekyll.  See the 'watchjits' repository for sample source files.

#How to Use
Create directory/repo for project. (todo: this path is currently hardcoded, need to change this to run as watcher in the target directory)
Create subfolder named posts.
Add mwd (see below) and png files to posts directory.
Run 'node index' from terminal

# MWD (mark WAY down)
Supports regular markdown with the following additions:
Any line ending in '.png' will be replaced with an img tag

# header section:
Must be the first non-blank lines in the document
```
date: 5/23/15
title: Eddie Cummings vs Walter Gomez, 2015 ADCC trials
```
