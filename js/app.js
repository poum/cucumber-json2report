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
