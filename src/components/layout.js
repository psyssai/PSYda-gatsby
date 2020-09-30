import React from "react"
import Sidebar from "./sidebar/sidebar"
import Header from "./header/header"
import { Helmet } from "react-helmet"
import "./layout.css"
class Layout extends React.Component {
  state = {
    isVisible: false,
  }

  convertClickState = () => {
    this.setState({
      isVisible: !this.state.isVisible,
    })
  }

  render() {
    const { isVisible } = this.state
    const { title, children } = this.props
    return (
      <div id="wrapper">
        <Helmet>
          <link
            href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
            rel="stylesheet"
          />
        </Helmet>
        <Header title={title} convertClickState={this.convertClickState} />
        <div id="container">
          <Sidebar
            isVisible={isVisible}
            convertClickState={this.convertClickState}
          />
          <main id="main">{children}</main>
        </div>
      </div>
    )
  }
}

export default Layout
