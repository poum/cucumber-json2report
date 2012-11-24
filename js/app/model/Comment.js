Ext.define('CJ2H.model.Comment', {
    extend: 'Ext.data.Model',
    fields: [
	{ name: 'id' },
	{ name: 'text', type: 'string',
		convert: function(v, record) {
			return v.replace(/^\#/, '');
		}
        },
	{ name: 'feature', defaultValue: null },
	{ name: 'scenario', defaultValue: null },
	{ name: 'step', defaultValue: null },
    ],

    getListing: function() {
	return Ext.String.format('<li>{0}</li>', this.get('text'));
    }
});
