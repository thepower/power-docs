// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const config = {
  title: 'Power Ecosystem',
  tagline: 'WEB3 Decentralized Framework',
  url: 'https://doc.thepower.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'thepower',
  projectName: 'power-docs',
  themes: ['docusaurus-theme-search-typesense'],

  presets: [
    [
      'classic',
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/thepower/power-docs/tree/master/',
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/thepower/power-docs/tree/master/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    ({
      navbar: {
        title: 'Power_docs',
        logo: {
          alt: 'Power Ecosystem',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'about',
            position: 'left',
            label: 'Docs',
          },
          {
            type: 'doc',
            docId: 'Build/api/common-terms',
            position: 'left',
            label: 'API',
          },
          {
            label: 'Power_hub',
            href: 'https://hub.thepower.io',
            position: 'right',
          },
          {
            label: 'Power_explorer',
            href: 'https://explorer.thepower.io',
            position: 'right',
          },
          {
            label: 'Power_faucet',
            href: 'https://faucet.thepower.io',
            position: 'right',
          },
          {
            href: 'https://github.com/thepower',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'API',
                to: '/docs/Build/api/common-terms',
              },
              {
                label: 'Technology',
                to: '/docs/Explore/technology/abstract',
              },
              {
                label: 'About',
                to: '/docs/about',
              },
              {
                label: 'Website',
                href: 'https://thepower.io',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/thepower',
              },
            ],
          },
          {
            title: 'Tools',
            items: [
              {
                label: 'Power_hub',
                href: 'https://hub.thepower.io',
              },
              {
                label: 'Power_explorer',
                href: 'https://explorer.thepower.io',
              },
              {
                label: 'Power_faucet',
                href: 'https://faucet.thepower.io',
              },
            ],
          },
          {
            title: 'SDK',
            items: [
              {
                label: 'JavaScript',
                href: 'https://github.com/thepower/tp_sdk_js',
              },
              {
                label: 'Rust',
                href: 'https://github.com/thepower/tp_rust_lib',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Power Ecosystem`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      typesense: {
        typesenseCollectionName: 'power_doc',

        typesenseServerConfig: {
          nodes: [
            {
              host: 'search.thepower.io',
              port: 443,
              protocol: 'https',
            },
          ],
          apiKey: 'r5kZbUv7QOQaCBJPPy2beA9GHgLda3bw',
        },

        typesenseSearchParameters: {},

        contextualSearch: true,
      },
    }),
};

module.exports = config;

