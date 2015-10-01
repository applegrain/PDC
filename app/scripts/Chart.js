import React         from 'react';
import ChartOptions  from './constants/ChartOptions';
import IfMissingData from './functions/IfMissingData';
import NanTruncated  from './functions/NanTruncated';
import Chart         from 'c3-react';

export default React.createClass({
  render: function() {
    var values = this.props.values;
    var trimmedCountries = values.map(function(country) { return {key: country.key, values: NanTruncated(country.values)} });

    var dataPoints = this.props.values.length ? trimmedCountries : [{}]

    return (
      <div className='chart pull-left' key='chart'>
        <div className='query-msg'>
          <h5 className='details'>{this.props.details}
          <small>Modify your query by adding countries and selecting from the options in green.</small></h5>
        </div>
        {IfMissingData(trimmedCountries)}

        <Chart data={dataPoints} type='lineBar' options={ChartOptions} />
      </div>
    );
  },
});
