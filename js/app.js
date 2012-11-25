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

Ext.Loader.setConfig({
    enabled: true,
    paths: { 'CJ2H': 'js/app' }
});

Ext.require('CJ2H.data.Page');
Ext.require('CJ2H.data.Engine');
Ext.require('CJ2H.controller.Features');
Ext.require('CJ2H.controller.Tags');

Ext.application({
    name: 'CJ2H',
    appFolder: 'js/app',
    models: ['Feature','Tag','Comment'],

    launch: function() {

	var page = Ext.create('CJ2H.data.Page');
	var engine = Ext.create('CJ2H.data.Engine', { app: this, page: page } );

	var controller = page.getMenu();
        this.getController(controller).init({"page": page, "engine": engine});

//	this.getController('Menus').init({"page": page});

    },

});
