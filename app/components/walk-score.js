import Ember from 'ember';

export default Ember.Component.extend({
  walk: Ember.computed(function() {
    var url = 'http://api.walkscore.com/score?format=json&lat=' + this.latLong[0] + '&lon=' + this.latLong[1] + '&wsapikey=b54d7a1a14b06657d6ecd2bc9fe8f2ed';
    return Ember.$.getJSON(url).then(function(responseJSON) {
      $("#walkScore").text(responseJSON.walkscore);
      $("#walkDescription").text(responseJSON.description);
    });
  }),
  transit: Ember.computed(function() {
    var url = 'http://transit.walkscore.com/transit/score/?lat=' + this.latLong[0] + '&lon=' + this.latLong[1] + '&city=Portland&state=OR&wsapikey=b54d7a1a14b06657d6ecd2bc9fe8f2ed';
    return Ember.$.getJSON(url).then(function(responseJSON) {
      $("#transitScore").text(responseJSON.transit_score);
      $("#transitDescription").text(responseJSON.description);
      $("#transitSummary").text(responseJSON.summary);
    });
  }),
  stolen: Ember.computed(function() {
    var url = 'https://bikeindex.org:443/api/v3/search/count?location='+ this.latLong[0] + '%2C' + this.latLong[1] +'&distance=1&stolenness=proximity';
    return Ember.$.getJSON(url).then(function(responseJSON) {
      $("#stolen").text(responseJSON.proximity);
    });
  }),
  census: Ember.computed(function() {
    var url = 'https://geocoding.geo.census.gov/geocoder/geographies/coordinates?x='+ this.latLong[1] + '&y=' + this.latLong[0] +'&benchmark=Public_AR_Census2010&vintage=Census2010_Census2010&layers=14&format=json';
    return Ember.$.getJSON(url).then(function(responseJSON) {
      //console.log(responseJSON.result.geographies["Census Blocks"]["0"].TRACT);
      var tract = responseJSON.result.geographies["Census Blocks"]["0"].TRACT;
      var url2 = 'http://api.census.gov/data/2016/pdb/tract?get=Tot_Population_CEN_2010,pct_Females_ACS_10_14,pct_Males_ACS_10_14,pct_College_ACS_10_14,Med_HHD_Inc_ACS_10_14,Prs_Blw_Pov_Lev_ACS_10_14&for=tract:' + tract + '&in=state:41+county:051&key=d90ad8655f9cb4d3ee0909e5831a4989a51a22ab';
     //console.log(tract);
     return Ember.$.getJSON(url2).then(function(responseJSON){
       console.log(responseJSON);
       $("#population").append(responseJSON[1][0]);
       $("#females").append(parseFloat(responseJSON[1][1]).toFixed(2));
       $("#males").append(parseFloat(responseJSON[1][2]).toFixed(2));
       $("#college").append(parseFloat(responseJSON[1][3]).toFixed(2));
       $("#median").append(responseJSON[1][4]);
       $("#poverty").append(responseJSON[1][5]);
      });
    });
  }),
});
