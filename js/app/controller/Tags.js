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
Ext.define('CJ2H.controller.Tags', {
    extend: 'Ext.app.Controller', 

    //stores: ['Features', 'StepPie', 'ScenarioPie', 'TagStepStackedBar'],
    stores: ['Tags'],
    views: ['Tags.StackedBar', 'Tags.Grid'],
    refs: [
	{ ref: 'btnAllTags', selector: 'button[action=allTags]' },
	{ ref: 'btnSaveCharts',  selector: 'button[action=saveCharts]' },
	{ ref: 'TagsGrid', selector: 'TagsGrid' }
    ],

    config: {
	page: null,
	viewWin: null
    },

    init: function(config) {

	this.setPage(config.page);
	var msg = config.page.getMsg();
	var stepColorSet = [ '#93AD09', '#105EA5', '#A5101F', '#FD8708' ];

        Ext.create('Ext.panel.Panel', {
            renderTo: 'graph',
            layout: 'fit',
	    height: 450,
	    width: 960,
	    title: msg.tagsStackedBarChart,
	    collapsible: true,
            items: [
                { xtype: 'TagsStackedBar', store: this.getTagsStore(), config: { msg: msg, colorSet: stepColorSet } }, 
            ],
	    tbar: [
		'->', {
		tooltip: msg.saveChartsDesc,
		action: 'saveCharts',
		iconCls: 'saveCharts'
	    }]
        });

        Ext.create('Ext.panel.Panel', {
            renderTo: 'gridPanel',
            layout: 'fit',
	    height: 300,
	    title: msg.tagList,
	    collapsible: true,
            items: [
                { xtype: 'TagsGrid', store: this.getTagsStore(), config: { msg: msg } }, 
            ],
	    tbar: [
		'->', {
		tooltip: msg.alTagsDesc,
		action: 'allTags',
		iconCls: 'allTags',
		disabled: true
	    }]
        });

        this.control({
	    'TagsGrid': {
		itemclick: this.toggleDisplaySingleTag,
	    },

	   'button[action=allTags]': {
		click: this.toggleDisplaySingleTag,
	   },

        });

    },

    toggleDisplaySingleTag: function(grid, record) {

	// not grid.getStore to allow button 'all tags' to call this method
	var store = Ext.getStore('Tags');

	if (store.isFiltered()) {
		store.clearFilter();
		this.getPage().setTitles('Tags');
	 	this.getBtnAllTags().disable();
		//this.clearTagListing();
	}
	else {
		//assert: called only from grid (record needed)
		store.filter([{ property: "id", value: record.getId(), exactMatch: true }]);
		this.getPage().setTitles('Tags', record.get('name'));
	 	this.getBtnAllTags().enable();
		//this.displayTagListing(record);
	}

	if (record) {
		//assert: should always have grid if we have record ...
		grid.deselect(record);
	}
    },

    cleaTagListing: function() {
	Ext.fly('listing').setHTML('');
    },
});
