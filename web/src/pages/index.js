import React, { useState } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Button } from 'antd';
import Style from './style';
import GlobalStyle from '../components/GlobalStyle';
import 'antd/dist/antd.css';

const IndexPage = () => {
  const [fontSize, setFontSize] = useState(14);
  return (
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
      render={({ api: { transcripts } }) => (
        <Style>
          <GlobalStyle fontSize={fontSize} />
          <div className="font-size-buttons">
            <Button
              type="primary"
              shape="circle"
              icon="minus"
              size="large"
              onClick={() => setFontSize(fontSize - 2)}
            />
            <Button
              type="primary"
              shape="circle"
              icon="plus"
              size="large"
              onClick={() => setFontSize(fontSize + 2)}
            />
          </div>
          {transcripts.map(({
            date, title, content, url,
          }) => (
            <div className="transcript" key={date}>
              <h2>{date}</h2>
              <h2>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {title}
                </a>
              </h2>
              <p>{content}</p>
            </div>
          ))}
        </Style>
      )}
    />
  );
};

export default IndexPage;
