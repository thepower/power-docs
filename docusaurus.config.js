// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const themes = require('prism-react-renderer').themes;
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Power DCloud',
  tagline: 'Decentralized Web Services',
  url: 'https://doc.thepower.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'thepower',
  projectName: 'power-docs',
  themes: ['docusaurus-theme-search-typesense'],

  trailingSlash: false,

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/thepower/power-docs/tree/master/',
          remarkPlugins: [
            [require('@docusaurus/remark-plugin-npm2yarn'), {sync: true}],
          ],        
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/thepower/power-docs/tree/master/',
          remarkPlugins: [
            [require('@docusaurus/remark-plugin-npm2yarn'), {sync: true}],
          ],        
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
      navbar: {
        title: 'Power_docs',
        logo: {
          alt: 'Power DCloud',
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
            docId: 'api/common-terms',
            position: 'left',
            label: 'API',
          },
          {
          label: 'Power SDK',
          href: 'https://github.com/thepower/PowerTools/blob/master/packages/tssdk/README.md',
          position: 'right',
          },
          {
            label: 'Power Wallet',
            href: 'https://wallet.thepower.io',
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
                to: '/docs/api/common-terms',
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
              {
              label: 'DockerHub',
              href: 'https://hub.docker.com/r/thepowerio/tpnode',
              },
            ],
          },
          {
            title: 'Tools',
            items: [
              {
                label: 'Power Wallet',
                href: 'https://wallet.thepower.io',
              },
              {
                label: 'Power Hub',
                href: 'https://hub.thepower.io',
              },
              {
                label: 'Power Explorer',
                href: 'https://explorer.thepower.io',
              },
              {
              label: 'Power SDK',
              href: 'https://github.com/thepower/PowerTools/blob/master/packages/tssdk/README.md',
              },
              {
              label: 'Power CLI (TS)',
              href: 'https://github.com/thepower/PowerTools/blob/master/packages/cli/README.md',
              },
              {
              label: 'Power CLI (Erl)',
              href: 'https://github.com/thepower/tpcli',
              },
              {
              label: 'Network monitoring',
              href: 'https://zabbix.thepower.io/zabbix.php?action=dashboard.view'
              },
            ],
          },
          {
            title: 'Social',
            items: [
              {
              label: 'Discord',
              href: 'https://discord.gg/P6fxM4CCkb'
              },
              {
              label: 'Telegram Chat',
              href: 'https://t.me/thepower_chat'
              },
              {
              label: 'Twitter',
              href: 'https://twitter.com/intent/follow?screen_name=thepowerio'
              },
              {
              label: 'GitHub',
              href: 'https://github.com/thepower'
              },
              {
              label: 'Medium',
              href: 'https://medium.com/the-power-official-blog'
              },
              {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/company/thepowerio'
              },
              {
              label: 'Telegram News Channel',
              href: 'https://t.me/thepowerio'
              },
              {
              label: 'Community Page',
              href: 'https://thepower.io/community_page'
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Power DCloud`,
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

