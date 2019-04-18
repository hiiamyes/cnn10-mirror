import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Style from "./style"
import GlobalStyle from "../components/GlobalStyle"

const IndexPage = () => (
  <StaticQuery
    query={graphql`
      query IndexPageQuery {
        api {
          transcripts {
            date
            title
            content
            url
          }
        }
      }
    `}
    render={({ api: { transcripts } }) => {
      return (
        <Style>
          <GlobalStyle />
          {transcripts.map(({ date, title, content, url }) => {
            return (
              <div className="transcript" key={date}>
                <h2>{date}</h2>
                <h2>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {title}
                  </a>
                </h2>
                <p>{content}</p>
              </div>
            )
          })}
        </Style>
      )
    }}
  />
)

export default IndexPage
