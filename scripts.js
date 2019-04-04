var data = d3.json("classData.json")

data.then(function(data){
  drawChart(data);
})

var drawChart = function(data)
{

  var screen = {height: 600, width: 800}
  var margins = {top:10,bottom:10,left:10,right:10}

  var width = screen.width - margins.left - margins.right
    var height = screen.height - margins.top - margins.bottom



     var color = d3.scaleOrdinal(d3.schemeCategory10)

 var svg = d3.select("svg")
                  .attr("height",screen.height)
                  .attr("width",screen.width)
                  // .on("click", function(){
                  //       var active = area.active ? false: true,
                  //     newOpacity = active ? 0:1;
                  //     d3.select(".area").style("opacity", newOpacity);
                  //     area.active=active;
                  // })

  var xScale = d3.scaleLinear()
                 .domain([0, 40])
                 .range([0,width]);

  var yScale = d3.scaleLinear()
                 .domain([0,1])
                 .range([height,0]);

           // svg.selectAll("circle")
           // .data(data)
           // .enter()
           // .append("circle")
           // .attr("cy", function(d){return yScale(d) + 5;})
           // .attr("cx", function(d,i){return xScale(i) + 30;})
           // .attr("r", 2);

           // var area = d3.area()
           //              .x(function(d,i){return xScale(i) + 30;})
           //              .y0(function(d){return yScale(d) + 5;})
           //              .y1(function(d,i){return yScale(0);})
           //              //.curve(d3.curveCatmullRom);
           //
           //              svg.append("path")
           //               .datum(data)
           //               .attr("class", "area")
           //               .attr("d", area)
           //               .classed("hidden", true)

    var line = d3.line()
                 .x(function(d,i){return xScale(i) + 30;})
                 .y(function(d){return yScale(d)+ 5;})
                 //.curve(d3.curveCatmullRom)

                 // svg.append("path")
                 // .datum(data[0].homework[0].grade)
                 // .attr("class", "line")
                 // .attr("d", line)
                 // .attr("fill", "none")
                 // .attr("stroke", "black");

                 var eachDayCalc = function(data, day){
                   if (day == 40) {
                     var grade = data.final[0].grade / data.final[0].max;
                   }
                   else if (day < 14) {
                     var grade = data.quizes[day].grade / data.quizes[day].max;
                   }
                   else if (day == 29) {
                     var grade = data.test[1].grade / data.test[1].max;
                   }
                   else if (day == 14) {
                     var grade = data.test[0].grade / data.test[0].max;
                   }
                   else if (day > 14 && day < 29) {
                     var grade = data.quizes[day - 1].grade / data.quizes[day - 1].max;
                   }
                   else if (day > 29 && day < 40) {
                     var grade = data.quizes[day - 2].grade / data.quizes[day - 2].max;
                   }

                   return grade
                 }

                 var compute = function(data){
                   var gradeData = [] //new array to hold data

                   for (i = 0; i <= 41; i++){
                     gradeData.push(eachDayCalc(data, i))
                   }
                   return gradeData;

                 }
                 data.forEach(function(d,i){
                    var penguinInfo = compute(d);

                  //  var penguinBegin =d.picture.replace("-300px.png","");
                    var penguinName = d.picture



                    svg.append("path")
                       .datum(penguinInfo)
                       .attr("class", "line")
                       .attr("class","penguin" + i)
                       //.attr("class", "liners")
                       .attr("d", line)
                       .attr("fill", "none")
                       .attr("stroke", color)
                       .attr("stroke-width", "8")
                       .classed("hidden",true);
                       console.log(penguinName)

                       //.classed("hidden", true)
                     });


              data.forEach(function(d, i){
                var num = i
                var body = d3.select("body")
                var penguinPic = "penguinPics/" + d.picture;
                var buttons = body.append("button")
                        .attr("height", "75")
                        .attr("width", "75")
                        .attr("align", "left")
                        .append("img")
                        .attr("src",penguinPic)
                        //.attr("class", penguinPic)
                        .attr("height", "75")
                        .attr("width", "75")
                        .on("click", function(d, num){
                          console.log(penguinPic+ " was clicked")
                        //  var penguinBegin =d.picture.replace("-300px.png","");
                        //  var penguinName = "." + penguinBegin
                        penguinPic = penguinPic.replace("penguinPics/", "")
                        var newPeng = "." +"penguin" + i
                        d3.select(newPeng).classed("hidden",false);

                          // var clicked = d3.select("." + penguinPic)
                          //                   .attr("opacity", ".2")
                          // console.log(clicked, " selected")


                        })
                //button.attr("")
              })



                 var yAxis = d3.axisLeft(yScale)
         .ticks(9)
         .tickSize(10)
svg.append("g").classed("yAxis",true)
.call(yAxis)
.attr('transform', 'translate(' + (margins.left +15)+ ','+(margins.top + 1)+')');

var xAxis = d3.axisBottom(xScale)
    .ticks(data.length)
    .tickFormat(function(d,i){


    })
    .tickSize(1)
    svg.append("g").classed("xAxis",true)
    .call(xAxis)
    .attr('transform', 'translate(' + (margins.left + 10)+ ','+(height - margins.top+22)+')');
}
