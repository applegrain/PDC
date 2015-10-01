import React      from 'react';
import classNames from 'classnames';

export default React.createClass({
  getInitialState: function() {
    return {inputText: '', activeListItem: null, filteredListItems: [], showDropdown: false, hoveredItem: null};
  },
  componentDidMount: function() {
    React.findDOMNode(this.refs.search).focus();
  },
  handleSearch: function(e) {
    var inputText = e.target.value;
    this.setState({showDropdown: true, inputText: inputText});

    if (inputText) {
      var pattern = inputText.toLowerCase().split(" ").map(function(el) {
        return "(" + el + ".*)"
      }).join(" ");

      var listItems = this.props.countries.filter(v => {
        return v.toLowerCase().match(new RegExp(pattern));
      });

      this.setState({filteredListItems: listItems});
    }
  },
  selectValue: function(item) {
    this.setState({showDropdown: false, inputText: item});

    this.props.onSelect(item);

    this.setState({inputText: ''});
  },
  handleKeyDown: function(e) {
    switch (e.key) {
      case 'ArrowDown':
        this.setState({activeListItem: this.incrementActiveLi()});
        break;
      case 'ArrowUp':
        this.setState({activeListItem: this.decrementActiveLi()});
        break;
      case 'Enter':
        if (this.state.activeListItem === null) { return; }

        this.setState({activeListItem: null});
        this.selectValue(this.selectActiveLi());
        break;
    }
  },
  incrementActiveLi: function() {
    return this.state.activeListItem === null ? 0 : this.state.activeListItem + 1;
  },
  decrementActiveLi: function() {
    return this.state.activeListItem === null ? 0 : this.state.activeListItem - 1;
  },
  selectActiveLi: function() {
    return this.state.filteredListItems[this.state.activeListItem];
  },
  renderDropdown: function() {
    if (!this.state.showDropdown || !this.state.inputText) {
      return null;
    }

    var listItems = this.state.filteredListItems.map((item, index) => {
      return (
        <li
          className={classNames({hoverLi: this.state.activeListItem === index})}
          onClick={this.selectValue.bind(this, item)}
          key={item}>
          {item}
        </li>
      );
    });

    return (
      <ul style={{overflow: 'auto'}}
          className='dropdown'>
        {listItems}
      </ul>
    );
  },
  render: function() {
    return (
      <div className='search-form'>
        <input
          ref='search'
          type='text'
          className='col-md-12'
          value={this.state.inputText}
          placeholder='Search for a country...'
          onChange={this.handleSearch}
          onKeyDown={this.handleKeyDown} />
        <div>
          {this.renderDropdown()}
        </div>
      </div>
    );
  },
});
