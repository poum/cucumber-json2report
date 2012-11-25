/*
Copyright 2012 Philippe Poumaroux

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
*/
Ext.require('CJ2H.locale.fr');
Ext.require('CJ2H.locale.en');
Ext.require('CJ2H.locale.default');

Ext.define('CJ2H.data.Page', {

	config: {
		src: '',
		menu: 'Features',
		lang: null,
		build: null,
		project: null,
		msg: null
	},
	
	constructor: function(config) {
		this.initConfig(config);

		var params = Ext.Object.fromQueryString(window.location.search);

		// param names to lower case
		console.log('TODO: param names to lower case....');
		/*
		Ext.Array.forEach(rawParams,
			function(nomParam) {
				params[nomParam.toLowerCase()] = rawParams[nomParam];
			}
		);
		*/

		if (params.menu != null) {
			params.menu = this.applyMenu(params.menu);
			if (params.menu !== 'Features' && params.menu !== 'Tags' && params.menu !== 'Feature' && params.menu !== 'Tag') {
				this.setMenu('Notfound');
			}
			else {
				this.setMenu(params.menu);
			}
		};

		Ext.Array.forEach(['src', 'build', 'project', 'lang'], 
    			function(param) {
				if (params[param] !== null) {
					if ('src' !== param && 'object' === typeof params[param]) {
						params[param] = params[param][0];
						alert('Multiple value for ' + param + ' parameter:' +
                                                      '\n\n\t"'+ params[param] + '" will be used' +
						      '\n\tother redondant values dropped');
					}
					if ('lang' === param) {
						params.lang = this.normalizeLang(params.lang);
					}
					this[param] = params[param];
				}
			}, this
		);

		// try to load appriopriate language (for this app & extjs)
		// the asked one if any
		// the reduced (fr_FR => fr by example) if any	
		// the navigator default one if any
                // the reduced navigator default one
		// 'default': this one should always be available
		
		var langs = Ext.Array.unique([ params.lang, this.getGenericLang(params.lang), this.getDefaultLang(), this.getGenericLang(this.getDefaultLang()), 'default' ]);

		while (! this.msg && langs) {
			this.setLang(langs.shift());
		}

		this.setTitles();
	},

	applyMenu: function(menu) {
		menu = menu.toLowerCase();
		return menu.replace(menu[0], menu[0].toUpperCase());
	},

	getDefaultLang: function() {

		// catch navigator default language if any
		return (window.navigator && window.navigator.language) ? this.normalizeLang(window.navigator.language) : 'default';
	},

	normalizeLang: function(lang) {
		if (lang) {
			var parts = lang.split(/[\W_]/);
			if (parts[0]) {
				if (parts[1]) {
					lang = parts[0].toLowerCase() + '_' + parts[1].toUpperCase();
				}
				else {
					lang = parts[0];
				}
			}
		}

		return lang;
	},

	setLang: function(lang) {
		// the langs array could have 'undefined' elements to ignore 
		if (lang) {
			try {
				this.msg = Ext.create('CJ2H.locale.' +lang);
				this.lang = lang;
				//load corresponding extjs language file
				Ext.Loader.loadScript({
					url: 'js/extjs/locale/ext-lang-' + this.lang + '.js',
					onError: function() {
						Ext.Loader.loadScript({
							url: 'js/extjs/locale/ext-lang-' + this.getGenericLang(this.lang) + '.js',
							scope: this
						});
					},
					scope: this
				});
			}
			catch(e) {
				if ('default' !== lang) {
					console.error('Language "' + lang + '" not available ! I will try another one ...');
				}
				else {
					throw { error: 'FatalError', message: 'default message component not available, send bug report !' }; 
				}
			}
		}
	},

	getGenericLang: function(lang) {
		genericLang = null;

		// lang could be 'undefined'
		// seak for 'xx_YY' or 'xx-YY' and replace by xx
		if (lang && lang.match(/[_-]\w+$/)) {
			genericLang = lang.replace(/[-_]\w+$/, '');	
		}

		return genericLang;
	}, 

	setTitles: function(menu, name) {

		menu = menu || this.menu;
		var pageTitle = '';
		var suffix = '';

		if ("Features" === menu || "Tags" === menu) {
			if (name) {
				menu += "Named";
				suffix = ' ' + this.msg['for'+menu] + ' "'+name+'"';
			}
			pageTitle = this.msg[menu + 'PageTitle'];
			gridTitle = this.msg[menu + 'Statistics'];
	
			if (this.build) {
				suffix += ' ' + this.msg.forBuild + this.build;
			}
		} 

		document.title = this.msg.pageTitlePrefix + ' - ' + pageTitle + suffix;
		Ext.getDom('pageTitle').innerHTML = pageTitle + suffix;
		Ext.getDom('gridTitle').innerHTML = gridTitle + suffix;

		if (this.project) {
			Ext.getDom('project').innerHTML = this.project;
		}	

		if (this.build) {
			Ext.getDom('build').innerHTML = this.msg.build + this.build;
		}
	}
});
