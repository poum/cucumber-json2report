Ext.define('CJ2H.model.JsonFeature', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id' },
	{ name: 'tags' },
	{ name: 'description' },
	{ name: 'name' },
	{ name: 'keyword' },
	{ name: 'line', type: 'int' },
	{ name: 'elements' },
	{ name: 'uri' },
	{ name: 'comments' }
    ],
});
