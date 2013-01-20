# quickload.js

(**NOTE:** This is a work in-progress. You can have a look (and please give
feedback!), but it's far from done.)

We're always striving to increase the performance and responsiveness of our
websites. **Loading JavaScript asynchronously** is an obvious improvement,
thus we've seen a surge of JavaScript loaders lately:

[$script.js](https://github.com/ded/script.js) [Bootstrap](https://bitbucket.org/scott_koon/bootstrap) [defer.js](https://github.com/wessman/defer.js) [dropinrequire.js](http://jeromeetienne.github.com/dropinrequire.js/) [FormfactorJS](http://formfactorjs.com) [Head JS](http://headjs.com/) [Include.js](http://capmousse.github.com/include.js/) [JsDefer](https://github.com/BorisMoore/jsdefer/) [l.js](https://github.com/malko/l.js) [LABjs](http://labjs.com/) [LazyLoad](https://github.com/rgrove/lazyload) [Loadrunner](https://github.com/danwrong/loadrunner) [RequireJS](http://requirejs.org/) [Riloadr](https://github.com/tubalmartin/riloadr) [toast](https://github.com/pyrsmk/toast) [yepnope](http://yepnopejs.com/).

However, it turns out that asynchronous JavaScript brings some interesting
challenges, and the answers are not always obvious. That's why Quickload takes
a different approach than other JavaScript loaders. Quickload consists of
three parts:

A few **principles** of how a website should behave. Nothing revolutionary,
but it's useful to write them down in precise terms.

A set of **best practices** and **strategies** that follows these principles.

A **JavaScript library** that will help you on the way.

I hope that this project will enlighten some of the difficulties of
asynchronous JavaScript and help you make the best decisions for your project.

Enjoy!

## Quickload's Law

> The user should *always* be able to interact *meaningfully* with every element
> on the screen.

It seems pretty obvious. If there's a link present on the screen, you want the
user to be able to click it. How hard can it be? Well, if you've ever browsed
JavaScript-heavy sites with a slow connection, you might have experienced some
of these situations:

* You click a link, but you get sent to the top of the page and nothing
  happens. (`<a href="#">Tab</a>`)
* You try to search, but there's no autocomplete. If you wait a few seconds
  and when you press "Backspace" it suddenly works.
* You try to use the arrow keys in an image gallery, but nothing happens. You
  know it worked yesterday, and if you just wait a few seconds it suddenly
  works again.

All of these situations are violations of Quickload's Law.  It makes your site
behave as a minefield, leaving the user petrified of interacting with anything
until everything is properly loaded. Over time the user might learn what
elements are safe to click, but it's certainly not a good user experience.

We developers tend to develop locally or on fast connections so we rarely
think about it. With Quickload I want to change that.

Let's have a look at the law again:

> The user should *always* be able to interact *meaningfully* with every element
> on the screen.

What does *meaningfully* mean? A user can tolerate to wait as long you
*communicate* that it's only going to take a (mili)second. That's meaningful
enough for me.


