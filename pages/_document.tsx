import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';
import { createGlobalStyle, ServerStyleSheet } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-size: 14px;
  }

  body,
  .ant-input,
  .ant-tag,
  .ant-checkbox-wrapper,
  .ant-timeline {
    font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
              DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace,
              serif;
  }
`;

export default class MyDocument extends Document {
  public static async getInitialProps(ctx: any) {
    const sheet = new ServerStyleSheet();

    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
      originalRenderPage({
        // @ts-ignore
        enhanceApp: App => props =>
          sheet.collectStyles(
            <React.Fragment>
              <App {...props} />
              <GlobalStyle />
            </React.Fragment>,
          ),
      });

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      // @ts-ignore
      styles: [...initialProps.styles, ...sheet.getStyleElement()],
    };
  }

  public render() {
    return (
      <html>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
