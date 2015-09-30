import React from 'react';

export default React.createClass({
  handleDelete: function(country) {
    this.props.onDelete(country);
  },
  render: function() {
    var countries = this.props.countries.map((country, index) => {
      return (
        <li className='remove-country btn btn-success'
            onClick={this.handleDelete.bind(this, country)}
            key={index} >
          {country}
          <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
        </li>
      );
    });

    return (
      <ul className='selected-countries col-md-8'>
        {countries}
      </ul>
    );
  }
});
