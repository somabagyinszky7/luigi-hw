sap.ui.define(["com/myorg/mfe2/controller/BaseController"], function (Controller) {
  "use strict";

  return Controller.extend("luigi.ui5.controller.Main", {
      onInit: function (Controller) {
          const oModel = new sap.ui.model.json.JSONModel();

          oModel.loadData("../model/products.json");
          this.getView().setModel(oModel);
      },

      onListItemPress: function (oEvent) {
          const id = oEvent.getSource().getBindingContext().getProperty("id");

          LuigiClient.linkManager().openAsModal('/home/products/' + id, { title: 'Product Detail', size: 'm' });
      }
  });
});
