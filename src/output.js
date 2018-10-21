function plotEnsure() {
  return new Promise(function (resolve) {
    require.ensure(['d3'], resolve);
  });
}

function identity(v) {
  return v;
}

exports.plotBars = function plotBars(data) {

  var container = document.createElement('div');
  container.classList.add('plot-container');
  var plot = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  plot.classList.add('plot');
  container.appendChild(plot);

  plotEnsure().then(function () {
    var d3 = require('d3');

    var WID = container.offsetWidth;
    var HGT = WID / 2;
    var svg = d3.select(plot);

    var margin = {top: 20, right: 20, bottom: 30, left: 40};
    svg.attr('viewBox', '0 0 ' + WID + ' ' + HGT);
    svg.style('width', WID);
    svg.style('height', HGT);
    var width = WID - margin.left - margin.right;
    var height = HGT - margin.top - margin.bottom;

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    var y = d3.scaleLinear().rangeRound([height, 0]);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(data.map(function (d) { return d[0] }));
    y.domain([0, d3.max(data, function (d) { return d[1] })]);

    console.log('plotty plot');

    console.log(d3.max(data, function (d) { return d[1] }));

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
        .attr("x", function(d) { return x(d[0]); })
        .attr("y", function(d) { return y(d[1]); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d[1]); });
  }).catch(e => console.error(e));

  return container;
}

exports.plotLine = function plotLine(values) {

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
    svg.style('height', '30vh');
    var width = WID - margin.left - margin.right;
    var height = HGT - margin.top - margin.bottom;
    var data = values;

    var g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear().rangeRound([0, width]);

    var y = d3.scaleLinear().rangeRound([height, 0]);

    x.domain([0, data,length]);
    y.domain([
      0,
      d3.max(data, identity)
    ]);

    var line = d3.line()
      .x(function (d, i) { return x(i); })
      .y(function (d) { return y(d); });

    x.domain(d3.extent(data, function(_, i) { return i; }));
    y.domain(d3.extent(data, identity));

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
      .style("text-anchor", "end");

    g.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "#000")
      .attr("d", line);
  });

  return container;
}
