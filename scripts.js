var data = d3.json("classData.json")

data.then(function(data){drawChart(data);})

var drawChart = function(data)
{
  console.log("Data:", data)
  var screen = {height: 500, width: 500}
  var margins = {top:10,bottom:10,left:10,right:10}

  var width = screen.width - margins.left - margins.right
    var height = screen.height - margins.top - margins.bottom

 var svg = d3.select("svg")
                  .attr("height",screen.height)
                  .attr("width",screen.width)
                  .on("click", function(){
                      var active = area.active ? false: true,
                      newOpacity = active ? 0:1;
                      d3.select(".area").style("opacity", newOpacity);
                      area.active=active;
                  })

  var xScale = d3.scaleLinear()
                 .domain([0, data.length])
                 .range([0,width]);

  var yScale = d3.scaleLinear()
                 .domain([0,d3.max(data)])
                 .range([height,0]);

           svg.selectAll("circle")
           .data(data)
           .enter()
           .append("circle")
           .attr("cy", function(d){return yScale(d) + 5;})
           .attr("cx", function(d,i){return xScale(i) + 30;})
           .attr("r", 2);

           var area = d3.area()
                        .x(function(d,i){return xScale(i) + 30;})
                        .y0(function(d){return yScale(d) + 5;})
                        .y1(function(d,i){return yScale(0);})
                        //.curve(d3.curveCatmullRom);

                        svg.append("path")
                         .datum(data)
                         .attr("class", "area")
                         .attr("d", area)
                         .classed("hidden", true)

    var line = d3.line()
                 .x(function(d,i){return xScale(i) + 30;})
                 .y(function(d){return yScale(d)+ 5;})
                 //.curve(d3.curveCatmullRom)

                 svg.append("path")
                 .datum(data)
                 .attr("class", "line")
                 .attr("d", line)
                 .attr("fill", "none")
                 .attr("stroke", "black")



                 var yAxis = d3.axisLeft(yScale)
         .ticks(9)
         .tickSize(10)
svg.append("g").classed("yAxis",true)
.call(yAxis)
.attr('transform', 'translate(' + (margins.left +10)+ ','+(margins.top + 1)+')');

var xAxis = d3.axisBottom(xScale)
    .ticks(data.length)
    .tickFormat(function(d,i){
      console.log(d, "i", i);

    })
    .tickSize(1)
    svg.append("g").classed("xAxis",true)
    .call(xAxis)
    .attr('transform', 'translate(' + (margins.left + 10)+ ','+(height - margins.top+5)+')');
}
