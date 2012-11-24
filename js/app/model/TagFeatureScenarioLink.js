Ext.define('CJ2H.model.TagFeatureScenarioLink', {
    extend: 'Ext.data.Model',
    fields: [
	{ name: 'tag' },
	{ name: 'feature', defaultValue: null },
	{ name: 'scenario', defaultValue: null }
    ]
});
