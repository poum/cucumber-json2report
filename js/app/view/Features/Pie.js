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
