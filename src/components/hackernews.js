import React from 'react';
import axios from 'axios';

export default class TopStories extends React.Component {
  state = {
    top20titles: [],
  }
  componentDidMount() {
    var top20ids = [];
    var top20titles = [];
    axios.get(`https://hacker-news.firebaseio.com/v0/topstories.json`)
      .then(res => {
        const topstories = res.data
        for(var i=0; i<20; i++){
            top20ids.push(topstories[i]);
            axios.get(`https://hacker-news.firebaseio.com/v0/item/${topstories[i]}.json`)
            .then(res => {
                const temp = res.data
                top20titles.push(temp.title);
            })
        }
        this.setState({ top20titles });
        });
  }

  render() {
    console.log("200", this.state.top20titles);
    return (
      <ul>
        {
          this.state.top20titles.map((top20Stories, index) =>
              <li key={index}>{top20Stories}</li>
            )
        }
      </ul>
    )
  }
}
