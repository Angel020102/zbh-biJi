// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '吹个泡糖',
  tagline: '没关系的，都一样',
  favicon: 'img/头像.jpg',

  // 在此处设置您网站的生产网址
  url: 'https://your-docusaurus-test-site.com',
  // 设置提供站点的 /<baseUrl>/ 路径名
  // 对于 GitHub 页面部署，通常是 '/<projectName>/'
  baseUrl: '/',

  // GitHub 页面部署配置。
  // 如果您不使用 GitHub 页面，则不需要这些。
  organizationName: 'facebook', // 通常是您的 GitHub 组织/用户名。
  projectName: 'docusaurus', // GutHub中仓库的名称
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // 即使你不使用内部化，你也可以使用这个字段来设置有用的
  // 像 html lang 这样的元数据。 例如，如果你的网站是中文的，你可能想要
  // 用“zh-Hans”替换“en”。
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // 请将此更改为您的回购协议。
          // 删除它以删除“编辑此页面”链接。
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // 替换为您项目的社交卡
      image: 'img/头像.jpg',
      navbar: {
        title: '吹个泡糖笔记',
        // logo: {
        //   alt: '图片没了',
        //   src: 'img/头像.jpg',
        // },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'right',
            label: '笔记',
          },
          {
            href: 'https://github.com/Angel020102',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
