// module.exports = (phase, {defaultConfig}) => {
//     if ('sassOptions' in defaultConfig) {
//         defaultConfig['sassOptions'] = {
//             includePaths: ['./src'],
//             prependData: `@import "/styles/sass/abstracts/_placeholders.scss";`,
//         }
//     }
//     return defaultConfig;
// }

module.exports = {
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/",
        permanent: true,
      },
    ];
  },
};
