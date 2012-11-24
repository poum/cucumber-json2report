Ext.define('CJ2H.store.ScenarioPie', {
    extend: 'Ext.data.JsonStore',

    autoLoad: false,

    fields: [ 'status', { name: 'scenario', type: 'number' } ]
});
