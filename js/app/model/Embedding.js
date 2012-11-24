Ext.define('CJ2H.model.Embedding', {
    extend: 'Ext.data.Model',
    fields: [
	{ name: 'id' },
	{ name: 'step' },
	{ name: 'data', type: 'string' },
	{ name: 'mime_type', type: 'string', defaultValue: 'image/png' }
    ],

    getSrc: function() {
	return Ext.String.format('data:{0};base64,{1}', this.get('mime_type'), this.get('data'));
    }
});
