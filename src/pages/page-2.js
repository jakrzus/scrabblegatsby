import React, {Component} from 'react'
import { Link } from 'gatsby'
import '../components/loader.css'
import Layout from '../components/layout'
import SEO from '../components/seo'

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
    <Forma />
    <div class="holder">
  <div class="flip-preloader example-1">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
  </div>
  </Layout>
)


 class Forma  extends Component {
  constructor(props){
    super(props);
    this.state={
      ticked: false
    }
    this.handleClick = this.handleClick.bind(this)
  }
  render() {
    return (
      <div>
        <p>to zawsze</p>
        {this.state.ticked && <p>to tylko jak dostanie</p>}
        
      </div>
    )
  }
handleClick() {
  this.state.ticked ? 
  this.setState({ticked: false}) :
    this.setState({ticked: true})
  }
}




export default SecondPage
