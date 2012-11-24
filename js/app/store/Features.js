Ext.define('CJ2H.store.Features', {
    extend: 'Ext.data.Store',

    autoLoad: false,

    // et pas simplement 'Feature' sinon le loader ne trouve pas le modèle ...
    model: 'CJ2H.model.Feature'
});
