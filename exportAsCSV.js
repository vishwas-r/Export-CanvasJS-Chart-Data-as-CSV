function exportAsCSV(chart, fileName) {
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
		var exportCSV = document.createElement('button');
		var text = document.createTextNode("Save as CSV");
		exportCSV.appendChild(text);
		exportCSV.addEventListener("click", function() {
			downloadCSV({
				filename: "chart-data.csv",
				chart: chart
			})
		});
		chart.container.parentNode.insertBefore(exportCSV, chart.container.nextSibling);
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