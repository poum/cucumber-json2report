/*
Copyright 2012 Philippe Poumaroux

This file is part of cucumber-json2report.

cucumber-json2report is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
Ext.define('CJ2H.controller.Features', {
  extend: 'Ext.app.Controller', 

  stores: ['Features', 'StepPie', 'ScenarioPie', 'ScenarioTree'],
  views: ['Features.Grid', 'Features.Pie', 'Features.Window'],
  refs: [
    { ref: 'btnAllFeatures', selector: 'button[action=allFeatures]' },
    { ref: 'btnSaveCharts',  selector: 'button[action=saveCharts]' },
    { ref: 'stepChart',      selector: 'FeaturesPie:first' },
    { ref: 'scenarioChart',  selector: 'FeaturesPie:last' },
    { ref: 'FeaturesGrid',   selector: 'FeaturesGrid' },
    { ref: 'EmbedTreeGrid',  selector: 'FeatureEmbeddingWindow treepanel' },
    { ref: 'EmbedImg',       selector: 'image' }
  ],

  config: {
    page: null,
    viewWin: null,
    scenario: null
  },

  init: function(config) {

    this.setPage(config.page);
    var msg = config.page.getMsg();
    var stepColorSet = [ '#93AD09', '#105EA5', '#A5101F', '#FD8708' ];
    var scenarioColorSet = [ stepColorSet[0], stepColorSet[2] ];

    var graphs = Ext.create('Ext.panel.Panel', {
      renderTo: 'graph',
      layout: { type: 'hbox', align: 'center', pack: 'center' },
      height: 450,
      width: 960,
      title: msg.featuresCharts,
      collapsible: true,
      items: [
        { xtype: 'FeaturesPie', store: this.getStepPieStore(),     
          config: { 
            msg: msg, 
            field: 'step', 
            donut: 35, 
            colorSet: stepColorSet, 
            renderer: this.stepPieLabelRenderer 
          } 
        }, 
        { xtype: 'FeaturesPie', store: this.getScenarioPieStore(), 
          config: { 
            msg: msg, 
            field: 'scenario', 
            colorSet: scenarioColorSet, 
            renderer: this.scenarioPieLabelRenderer 
          } 
        } 
      ],
      tbar: [
        '->', {
          tooltip: msg.saveChartsDesc,
          action: 'saveCharts',
          iconCls: 'saveCharts'
        }
      ]
    });

    // add graph titles
    Ext.Array.forEach(['steps', 'scenarios'], function(graph, index) {
      Ext.create('Ext.draw.Sprite', {
        type: 'text',
        surface: graphs.items.items[index].surface,
        text: msg[graph],
        font: '30px Arial',
        x: 1,
        y: 15 
      }).show(true);  
    });

    Ext.create('Ext.panel.Panel', {
      renderTo: 'gridPanel',
      layout: 'fit',
      height: 300,
      title: msg.featureList,
      collapsible: true,
      items: [ 
        { xtype: 'FeaturesGrid', store: this.getFeaturesStore(), config: { msg: msg } }, 
      ],
      tbar: [
        '->', 
        {
          tooltip: msg.allFeaturesDesc,
          action: 'allFeatures',
          iconCls: 'allFeatures',
          disabled: true
        }
      ]
    });

    this.control({
      'FeaturesGrid': {
        itemclick: this.toggleDisplaySingleFeature,
      },
      'button[action=allFeatures]': {
        click: this.toggleDisplaySingleFeature,
      },
      'button[action=saveCharts]': {
        click: this.saveChartDialog,
      },
      'button[action=viewEmbedding]': {
        click: this.viewEmbedding
      },
      'treepanel': {
        itemclick: this.displayEmbedding
      }
    });

  },

  toggleDisplaySingleFeature: function(grid, record) {

    // not grid.getStore to allow button 'all features' to call this method
    var store = Ext.getStore('Features');

    if (store.isFiltered()) {
      store.clearFilter();
      this.getPage().setTitles('Features');
      this.getBtnAllFeatures().disable();
      this.clearFeatureListing();
    }
    else {
      //assert: called only from grid (record needed)
      store.filter([{ property: "id", value: record.getId(), exactMatch: true }]);
      this.getPage().setTitles('Features', record.get('name'));
      this.getBtnAllFeatures().enable();
      this.displayFeatureListing(record);
    }

    this.loadPies();

    if (record) {
      //assert: should always have grid if we have record ...
      grid.deselect(record);
    }
  },

  loadPies: function() {
    var msg = this.getPage().getMsg();
    var store = Ext.getStore('Features');

    this.getStepPieStore().loadData([
      { status: msg.stepPassed,   step: store.sum('stepPassedNumber') },
      { status: msg.stepSkipped,  step: store.sum('stepSkippedNumber') },
      { status: msg.stepFailed,   step: store.sum('stepFailedNumber') },
      { status: msg.stepPending,  step: store.sum('stepPendingNumber') }
    ]);
    this.getScenarioPieStore().loadData([
      { status: msg.scenarioPassed,  scenario: store.sum('scenarioPassedNumber') },
      { status: msg.scenarioFailed,  scenario: store.sum('scenarioFailedNumber') },
    ]);
  },

  refreshGridSummary: function() {
    //getFeaturesGrid returns Panel and we need view in order
    //to have the correct summary after data just loaded
    this.getFeaturesGrid().getView().refresh();
  },

  displayFeatureListing: function(feature) {
    feature.printListing(this.getPage().getMsg());
  },

  clearFeatureListing: function() {
    Ext.fly('listing').setHTML('');
  },

  displayEmbedding: function(grid, record) {
    if (record.isLeaf()) {
      var embed = Ext.getStore('Embeddings').findRecord('id', record.get('embedId'), 0, false, false, true);
      this.getEmbedImg().setSrc(embed.getSrc());
    }
  },

  viewEmbedding: function(button) {

    // button.data = step id
    var store = Ext.getStore('Embeddings');
    store.filter([{ property: 'step', value: button.data, exactMatch: true }]);
    var embed = store.getAt(0);
    store.clearFilter();

    // need exact match (last 'true')
    var step = Ext.getStore('Steps').findRecord('id', button.data, 0, false, false, true);
    var scenario = Ext.getStore('Scenarios').findRecord('id', step.get('scenario'), 0, false, false, true);
    var rootNode;
    if (this.scenario === null || this.scenario.get('id') !== scenario.get('id')) {
      this.scenario = scenario;
      rootNode = Ext.getStore('ScenarioTree').setRootNode({ text: 'Root', expanded: true});
      rootNode.data.leaf = false;
      scenario.attach(rootNode);
    }
    else {
      rootNode = this.getEmbedTreeGrid().getStore().getRootNode();
    }

    if (! this.getViewWin()) {
      this.setViewWin(Ext.create('CJ2H.view.Features.Window', { 
        title: scenario.get('name'), 
        iconCls: 'window_' + scenario.get('status'),
        animateTarget: button,
        config: { src: embed.getSrc(), msg: this.getPage().getMsg() }
      }));
    }
    else {
      this.getViewWin().setTitle(step.get('name'));
      this.getViewWin().setIconCls('window_' + step.get('status'));
      this.getViewWin().animateTarget = button;
      this.getEmbedImg().setSrc(embed.getSrc());
    };

    this.getViewWin().show();
    
    // treegrid have to be visible before to this:
    // we search the row index for the first embed for
    // the matching step 
    var rowCpt = 0;
    var found = false;
    var scenarioNode = rootNode.firstChild; 
    scenarioNode.eachChild(function(stepNode) { 
      if (! found) {
        rowCpt ++;
        if (stepNode.get('stepId') == button.data) {
          rowCpt ++;
          found = true;
        }
        else {
          rowCpt += stepNode.childNodes.length
        }
      } 
    });
    this.getEmbedTreeGrid().getView().select(rowCpt);
  },

  saveChartDialog: function(button) {
    var msg = this.getPage().getMsg();
    button.disable();

    Ext.MessageBox.show({
      title: msg.saveChartsWindowTitle,
      msg:   msg.saveChartsWindowMsg,
      buttons: Ext.MessageBox.YESNOCANCEL,
      buttonText: {
        yes: msg.steps,
        no: msg.scenarios
      },
      icon: Ext.MessageBox.QUESTION,
      animateTarget: button,
      fn: this.saveChart,
      scope: this
    });
  },

  saveChart: function(button) {

    if ("cancel" !== button) {
      var graphique = ("yes" === button) ? this.getStepChart() : this.getScenarioChart();
      // works only on Internet. TODO: error handling
      graphique.save({type: 'image/png'});
    }

    this.getBtnSaveCharts().enable();
  },

  // hack to not display pie label when value is 0
  // No use of "this" because theses functions will be called from view and not from here
  // and we have no ref to the view itself (this = window ;-( )
  stepPieLabelRenderer: function(v) {
    var record = Ext.getStore('StepPie').findRecord('status', v);
    return (record && record.get('step') > 0) ? v : '';
  },

  scenarioPieLabelRenderer: function(v) {
    var record = Ext.getStore('ScenarioPie').findRecord('status', v);
    return (record && record.get('scenario') > 0) ? v : '';
  },
});
