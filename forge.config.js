const path = require('path'); // Add this line to import the 'path' module
const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  packagerConfig: {
    asar: true,
    icon: path.join(process.cwd(), "icon", "./src/logo.ico"),
  },extraResource: [
    path.join(process.cwd(), "icon", "./src/logo.ico"), // Add the ICNS file as an extra resource
  ],
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        icon: './src/logo.ico' // Adjusted the icon path assuming it's relative to the project root

      }
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {icon: './src/logo.png'}, // Adjusted the icon path assuming it's relative to the project root
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {icon: './src/logo.ico'}, // Adjusted the icon path assuming it's relative to the project root
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {icon: './src/logo.ico'}, // Adjusted the icon path assuming it's relative to the project root
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: true,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
