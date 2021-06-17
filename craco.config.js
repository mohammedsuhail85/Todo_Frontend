const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#35DF90",
              "@body-background": "#fff",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};