# learn_frappe_v_15_app
This frappe app is created to explore various customizations supported by frappe.


## Install app
use the following commands to install this app  
First get it from this repo

```
bench get-app https://github.com/pratheeshrussell/learn_frappe_v_15_app
```
add to your site
```
bench --site [site name] install-app learn_frappe_v_15_app
```
start the frappe app
```
bench --site [site name] clear-cache
bench start
```

## Uninstall app
```
bench --site [site name] remove-from-installed-apps learn_frappe_v_15_app
```

NOTE that this leaves behind an entry in DB thats prevents it from being added again. Remove that entry to add it again (table: tabModule Def).

## Experiments
### Custom imageview just for Employee doctype
* check global js  

### Custom Theme switcher
* check switch_theme override + theme js  

### Custom Listview Action button
*  check employee_list js

### Customizing Time picker control
* Frappe uses old version of [Air Datepicker](https://github.com/frappe/air-datepicker)   
* we can fork, modify, build and add it to our app   
* check air-datepicker folder  
* [Example modified code](https://github.com/pratheeshrussell-qb/air-datepicker)  

### Injecting code in Page
* check organizational_chart.js. It makes the app assume we are in mobile view always so renders the chart vertically in the **organizational-chart** page     