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
