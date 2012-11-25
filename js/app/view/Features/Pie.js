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
Ext.define('CJ2H.view.Features.Pie', {
    extend: 'Ext.chart.Chart',
    alias: 'widget.FeaturesPie',
    width: 400,
    height: 400,
    animate: true,
    shadow: true,
    legend: { position: 'bottom' },
 
    initComponent: function() {

	this.series = [{
                    type: 'pie',
                    field: this.config.field,
                    showInLegend: true,
                    highlight: true,
		    donut: this.config.donut || false,
		    colorSet: this.config.colorSet,
                    tips: {
                        trackMouse: true,
                        width: 180,
                        height: 28,
                        renderer: function(storeItem, item) {
			    field= item.series.field;
                            var total = 0;
                            storeItem.store.data.each(function(rec) {
                                total += rec.get(field);
                            });
                            this.setTitle(storeItem.get('status') +': ' 
                                          + storeItem.get(field) + ' / ' 
                                          + total + ' (' + Math.round(storeItem.get(field) / total * 100) + '%)');
                        }
                    },
                    label: {
                        field: 'status',
                        display: 'rotate', 
                        contrast: true,
                        font: '16px Arial',
			// to remove label for null values
			renderer: this.config.renderer
                    }
                }
                ];

	this.callParent(arguments);
    }
});
