Ext.define('CJ2H.model.Tag', {
    extend: 'CJ2H.model.Model',
    fields: [
	{ name: 'id' },
	{ name: 'name', type: 'string' },
	{ name: 'featureNumber', type: 'int', defaultValue: 0 },
	{ name: 'featurePassedNumber', type: 'int', defaultValue: 0 },
	{ name: 'featureFailedNumber', type: 'int', defaultValue: 0 },
	{ name: 'scenarioNumber', type: 'int', defaultValue: 0 },
	{ name: 'scenarioPassedNumber', type: 'int', defaultValue: 0 },
	{ name: 'scenarioFailedNumber', type: 'int', defaultValue: 0 },
	{ name: 'stepNumber', type: 'int', defaultValue: 0 },
	{ name: 'stepPassedNumber', type: 'int', defaultValue: 0 },
	{ name: 'stepFailedNumber', type: 'int', defaultValue: 0 },
	{ name: 'stepSkippedNumber', type: 'int', defaultValue: 0 },
	{ name: 'stepPendingNumber', type: 'int', defaultValue: 0 },
	{ name: 'duration', type: 'float', defaultValue: 0},
	{ name: 'status', type: 'string', defaultValue: 'passed' }
    ],

    getListing: function() {
	return Ext.String.format('<li>{0}</li>', this.get('name'));
    }
});
