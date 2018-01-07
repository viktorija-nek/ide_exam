
/* This is the main data structure for the whole visualization. */
function Visualization() {
    this.height = 1400
    this.width = 800
    this.margin = new Margin(30, 30, 30, 30)
    this.scale = new Scale()
    this.data
    this.particles = {0:"NOx", 1:"NO", 2:"NO2", 3:"CO", 4:"O3", 5:"SO2"}
}

function Scale() {
    this.x
    this.y
}

function Margin(l, r, t, b) {
    this.left = l
    this.right = r
    this.top = t
    this.bottom = b
}

/* Run the main function after the index page loads */
d3.select(window).on('load', main("hcab.csv"));

function main(filename)
{
    d3.csv(filename, function(data)
    {
        var vis = new Visualization()
        initVis(vis)
        console.log("VIS", vis)
    })
}

function initVis(vis)
{
    vis.scale.x = d3.scaleLinear()
        .domain([0, 6])    // this is the value on the x-axis
        .range([0, vis.width - vis.margin.left - vis.margin.left])    // this is the space allocated the axis
        .nice()

    vis.scale.y = d3.scaleLinear()
        .domain([0, 300])    // this is the value on the y-axis
        .range([300 - vis.margin.top - vis.margin.bottom, 0])    // this is the space allocated the axis
        .nice()

    var xAxis = d3.axisBottom(vis.scale.x)
        .ticks(1)

    var yAxis = d3.axisLeft(vis.scale.y)
        .ticks(10)

    /* Adding the title */
    d3.select("body")
        .append("div")
        .append("h1")
        .attr("class", "title")
        .text("Particles Data, Copenhagen, Denmark (05-03-2017 00:00 - 07-04-2017 03:00)")

    /* Adding the main containter for the temperature graph */
    d3.select("body")
        .append("svg")
        .attr("id", "pollutionGraph")
        .attr("width", 800)
        .attr("height", 400)

    /* Adding some spacing at the bottom of the visualization */
    d3.select("body")
        .append("svg")
        .attr("id", "footer")
        .attr("transform", "translate(0,50)")
        .attr("width", 800)
        .attr("height", 100)

    d3.select("#pollutionGraph")
        .append("svg:g")
        .attr("id", "xAxis")
        .attr("class", "axis")
        .attr("transform", "translate(30,"+ (400 - 30) +")")
        .call(xAxis)
        .selectAll("line")
        .attr("class", "xLines")
        .attr("y1", -340)
        .attr("y2", 6)
        .attr("stroke", null)

    d3.select("#pollutionGraph")
        .append("svg:g")
        .attr("id", "yAxis")
        .attr("class", "axis")
        .attr("transform", "translate(30,30)")
        .call(yAxis)
        .selectAll("line")
        .attr("class", "yLines")
        .attr("x1", -4)
        .attr("x2", 800 - 30 - 30)
        .attr("stroke", null)

    /* remove the solid lines along the y-axis */
    d3.select("#pollutionGraph")
        .select("#yAxis")
        .select(".domain").remove()

    /* remove the solid lines along the y-axis */
    d3.select("#pollutionGraph")
        .select("#xAxis")
        .select(".domain").remove()

    /* create a group for the lines of the graph */
    d3.select("#pollutionGraph")
        .append("svg:g")
        .attr("id", "minMaxArea")

    d3.select("#pollutionGraph")
        .append("svg:g")
        .attr("id", "lines")

    /* change the labels of the x-axis */
    d3.select("#pollutionGraph")
        .select("#xAxis")
        .selectAll("text")
        .text(function(d,i)
        {
            return vis.months[i]
        })
}