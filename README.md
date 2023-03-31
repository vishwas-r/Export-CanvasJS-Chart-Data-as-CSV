# Export CanvasJS Chart Data as CSV
This is a plugin for CanvasJS Charts that allows you to export and save CanvasJS Chart's data as CSV.

## CanvasJS
CanvasJS is built from ground up for high performance data visualization and can render millions of data points in a matter of milliseconds. Charts are beautiful and API is very simple to use.


## How to Use?

### Importing Script
Import the CanvasJS & CanvasJS Export as CSV scritps
```
/* HTML Script Tag */
<script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/export-canvasjs-chart-data-as-csv/dist/canvasjsascsv.min.js"></script>

/* or */
import CanvasJS from './canvasjs.min';
window.CanvasJS = CanvasJS;
require('export-canvasjs-chart-data-as-csv');

/* React */
import CanvasJSReact from './canvasjs.react';
window.CanvasJS = CanvasJSReact.CanvasJS;
require('export-canvasjs-chart-data-as-csv');
```

### Enable Exporting & Render the Chart
- Enable Exporting by setting exportEnabled property to true.
- Render the chart.

```
var chart = new CanvasJS.Chart("chartContainer", {
    .
    .
    .
    exportEnabled: true,	
    //Chart Options
    .
    .
    .
});
chart.render();
```

#### When exportEnabled is set to true
![exportEnabled true](https://raw.githubusercontent.com/vishwas-r/Export-CanvasJS-Chart-Data-as-CSV/master/screenshots/export-chart-as-csv-dropdown.png)

##### Note: 
- Plugin was last tested with **CanvasJS Chart v3.7.5GA**
- This plugin requires you to have CanvasJS License. Please visit **[CanvasJS](https://canvasjs.com/license/)** for more info.

<a href="https://www.buymeacoffee.com/vishwas.r" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="BuyMeACoffee" width="200"/></a>
