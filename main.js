
/* This is the main data structure for the whole visualization. */
function Visualization() {
    this.height = 100
    this.width = 800
    this.margin = new Margin(10, 10, 10, 10)
    this.scale = new Scale()
    this.data
	this.particles_number = 6
	this.barPadding = 20;
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
		vis.data = data
        initVis(vis)
        console.log("VIS", vis)
    })
}

function initVis(vis)
{
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
    var svg = d3.select("body")
        .append("svg")
		.attr("id", "pollutionGraph")
        .attr("width", vis.width)
        .attr("height", vis.height);

	var data = vis.data[0];
    var arr = [data["NOx myg/m3"], data["NO myg/m3"], data["NO2 myg/m3"], data["CO mg/m3"], data["O3 myg/m3"], data["SO2 myg/m3"]];
			
    vis.scale.x = d3.scaleLinear()
        .domain([0, 6])    // this is the value on the x-axis
        .range([0, vis.width - vis.margin.left - vis.margin.left])    // this is the space allocated the axis
        .nice()

    vis.scale.y = d3.scaleLinear()
        .domain([0, d3.max(arr)])    // this is the value on the y-axis
        .range([0, vis.height - vis.margin.top - vis.margin.bottom])    // this is the space allocated the axis
        .nice()

    /* create a group for the bars of the graph */
    var bars = svg.selectAll("rect")
        .data(arr)
		.enter()
		.append("rect")
		.attr("x", function(d, i) {
			return i * (vis.width / vis.particles_number);
		})
		.attr("y", function(d) {
			return vis.height - vis.scale.y(d);
		})
		.attr("width", vis.width / vis.particles_number - vis.barPadding)
		.attr("height", function(d) {
			return vis.scale.y(d);
		})
		.attr("fill", "blue");

	svg.selectAll("text")
        .data(arr)
		.enter()
		.append("text")
		.text(function(d) {
			return d;
		})
		.attr("text-anchor", "middle")
		.attr("x", function(d, i) {
			return i * (vis.width / vis.particles_number) + (vis.width / vis.particles_number - vis.barPadding) / 2;
		})
		.attr("y", function(d) {
			return vis.height - vis.scale.y(d);
		})
		.attr("font-family", "sans-serif")
		.attr("font-size", "11px")
		.attr("fill", "white");

}
