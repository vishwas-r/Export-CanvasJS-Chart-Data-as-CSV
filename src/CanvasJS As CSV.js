(function () {
var CanvasJS = window.CanvasJS || CanvasJS ? window.CanvasJS : null;
if (CanvasJS) {
	CanvasJS.Chart.prototype.exportAsCSV = function (fileName) {
		CanvasJSDataAsCSV(this, fileName);
	}
}

function CanvasJSDataAsCSV(chart, fileName) {
	if (chart.exportEnabled) {
		var exportCSV = document.createElement('div');
		var text = document.createTextNode("Save as CSV");
		exportCSV.setAttribute("style", "padding: 12px 8px; background-color: " + chart.toolbar.itemBackgroundColor + "; color: " + chart.toolbar.fontColor);
		exportCSV.appendChild(text);
		exportCSV.addEventListener("mouseover", function () {
			exportCSV.setAttribute("style", "padding: 12px 8px; background-color: " + chart.toolbar.itemBackgroundColorOnHover + "; color: " + chart.toolbar.fontColorOnHover);
		});
		exportCSV.addEventListener("mouseout", function () {
			exportCSV.setAttribute("style", "padding: 12px 8px; background-color: " + chart.toolbar.itemBackgroundColor + "; color: " + chart.toolbar.fontColor);
		});
		exportCSV.addEventListener("click", function () {
			parseCSV({
				filename: (fileName || "chart-data") + ".csv",
				chart: chart
			})
		});

		chart._toolBar.lastChild.appendChild(exportCSV);
	} else {
		var base64Img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEgSURBVEhL3dM/SgNBFMfxBS8gWkYb0dJSyBGCwdIzRPAKgrZKINdIkVJB0qqteIdYCYoHEPX74P1gMszuzG5SiD/4wM6/99jJpvq3GeIVPwUu0ToLpIrVad1EB3Pp3KRLA1PcRAdyCYtLURNtziUsHMqmeGOUxnNtPs2cZNp+mk2S0eIteu7O5y5wgFN8Yw8vePZnnZVktLiDJzxi1+cOfe4GHxhhgjHOoLOSTLgYbjZz7OPaxzOc4Nif4/3JaNHe4MHpDc7xiW284R1b2IS9ka61MWpg925NrPi9z9mfx65pgC+fO0Lfn21/Nqt8RUo8XordZ9cmSjyuTfHGKH+nQe6qptiA5QqpPcbWkin5PXJNaot3Tdhk7cUVKxwUr6pfwprgQh4A9MYAAAAASUVORK5CYII=";
		var exportButton = document.createElement('button');

		exportButton.style.cssText = "position:relative;display: inline-block;padding: 0px 4px;height: 27px;cursor: pointer;text-align: center;text-decoration: none;background-color:" + chart.toolbar.itemBackgroundColor + ";border: 1px solid " + chart.toolbar.borderColor + ";left:" + (chart.container.clientWidth - (chart.options.zoomEnabled ? 115 : 60)) + "px; top: 1px";

		var img = document.createElement("IMG");
		img.setAttribute("src", base64Img);
		exportButton.appendChild(img);
		exportButton.addEventListener("mouseover", function () {
			this.style.cssText = this.style.cssText + "background-color: " + chart.toolbar.itemBackgroundColorOnHover;
		});
		exportButton.addEventListener("mouseout", function () {
			this.style.cssText = this.style.cssText + "background-color: " + chart.toolbar.itemBackgroundColor;
		});
		exportButton.addEventListener("click", function () {
			parseCSV({
				filename: (fileName || "chart-data") + ".csv",
				chart: chart
			})
		});

		chart.container.appendChild(exportButton);
	}
}

function mergeData(data) {
	var mergedDps = [],
		result = [];
	for (var i = 0; i < data.length; i++) {
		for (var j = 0; j < data[i].dataPoints.length; j++) {
			mergedDps.push(cloneObject(data[i].dataPoints[j]));
		}
	}

	mergedDps.forEach(function (item) {
		var existing = result.filter(function (v, i) {
			return v.x == item.x;
		});
		if (existing.length) {
			var existingIndex = result.indexOf(existing[0]);
			result[existingIndex].y = result[existingIndex].y.concat(item.y);
		} else {
			if (typeof item.y == 'string' || typeof item.y == 'number')
				item.y = [item.y];
			result.push(item);
		}
	});
	for (var i = 0; i < result.length; i++) {
		for (var j = 0; j < result[i].y.length; j++) {
			result[i]["y" + j] = result[i].y[j];
		}
		delete result[i].y;
	}
	return result;
}

function convertChartDataToCSV(args) {
	var result = '',
		ctr, keys, columnDelimiter, lineDelimiter, data;

	data = args.data || null;
	if (data == null || !data.length) {
		return null;
	}

	columnDelimiter = args.columnDelimiter || ',';
	lineDelimiter = args.lineDelimiter || '\n';

	var mergedData = mergeData(data);

	keys = Object.keys(mergedData[0]);
	result = '';
	result += keys.join(columnDelimiter);
	result += lineDelimiter;

	mergedData.forEach(function (item) {
		ctr = 0;
		keys.forEach(function (key) {
			if (ctr > 0) result += columnDelimiter;
			result += (typeof (item[key]) != undefined ? item[key] : "");
			ctr++;
		});
		result += lineDelimiter;
	});
	return result;
}

function parseCSV(args) {
	var csv = "";

	csv += convertChartDataToCSV({
		data: args.chart.options.data
	});

	if (csv == null) return;
	var filename = args.filename || 'chart-data.csv';
	if (!csv.match(/^data:text\/csv/i)) {
		csv = 'data:text/csv;charset=utf-8,' + csv;
	}
	downloadFile(csv, filename);
}

function downloadFile(extData, filename) {
	var data = encodeURI(extData);
	var link = document.createElement('a');
	link.setAttribute('href', data);
	link.setAttribute('download', filename);
	document.body.appendChild(link); // Required for FF
	link.click();
	document.body.removeChild(link);
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	module.exports = CanvasJSDataAsCSV;
} else {
	if (typeof define === 'function' && define.amd) {
		define([], function () {
			return CanvasJSDataAsCSV;
		});
	} else {
		window.CanvasJSDataAsCSV = CanvasJSDataAsCSV;
	}
}
function cloneObject(obj) {
	if (obj === null || typeof obj !== "object") {
		return obj;
	}
	if (obj instanceof Date) {
		return new Date(obj.getTime());
	}
	if (!Array.isArray) {
		Array.isArray = function (arg) {
			return Object.prototype.toString.call(arg) === '[object Array]';
		};
	}
	if (Array.isArray(obj)) {
		var clonedArr = [];
		for (var i = 0; i < obj.length; i++) {
			clonedArr.push(cloneObject(obj[i]))
		}
		return clonedArr;
	}
	var clonedObj = new obj.constructor();
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop)) {
			clonedObj[prop] = cloneObject(obj[prop]);
		}
	}
	return clonedObj;
}
})();
