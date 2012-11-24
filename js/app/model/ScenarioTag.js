Ext.define('CJ2H.model.ScenarioTag', {
    extend: 'Ext.data.Model',
    fields: [
	{ name: 'tag' },
	{ name: 'scenario' },
	{ name: 'feature', defaultValue: null }
    ]
});
