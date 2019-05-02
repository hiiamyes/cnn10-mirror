module.exports = {
  pathPrefix: "/cnn10-transcript-mirror",
  siteMetadata: {
    title: `CNN 10 Transcript Mirror`,
    description: `CNN 10 Transcript Mirror`,
    author: `@hiiamyes`,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `CNN 10 Transaction Mirror`,
        short_name: `CNN10.T.M.`,
        start_url: `/cnn10-transcript-mirror`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,

    // Simple config, passing URL
    {
      resolve: "gatsby-source-graphql",
      options: {
        // This type will contain remote schema Query type
        typeName: "API",
        // This is field under which it's accessible
        fieldName: "api",
        // Url to query from
        url: "http://localhost:4000",
        // refetch interval in seconds
        refetchInterval: 60,
      },
    },
  ],
}
