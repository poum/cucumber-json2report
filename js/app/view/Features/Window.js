Ext.define('CJ2H.view.Features.Window', {
	extend: 'Ext.window.Window',
	alias: 'widget.FeatureEmbeddingWindow',
	height: 500,
	width: 600,
	closeAction: 'hide',
	maximizable: true,
	layout: 'border',

	initComponent: function() {

		this.items = [{  
			xtype: 'image',
			region: 'center',
			src: this.config.src,
			},{
			xtype: 'treecolumn',
			region: 'west',
			width: 200,
			collapsible: true,
			collapsed: false,
		}];

		this.bbar = [
			'->',
			{ xtype: 'button', text: '|<' },
			{ xtype: 'button', text: '<', action: 'previous' },
			{ xtype: 'button', text: '||' },
			{ xtype: 'button', text: '>', action: 'next' },
			{ xtype: 'button', text: '>|' }
		];

	this.callParent(arguments);

    }
});
