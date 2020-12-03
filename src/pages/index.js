import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  const { title, images } = data.workItem
  return (
    <Layout>
      <SEO title="Home" />
      <h1>{title}</h1>

      <ul>
        {images.map(({ title, alt, file }) => (
          <li key={title}>
            <article>
            <h2>{title}</h2>
            <pre style={{ whiteSpace: 'pre-line', fontSize: '1.25rem' }}>
              title: {title}, {'\n'}
              alt: {alt}, {'\n'}
              src: {file.childImageSharp.fixed.src}
            </pre>
            <img src={file.childImageSharp.fixed.src} alt={alt} />
            </article>
          </li>
        ))}
      </ul>

      <Link to="/page-2/">Go to page 2</Link> <br />
      <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query IndexPage {
    workItem {
      title
      images {
        title
        alt
        file {
          childImageSharp {
            fixed {
              src
            }
          }
        }
      }
    }
  }
`