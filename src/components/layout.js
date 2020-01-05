import React from "react"
import Sidebar from "./sidebar/sidebar"
import Header from "./header/header"
import { Helmet } from "react-helmet"
import "./layout.css"
class Layout extends React.Component {
  render() {
    const { title, children } = this.props
    return (
      <div id="wrapper">
        <Helmet>
          <link
            href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
            rel="stylesheet"
          />
        </Helmet>
        <Header title={title} />
        <div id="container">
          <Sidebar />
          <main id="main">{children}</main>
        </div>
      </div>
    )
  }
}

export default Layout
