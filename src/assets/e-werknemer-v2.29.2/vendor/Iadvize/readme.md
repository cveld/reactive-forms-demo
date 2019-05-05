iadvize cobrowsing snippet + js/css
v37
2016/01/15 Casper de Groot


Configure:
==========
1) paths in snippet 
2) SID in snippet 


What changed:
=============
*v37*
-----
Load-on-demand instead of loading all cobro files for everyone
Synced some textual changes back into the release
Adds `return false` to all buttons, thus eliminating the need for 2 separate versions.

Requires usage of `jquery.cookie`
Uses `$.deferred`, which requires at least jQuery 1.5

Important: update both the snippet AND the `/static/vendor/Iadvize` folder! 


*v36*
-----
Updated iadvizecallback

Split the snippets in two versions,
one for MijnUWV, one for all others
Only difference, is that the configuration option 3, as added in v35 is now already preconfigured.

added version number in all files

*v35*
-----
minor fix for snippet, changed two occurrences `onclick="javascript:myFunction()"` to `onclick="myFunction()"`
added configuration option 3, for TripleE
3) For TripleE: add `return false` to both javascript onclick buttons, eg:
`onclick="myFunction()"`  --> `onclick="myFunction()"; return false;`


*v34*:
-----
Should work for both WNP, WGP, TripleE, and with some minor styling also for werk.nl
Combined with Vincent van Beeks version from 2015-11-28

*v???*
-----
Packed in one release, with an arbitrary version number.

cobro.css
---------
1) made paths to images relative to the stylesheet
2) Added some styling that only kicks in when NOT bootstrap
(so WGP and TripleE now look better)

**Important, this is pretty ugly!**

I 'detect' bootstrap by checking a class on the html (that is commonly set when using bootstrap)
`html:not(.js)`

Snippet
-------
Some HTML structure/classes, to maximize usage of bootstrap for WNP
Some HTML classes, for all platforms that dont use bootstrap (WGP/TriplE, and probably werk.nl?)

cobro.js
--------
1) it now uses jQuery instead of $   (for werk.nl)
2) idz_cobro() checks the input of the textbox first, before appending it to the url. (this should take care of the SSD issue, but only clientside)
3) idz_cobro() also uses Vincents append-or-replace functionality to make sure we cant append it twice
4) Fix for Vincents version that didnt appear to work properly when updating the value, it then forgot the 'idz-' part before de ABCD1
