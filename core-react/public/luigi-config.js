Luigi.setConfig({
  navigation: {
    nodes: () => [
      {
        pathSegment: "products",
        label: "Products",
        icon: "product",
        viewUrl: "http://localhost:8080/index.html",
        keepSelectedForChildren: true,
        children: [{
            pathSegment: 'detail/:id',
            viewUrl: 'http://localhost:4200/product/:id',
            loadingIndicator: {
              enabled: false
            },
        }]
      }
    ]
  },
  settings: {
    header: { title: "Luigi React App"},
    responsiveNavigation: "simpleMobileOnly",
    customTranslationImplementation: myTranslationProvider,
  },
  lifecycleHooks: {
    luigiAfterInit: () => {
      Luigi.i18n().setCurrentLocale(defaultLocale);
    },
  },
  communication: {
    customMessagesListeners: {
      "set-language": (msg) => {
        Luigi.i18n().setCurrentLocale(msg.locale);
      },
    },
  },
});


var defaultLocale = "en-US";
function myTranslationProvider() {
var dict = {
"en-US": { PRODUCTS: "Products", ORDERHISTORY: "Order History" },
};
return {
getTranslation: function (label, interpolation, locale) {
  const local = locale || Luigi.i18n().getCurrentLocale() || defaultLocale
  return (
    dict[local][label] || label
  );
},
};
}