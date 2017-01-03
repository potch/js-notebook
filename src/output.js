function plotEnsure() {
  return new Promise(function (resolve) {
    require.ensure(['d3'], resolve);
  });
}

exports.plotBars = function plotBars(values) {

  var container = document.createElement('div');
  container.classList.add('plot-container');
  var plot = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  plot.classList.add('plot');
  container.appendChild(plot);

  plotEnsure().then(function () {
    var d3 = require('d3');

    var WID = 960;
    var HGT = 540;
    var svg = d3.select(plot);

    var margin = {top: 20, right: 20, bottom: 30, left: 40};
    svg.attr('viewBox', '0 0 ' + WID + ' ' + HGT);
    svg.style('width', '100%');
    svg.style('height', '400px');
    var width = WID - margin.left - margin.right;
    var height = HGT - margin.top - margin.bottom;
    var data = values;

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    var y = d3.scaleLinear().rangeRound([height, 0]);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(data.map(function (d, i) { return i; }));
    y.domain([0, d3.max(data, function(d) { return d; })]);

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10))
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Frequency");

    g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .style("fill", "steelblue")
        .attr("x", function(d, i) { return x(i); })
        .attr("y", function(d) { return y(d); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d); });
  });

  return container;
}

exports.plotLine = function plotLine() {

  var container = document.createElement('div');
  container.classList.add('plot-container');
  var plot = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  plot.classList.add('plot');
  container.appendChild(plot);

  plotEnsure().then(function () {

    var svg = d3.select(plot);
    var margin = {top: 20, right: 20, bottom: 30, left: 50};
    var width = +svg.attr("width") - margin.left - margin.right;
    var height = +svg.attr("height") - margin.top - margin.bottom;
    var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear().rangeRound([0, width]);

    var y = d3.scaleLinear().rangeRound([height, 0]);

    x.domain(data.map(function (d, i) { return i; }));
    y.domain([0, d3.max(data, function(d) { return d; })]);

    var line = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.close); });


      x.domain(d3.extent(data, function(d) { return d.date; }));
      y.domain(d3.extent(data, function(d) { return d.close; }));

      g.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

      g.append("g")
          .attr("class", "axis axis--y")
          .call(d3.axisLeft(y))
        .append("text")
          .attr("fill", "#000")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", "0.71em")
          .style("text-anchor", "end")
          .text("Price ($)");

      g.append("path")
          .datum(data)
          .attr("class", "line")
          .attr("d", line);
  });

}
