function CanvasJSDataAsCSV(chart, fileName) {
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
    
		toolBar.lastChild.appendChild(exportCSV);
	} else {
		var base64Img = "data:image/svg+xml;utf8;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGzSURBVEhL7dXPSxRhHMfxqQhEOhVEepK69A/UqZNdAn/gwZOnUAqC8GDHLnpKugQRQmB48+dFJIiEDhbRRQXP4SFEQYRQ0BQl6v3e2Yd9dtl2d5YVPfSBF/vMw/PMd+eZmWeS/2lE7uMr1qt4gbpyA/vYxGwFx/iDl8icB3Cyv5WyixPUVagDTryXO/p3LDKNKWQulKXIB9zFMjIVylLEcaV8aKqm1iIP8TjiVTjP+VVTa5HSOP58FbmNUbTljmqP453n/LPJTXzED7zGZZhrmMEGPsFxxhv+E7fwNN++jor5DLcRT+SaDsG8wW/M4S0GYHwvHNeDCWwhjjtFX9osxK1hPG0m/WhPm8l7bONq7qiQJjjnOXwJFxDHea5KUfxXY2mzKL3wSnbwCBcQsgqv8BeG7YiSqYi5g29wzCs78nmHPdjfZUeUskXcsl1b/+kzdCKO/UvwAQh5AguoxY4oZYss4ggrcJInMBbzuzGPQ8RrH25+uOndCN8Z+w6i40EkrXDLXsMILsE0wyfM/kk4LsSb/x0um7kI2+Hqgi+4goaltFDDC4SEQqdWIMRCLnU+SfIXmIGI6vRCbY8AAAAASUVORK5CYII=";
		var exportButton = document.createElement('button');
		var chartBound = chart.container.getBoundingClientRect();
		exportButton.style.cssText = "position:absolute;display: inline-block;padding: 0px 4px;height: 27px;cursor: pointer;text-align: center;text-decoration: none;background-color: #fff;border: 1px solid rgb(33, 150, 243);left:" + (chartBound.right - (chart.options.zoomEnabled ? 115 : 60)) + "px; top:" + (chartBound.top + 1) + "px";
		
		var img = document.createElement("IMG");
		img.setAttribute("src", base64Img);
		exportButton.appendChild(img);
		exportButton.addEventListener("mouseover", function() {
			this.style.cssText = this.style.cssText + "background-color: rgb(33, 150, 243)";
		});
		exportButton.addEventListener("mouseout", function() {
			this.style.cssText = this.style.cssText + "background-color: #fff;";
		});
		exportButton.addEventListener("click", function() {
			downloadCSV({
				filename: (fileName || "chart-data") + ".csv",
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
