function CanvasJSAsCSV(chart, fileName) {
	var toolBar = document.getElementsByClassName("canvasjs-chart-toolbar")[0];
	if (chart.options.exportEnabled) {
		var exportCSV = document.createElement('div');
		var text = document.createTextNode("Save as CSV");
		exportCSV.setAttribute("style", "padding: 12px 8px; background-color: white; color: black")
		exportCSV.appendChild(text);
		exportCSV.addEventListener("mouseover", function() {
			exportCSV.setAttribute("style", "padding: 12px 8px; background-color: #2196F3; color: white")
		});
		exportCSV.addEventListener("mouseout", function() {
			exportCSV.setAttribute("style", "padding: 12px 8px; background-color: white; color: black")
		});
		exportCSV.addEventListener("click", function() {
			downloadCSV({
				filename: (fileName || "chart-data") + ".csv",
				chart: chart
			})
		});
    
		toolBar.childNodes[1].appendChild(exportCSV);
	} else {
		var base64Img = "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDg2LjkwNiA4Ni45MDYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDg2LjkwNiA4Ni45MDY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4Ij4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNODEuNzUxLDI4Ljg2M2wtMS42MTQtMS4xNDVjLTEuNjE0LTEuMTQ1LTMuMjMxLTIuMjkyLTQuODYxLTMuNDE1Yy0xLjcxNS0xLjE4My0zLjQzOC0yLjQ0MS01LjEwNC0zLjY2ICAgIGMtMS45MjUtMS40MDctMy45MTYtMi44NjItNS45MzYtNC4yMjljLTAuMjcxLTAuMTgzLTAuNTQ5LTAuMzkyLTAuODM4LTAuNjA3Yy0xLjQ0Ny0xLjA4LTMuNTUxLTIuNDU5LTUuODUyLTIuMjI1ICAgIEM1NC40MjUsMTMuODg4LDUyLDE3LjA1NCw1MiwxOS43MDN2Ni45ODZjMC0wLjAwMS0wLjA4Ni0wLjAwMi0wLjI3Mi0wLjAwMmMtNi44MiwwLTQwLjcyMSwxLjcyMi00MC43MjEsMzUuNzIgICAgYzAsMC45NzYsMC43NjgsMS44MDUsMS43MjksMS45NjhjMC4xMTEsMC4wMiwwLjI1NSwwLjAyOCwwLjM2NSwwLjAyOGMwLjgzOCwwLDEuNjIxLTAuNTMsMS45MDUtMS4zNDQgICAgYzAuMjUyLTAuNzIsNi4yMjktMTcuNjI3LDMzLjA4NC0xNy42MjdjMS4zNDgsMCwyLjkwOSwwLjA0NCwzLjkwOSwwLjEzdjYuNTE1YzAsMi4xNzMsMS42MDQsNC4zNDcsMy42OTksNS41MzYgICAgYzAuNzI5LDAuNDE0LDEuNjM0LDAuNjI0LDIuNDQzLDAuNjI0YzEuOTg5LDAsMy42NDMtMS4yMzUsNC45MjEtMi4yMjhjMC4zNDMtMC4yNjYsMC42OTgtMC41MjIsMS4wMDctMC43MiAgICBjMS4xOS0wLjc2NywyLjM4LTEuNTkzLDMuNTE1LTIuMzkyYzAuNTc1LTAuNDA0LDEuMTU3LTAuODA5LDEuNzI5LTEuMjAyYzMuMTQ1LTIuMTU2LDYuMjk5LTQuNDIyLDkuMzQ3LTYuNjEybDAuODY5LTAuNjI0ICAgIGMwLjM5Ni0wLjI4MywwLjc5OS0wLjU2MiwxLjIwMS0wLjg0MmMwLjMzNi0wLjIzMiwwLjY3MS0wLjQ2NSwwLjk0LTAuNjU3YzIuMzMyLTEuNTI0LDUuMjM2LTMuNDIxLDUuMjM2LTcuMDcxICAgIEM4Ni45MDgsMzIuMzczLDg0LjUwNSwzMC43MzgsODEuNzUxLDI4Ljg2M3ogTTc5LjQyMiwzOS42NTVjLTAuMzE5LDAuMjI3LTAuNjQ0LDAuNDUxLTAuOTY4LDAuNjc2ICAgIGMtMC40MiwwLjI5MS0wLjg0MSwwLjU4My0xLjI1NSwwLjg4bC0wLjg2OSwwLjYyNWMtMy4wMywyLjE3OC02LjE2Miw0LjQzLTkuMjcxLDYuNTYyYy0wLjU4NywwLjQwMy0xLjE3MywwLjgxNi0xLjc2LDEuMjI5ICAgIGMtMS4xMDIsMC43NzUtMi4yNCwxLjU3Ny0zLjM2LDIuMjk3Yy0wLjQyOCwwLjI3NC0wLjg1NCwwLjYwNS0xLjI2NiwwLjkyNmMtMC43NTQsMC41ODUtMS43ODYsMS4zODctMi40MDUsMS4zODcgICAgYy0wLjA3NiwwLTAuNDM1LTAuMDEyLTAuNTk0LTAuMTAzQzU2Ljg2Miw1My42NzMsNTYsNTIuNzg4LDU2LDUyLjA3NnYtOC4zNzJjMC0xLjAzOC0wLjU0NC0xLjkwMy0xLjU3OC0xLjk5MiAgICBjLTIuMTU3LTAuMTg3LTQuMTYtMC4yOC02LjE5OC0wLjI4Yy0xNy43MTMsMC0yNy4zMTIsNi44NzEtMzIuMjk3LDEyLjYyOWMxLjg1NC04LjM4LDYuNzM4LTE0LjYyMiwxNC41MjktMTguNjE2ICAgIGM4LjM3Ny00LjI5NSwxNy44MzUtNC43NTgsMjEuNTA2LTQuNzU4YzEuMDYxLDAsMS42OS0wLjE1MywxLjcyNS0wLjE1YzAuMDQzLDAuMDAyLDAuMDk1LTAuMTg3LDAuMTM4LTAuMTg3SDU0LjUgICAgYzEuMTA0LDAsMS41LTAuNTE1LDEuNS0xLjYxOXYtOS4wMjhjMC0wLjkyMywxLjE0OC0yLjA2MywxLjkzNy0yLjE0MWMwLjgwNS0wLjA1NiwxLjk4OCwwLjczNiwyLjk0MiwxLjQ0OSAgICBjMC4zNDIsMC4yNTUsMC43MzQsMC41MDEsMS4wNTMsMC43MTZjMS45NTksMS4zMjYsMy45NTEsMi43Niw1Ljg0OCw0LjE0NmMxLjY4OCwxLjIzNCwzLjQ1LDIuNTExLDUuMjExLDMuNzI0ICAgIGMxLjYxNCwxLjExMywzLjIyNSwyLjI1LDQuODIzLDMuMzg1bDEuNjUyLDEuMTY4YzIuOTI1LDEuOTksMy40NCwyLjU1LDMuNDQsMy43NEM4Mi45MDYsMzcuMTYxLDgxLjg1MiwzOC4wNjUsNzkuNDIyLDM5LjY1NXoiIGZpbGw9IiNGRkRBNDQiLz4KCQk8cGF0aCBkPSJNNjEuNjgyLDczLjM1YzUuMDI3LDAsOC4zMTgtMy40NTUsOC4zMTgtOC41NDF2LTUuMDc4YzAtMS4xMDQtMC44OTYtMi0yLTJzLTIsMC44OTYtMiwydjUuMDc4ICAgIGMwLDIuODk3LTEuNDgxLDQuNTQxLTQuMzE4LDQuNTQxSDkuNzg3QzYuODIyLDY5LjM1LDQsNjcuNTY5LDQsNjQuODA5VjMxLjcwM2MwLTIuNzQxLDIuODcyLTUuMzUzLDUuNzg3LTUuMzUzSDI5LjUgICAgYzEuMTA0LDAsMi0wLjg5NiwyLTJzLTAuODk2LTItMi0ySDkuNzg3QzQuNjY2LDIyLjM1LDAsMjYuNzU1LDAsMzEuNzAzdjMzLjEwNmMwLDQuOTIsNC42NjYsOC41NDEsOS43ODcsOC41NDFINjEuNjgyeiIgZmlsbD0iI0ZGREE0NCIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=";
		var exportButton = document.createElement('button');
		var chartBound = chart.container.getBoundingClientRect();
		console.log(chartBound);
		exportButton.style.cssText = "position:absolute;display: inline-block;padding: 5px 15px;cursor: pointer;text-align: center;text-decoration: none;background-color: #f4511e;border: none;border-radius: 10px;left:" + (chartBound.right - 60) + "px; top:" + chartBound.top + "px";
		var img = document.createElement("IMG");
		img.setAttribute("src", base64Img);
		exportButton.appendChild(img);
		exportButton.addEventListener("mouseover", function() {
			this.style.cssText = this.style.cssText + "background-color: #d4511e;";
		});
		exportButton.addEventListener("mouseout", function() {
			this.style.cssText = this.style.cssText + "background-color: #f4511e;";
		});
		exportButton.addEventListener("click", function() {
			downloadCSV({
				filename: "chart-data.csv",
				chart: chart
			})
		});

		chart.container.parentNode.insertBefore(exportButton, chart.container.nextSibling);
	}
};

function convertChartDataToCSV(args) {
	var result, ctr, keys, columnDelimiter, lineDelimiter, data;
	data = args.data || null;
	if (data == null || !data.length) {
		return null;
	}
	columnDelimiter = args.columnDelimiter || ',';
	lineDelimiter = args.lineDelimiter || '\n';
	keys = Object.keys(data[0]);
	result = '';
	result += keys.join(columnDelimiter);
	result += lineDelimiter;
	data.forEach(function(item) {
		ctr = 0;
		keys.forEach(function(key) {
			if (ctr > 0) result += columnDelimiter;
			result += (!(typeof item[key] === 'undefined' || item[key] === null) ? item[key] : "");
			ctr++;
		});
		result += lineDelimiter;
	});
	return result;
}

function downloadCSV(args) {
	var data, filename, link;
	var csv = "";
	for (var i = 0; i < args.chart.options.data.length; i++) {
		csv += convertChartDataToCSV({
			data: args.chart.options.data[i].dataPoints
		});
	}
	if (csv == null) return;
	filename = args.filename || 'chart-data.csv';
	if (!csv.match(/^data:text\/csv/i)) {
		csv = 'data:text/csv;charset=utf-8,' + csv;
	}
	data = encodeURI(csv);
	link = document.createElement('a');
	link.setAttribute('href', data);
	link.setAttribute('download', filename);
	document.body.appendChild(link); // Required for FF
	link.click();
	document.body.removeChild(link);
}