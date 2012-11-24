Ext.define('CJ2H.store.StepPie', {
    extend: 'Ext.data.JsonStore',

    autoLoad: false,

    fields: [ 'status', { name: 'step', type: 'number' } ]
});
