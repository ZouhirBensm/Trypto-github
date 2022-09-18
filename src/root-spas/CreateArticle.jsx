// import React from 'react';
import '../style/reactDivMobile.css'

import { Link, BrowserRouter, Route, Switch } from 'react-router-dom';
import ScrollToTop from '../generic-components/ScrollToTop'
import CATEGORY from '../../full-stack-libs/Types/ArticleCategories';


class CreateArticle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.clickCreateArticle = this.clickCreateArticle.bind(this)
  }

  componentDidMount(){
    this.buildCategorySelect()
  }
  
  buildCategorySelect(){
    let selectCategory = document.getElementById("category-select")
    // console.log("categories?", CATEGORY, selectCategory)
    for (const key in CATEGORY) {
      if (Object.hasOwnProperty.call(CATEGORY, key)) {
        const category_element = CATEGORY[key];
        // console.log(category_element)
        let newOption = document.createElement("option")
        newOption.setAttribute("value", category_element);
        newOption.innerHTML = category_element
        selectCategory.appendChild(newOption)
      }
    }
    selectCategory.value = CATEGORY.BITCOIN
  }

  async clickCreateArticle(e) {
    e.preventDefault()
    console.log("Creating an article...")

    console.log("title:", document.getElementById("form_id").elements["title"].value)
    console.log("content:", document.getElementById("form_id").elements["content"].value)
    console.log("category:", document.getElementById("form_id").elements["category"].value)

    console.log("posting to: ", `/operations/create-article`)

    let response = await fetch(`/operations/create-article`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        title: document.getElementById("form_id").elements["title"].value,
        content: document.getElementById("form_id").elements["content"].value,
        category: document.getElementById("form_id").elements["category"].value
      })
    })

    console.log("response: ", response)

    switch (response.status) {
      case 200:
        console.log("pop up that you have successfully created an article")
        break;
      case 500:
        console.log("pop up that you have a server internal error")
        break;
      default:
        console.log("pop up that you have a status that is not 200 nor 500")
        break;
    }

  }

    render() {
      

      return (
        <React.Fragment>

          <div className="create-article-container">
            <form className="form" id="form_id">
              <h3>Creating an article...</h3>

              <label htmlFor="crypto-select">Select Category</label>
              <select name="category" id="category-select" required>
                  {/* <option value="Bitcoin" defaultValue>Bitcoin</option>
                  <option value="Ethereum">Ethereum</option>
                  <option value="Litecoin">Litecoin</option>
                  <option value="Bitcoin Cash">Bitcoin Cash</option>
                  <option value="Zcash">Zcash</option>
                  <option value="Monero">Monero</option> */}
              </select> 
              <label htmlFor="title-id">Title</label>
              {/* placeholder */}
              <input type="text" name='title' id='title-id' required />
              <label htmlFor="content-id">Content</label>
              <textarea name="content" id="content-id" cols="30" rows="5" required></textarea>
              <button type='submit' onClick={(e) => { this.clickCreateArticle(e) }}>Create Article</button>
            </form>
          </div>

          <a href="/operations/articles-dashboard">Back</a>

        </React.Fragment>
      )
    }
  }

  const element = <CreateArticle />;

ReactDOM.render(element, document.getElementById('react-div'));

export default CreateArticle