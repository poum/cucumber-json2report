# cucumber-json2report

## Introduction

cucumber-json2report produces dynamically and locally graphical reports for your [cucumber-jvm](https://github.com/cucumber/cucumber-jvm) tests.
This report are localized, according to your browser preferences or as specified with the `lang` parameter.

## For the impatients

1. get cucumber-json2report zip and unzip it anywhere
2. optionnally, put your json cucumber report in `data` sub directory (supposing it's name is `cucumber.json`)
3. open in your browser (only firefox for the moment) the `quickstart.html` file with this url: file:///path/to/cucumber-json2report/quickstart.html
4. play around and enjoy

Notice: works only with Firefox for the moment, due probably to more restrictive security policy in other browser (XHR).

## Documentation

### Overview

By example, using: `file:///somepath/cucumber-json2report/index.html?lang=fr&src=data/cucumber.json&project=MyProject&build=42`
a feature overwiew screen will be pretty quickly displayed:

![feature overview](https://github.com/poum/cucumber-json2report/raw/master/docs/images/features-overview.png "Feature overview")

Notice how the build and project parameters modify the page title, the page header and title in the document.
Thanks to default values, `file:///somepath/cucumber-json2report/index.html` will display the same information,
without project and build reference.

If you're french, you could use `lang=fr` (or `lang=fr_FR` or nothing at all because your browser is probably already
configured to display french by default):

![feature overview](https://github.com/poum/cucumber-json2report/raw/master/docs/images/features-i18n-overview.png "Localized feature overview")

When the mouse is over a chart, additionnal information are displayed.

If you click a legend item element, the corresponding category is masked/restored.
If you click on the 'save image' button and IF you're on Internet, you can save a chart picture.
If you click on the button above the 'save image' one, you can mask/unmask the chart panel.

You can mask/retore/sort/reorder columns in the grid.
If you click on a row, you access to the corresponding result listing and the charts will
focus on this specific data.
Click again on this row or on the grid 'restore' button to get all data back and mask the listing.
If you click on the button above the 'display all features again' one, you can mask/unmask the grid panel.

![feature overview](https://github.com/poum/cucumber-json2report/raw/master/docs/images/a-feature.png "Focus on a particular feature")

Below, you'll find the corresponding listing with (eventually) tags and comments.

![feature overview](https://github.com/poum/cucumber-json2report/raw/master/docs/images/feature-details.png "Feature listing")

If screenshots were recorded while testing, buttons indicating their number will be added:

![feature overview](https://github.com/poum/cucumber-json2report/raw/master/docs/images/feature-with-embeddings.png "Feature listing")

You can access to screenshots (if any) by clicking on the 'image' buttons. The number displayed is
the number of screenshots available for a speficic step.
In the popup window, you can browse in all the scenario screenshots.

![Embedding navigator](https://github.com/poum/cucumber-json2report/raw/master/docs/images/embedding-navigator.png "Embedding Navigator")

Click to any embedding of any step to change the image.
Click to the '<<' button to hide the navigator and to '>>' to restore it.
You can also maximize, hide or resize the window with the usal way. This settings will be keeped when hiding the window.

### Features

* fully localization (english and french for now, help needed for adding others)
* dynamic status charts for scenarios and steps, for all features or for a single one
* pretty feature result listing with status, duration, and comments for features, scenarios, and steps; tags for features and scenarios
* screenshot navigator

### Local install

If you need /want use a local installation of ExtJS (on local network by example), you have to:

1. get sencha extjs 4.1.1a on http://www.sencha.com/products/extjs/download/ (dual Gnu GPL v3 and commercial license)
2. extract it and link it as `extjs` in the `js` sub directory
3. use `index.html` instead of `quickstart.html`.

### Configuration

cucumber-json2report use, in this order of decreasing precedence:

* url parameter
	* `src`: the location of the cucmber json file, which could be local
	* `lang`: the language for the UI
	* `project`: the name of the tested project to display
	* `build`: the build number to display
	* `jenkins`: your jenkins base URL (TODO)
* config file (TODO)
* default values
	* `src`: `data/cucumber.json`
	* `lang`: the browser default one or `en`

### Compatibility

For now, cucumber-json2report was successfully tested only on Firefox (Linux Ubuntu 12.04 32bits & Windows Seven Pro).

Feel free to send feedback for other configurations.

## Development information

### Design

After I've discovered the excellent cucumber-jvm used in conjonction with Selenium WebDriver,
I've looked for a way to export the results, especially for the stake holders who are intended
to write (make write) the feature files.

First, we have cucumber-js, but:
* it'not really pretty (my only opinion)
* all the data are put together
* it's not localized
* it need the html format to be activated during tests

So I've found Thucydides which looks great but did'nt support cucumber-jvm for now, and
cucumber-reporting. This one is great but:
* it's not localized
* it does'nt display embeddings
* it's not really customizable and the templates used are pretty 'complexes' and redundants, and are
  full of style elements
* I don't like the graph used (flash and another raw one).
* it need mvn each time the report need to be re-generated

My first idea was to localize the cucmber-reporting templates and to propose extjs charts. But I've found
text element in the templates, in the javascript chart code and in the java code.
Then, I've realized that cucumber-reporting translate json data with java to produce report and I need to revert
this data in JSON to feed the extjs charts. Sounds silly !

Here comes the idea: why not rewrite from scratch a report generator ?
I retains the following characteristics:
* fully localized
* fully dynamic
* fully locally usable (a tricky part !)
* as pretty and ergonomic as possible (remember, this is mainly aimed to stake holders)
* as configurable as possible
* usable on most of the current browsers, without additional plugins
* with less dependances as possible: no web server, no JSON transformation tool, no plugins

So, I decided to use the extjs javascript framework as the only dependance.
I've also retained the MVC architecture. 
All style elements are in a css stylesheet, which refers to images element, so yo can
adapt it to your taste or to your organization graphic chart.

I've started to work on it at the beginning of november 2012.

### Todo

The next improvement will be:
* play, back forward button for screenshot browser window
* format duration in screenshot browser window
* a tag page as the cucumber-reporting one (almost finished) and link from one to the other
* a menu (Extjs + controller)
* a about menu
* jenkins link (a plugin also)
* a config file
* compatibility with other major browsers (Chrome, IE, Konqueror, Epiphany, Opera & Safari)
* functionnal tests (with cucumber-jvm of course)
* ajax mode
* fix BOM iframe warning
* add a duration pie chart
* add a prod compressed version
* use sass/compass to reduce css complexity
* help menu
* add icon to the grid
* fix logo link
* add validation to models
* fix chart tooltip size
* add loading error alert
* fix gender and number for step, scenario, feature vs failed, passed, skipped, pending
* save tag chart
* display tag listing
* space beetween feature charts
* increase name size in grid and put description in a tooltip
* add tag link from listing
* add en and fr doc
* put chart colorSet in config / page
* handle lower/uppercase parameters
* see how save chart without Internet

### ... Maybe ?

* reverse tag chart orientation
* loading indicator
* history page
* multi src
* french: étiquetter ou marqueur ?
* skippedFailed option
* artifactEnabled option
* undefinedFailed option
* use feature lang for page


## Bugs ?

If you think you have detected a bug:

1. check if it's not a feature !
2. post an issue with:
  * the incriminated cucumber json file 
  * the reproduction process
  * your configuration (extjs, browser, OS, lang)

Feel free to propose a fix ;-)

### Help wanted

As you have certainly noticed, I'm not an english native speaker. Feel free to suggest any improvement
for this documentation and the locale/default.js (aka en.js) file.

Mein Deutsch ist schrecklich, ich habe nicht locale/de.js schreiben versuchen.

You're welcome to propose any other localization.

## Copyright

Copyright 2012 Philippe Poumaroux

## License

This file is part of cucumber-json2report.

cucumber-json2report is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

## Credits & links

* aslak hellesoy for the excellent cucumber-jvm (please, fix the JSON output, I need results in every step)
  https://github.com/cucumber/cucumber-jvm
* Kingsley Hendrickse for cucumber-reporting, for the inspiration
  https://github.com/masterthought/cucumber-reporting
* thucydides for additionnal ideas
  https://github.com/thucydides-webtests/thucydides
* Sencha for the excellent ExtJS javascript framework 
  http://www.sencha.com
* Douglas Crockford for his Javascript book and JSLint
  https://github.com/douglascrockford/JSLint

## Contact

poum `<at>` cpan.org

See also by blog (in french) at http://philippe.poumaroux.free.fr

## Need a pause ?

See [the french Teamsaw site](http://www.teamsaw.eu)
