import React, { Component } from "react";
import BooksDisplay from "./BooksDisplay"
import '../styles/Homepage.scss';
import '../styles/reset.scss';

class Homepage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      booksData: [],
      filterBooksData: [],
      isLoaded: false,
      searchInput: ''
    }
  }

  componentDidMount() {
    fetch('https://bookshelf.goodideas-studio.com/api')
      .then(response => response.json())
      .then(data => {
        this.setState({
          isLoaded: true,
          booksData: data.list,
          filterBooksData: data.list,
        })
      })
      .catch(error => console.log('Opps', error))
  }

  updateInput() {
    this.setState({
      searchInput: event.target.value
    })
  }

  filterData() {
    let filterBooksData = this.state.booksData.filter((book) => {
      return book.name.match(this.state.searchInput.replace(/\s+/g, ""))
    })
    if (filterBooksData.length === 0) {
      this.setState({
        filterBooksData: ['查無資料']
      })
    } else {
      this.setState({
        filterBooksData: filterBooksData
      })
    };
  };

  render() {
    const { booksData, filterBooksData, searchInput } = this.state;
    return (

      <div>
        <div className="header">
          <div className="header-text">
            <span>天瓏書局</span>
            <span>書籍查詢</span>
          </div>
        </div>
        <div className="search-container">
          <input className="search-bar" placeholder="請輸入書名" onBlur={() => this.updateInput()}></input>
          <button onClick={() => this.filterData()}>搜尋</button>
        </div>
        <BooksDisplay BooksData={this.state.filterBooksData} keyword={this.state.searchInput} />
      </div>
    );
  }
}

export default Homepage;