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
Ext.define('CJ2H.view.Tags.StackedBar', {
	extend: 'Ext.chart.Chart',
	alias: 'widget.TagsStackedBar',
	animate: true,
	shadow: true,
	legend: { position: 'right' },

	initComponent: function() {

		var msg = this.config.msg;

		this.axes = [{
			type: 'Category',
			position: 'left',
			fields: [ 'name' ], 
			title: msg.tags, 
			label: { rotate: { degrees: -45 } }
		},{
			type: 'Numeric',
			position: 'bottom',
			fields: [ 'stepPassedNumber', 'stepSkippedNumber', 'stepFailedNumber', 'stepPendingNumber' ],
			title: msg.numberOfStepByStatus,
			grid: true
		}];

		this.series = [{
			type: 'bar',
			axis: 'bottom',
			colorSet: this.config.colorSet,
			highlight: true,
			tips: {
				trackMouse: true,
				width: 180,
				height: 28,
				renderer: function(storeItem, item, encore) {
				    var number = item.value[1];
				    var total = storeItem.data.stepNumber;
				    // get the index of the data field in the serie ...
				    var statusIndex = Ext.Array.indexOf(item.series.yField, item.yField);
				    // ... and get the corresponding translation in the legend elements
				    var status = item.series.title[statusIndex];
				    this.setTitle(status +': ' + number + ' / ' + total +
						  ' (' + Math.round(number /  total * 100) + '%)');
				}
			},
			xField: 'name',
			yField: [ 'stepPassedNumber', 'stepSkippedNumber', 'stepFailedNumber', 'stepPendingNumber' ],
			title: [ msg.tagPassed, msg.tagSkipped, msg.tagFailed, msg.tagPending ],
			stacked: true,
		}];
		
	this.callParent(arguments);
    }
});
