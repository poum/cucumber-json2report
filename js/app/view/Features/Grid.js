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
Ext.define('CJ2H.view.Features.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.FeaturesGrid',
    
    initComponent: function() {

	var msg = this.config.msg;

	this.features = [{
		ftype: 'summary'
	}];

	this.columns = [ {
		xtype: 'rownumberer'
	},{
		text: msg.name,
		dataIndex: 'name',
		sortable: true,
		summaryType: 'count',
		summaryRenderer: function(value) {
			return Ext.String.format('{0} {1}', value, value < 2 ? msg.feature : msg.features);
		}
	},{
		text: msg.description,
		dataIndex: 'description',
		flex: 1,
		sortable: true
	},{
		text: msg.scenarioNumber,
		dataIndex: 'scenarioNumber',
		sortable: true,
		align: 'center',
		summaryType: 'sum',
		summaryRenderer: function(value) {
			return Ext.String.format('{0} {1}', value, value < 2 ? msg.scenario : msg.scenarios);
		}
	},{
		text: msg.stepNumber,
		dataIndex: 'stepNumber',
		sortable: true,
		align: 'center',
		summaryType: 'sum',
		summaryRenderer: function(value) {
			return Ext.String.format('{0} {1}', value, value < 2 ? msg.step : msg.steps);
		}
	},{
		text: msg.stepPassed,
		dataIndex: 'stepPassedNumber',
		sortable: true,
		align: 'center',
		summaryType: 'sum',
		summaryRenderer: function(value) {
			return Ext.String.format('{0} {1}', value, value < 2 ? msg.passed : msg.passeds);
		}
	},{
		text: msg.stepFailed,
		dataIndex: 'stepFailedNumber',
		sortable: true,
		align: 'center',
		summaryType: 'sum',
		summaryRenderer: function(value) {
			return Ext.String.format('{0} {1}', value, value < 2 ? msg.failed : msg.faileds);
		}
	},{
		text: msg.stepSkipped,
		dataIndex: 'stepSkippedNumber',
		sortable: true,
		align: 'center',
		summaryType: 'sum',
		summaryRenderer: function(value) {
			return Ext.String.format('{0} {1}', value, value < 2 ? msg.skipped : msg.skippeds);
		}
	},{
		text: msg.stepPending,
		dataIndex: 'stepPendingNumber',
		sortable: true,
		align: 'center',
		summaryType: 'sum',
		summaryRenderer: function(value) {
			return Ext.String.format('{0} {1}', value, value < 2 ? msg.pending : msg.pendings);
		}
	},{
		text: msg.duration,
		dataIndex: 'duration',
		xtype: 'numbercolumn',
		renderer: function(value) { return Ext.String.format('{0} {1}', Ext.Number.toFixed(value, 2), msg.ms); },
		sortable: true,
		align: 'right',
		summaryType: 'sum',
		summaryRenderer: function(value) {
			return Ext.String.format('{0} {1}', Ext.Number.toFixed(value, 2), msg.ms);
		}
	}];

	this.viewConfig = { 
	    stripeRows: false,
	    markDirty: false,
	    trackOver: false,
	    getRowClass: function (record, rowIndex, rowParams, store) {
		return 'row_' + record.get('status');
	    }
	};

	this.callParent(arguments);

    }
});
