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
* check global js  - The ugly workaround seems to work   

### Creating a new view globally
check global js
* Add your view to frappe.views object  
* add to frappe.views.view_modes  
* extend and modify **setup_views** method in frappe.views.ListViewSelect   
* finally add to frappe.views.view_modes and frappe.router.list_views_route  

### Custom Theme switcher
* check switch_theme override + theme js  

### Custom Listview Action button
*  check employee_list js - check the **button** function

### Custom Listview Checkbox filter
*  check employee_list js - check the **onload** function

### Customizing Time picker control
* Frappe uses old version of [Air Datepicker](https://github.com/frappe/air-datepicker)   
* we can fork, modify, build and add it to our app   
* check air-datepicker folder  
* [Example modified code](https://github.com/pratheeshrussell-qb/air-datepicker)  

### Injecting code in Page
* check organizational_chart.js. It replaces the **hrms.HierarchyChart** with a custom class.      

### Adding a menu page
* Add a page using Frappe UI and save it to the app   
* then make the changes as in **layout_cutomization** folder   
* need to find an easier way if possible  

### Removing the readonly message from workflow
* check **custom_form_class.js**

### Customizing the footer timeline
This is tricky since **FormTimeline** class is not set in the frappe object
#### Get the FormTimeline class
* in frappe_imports.bundle.js (the file name should be **[name].bundle.js**) add the import to the file(with the FormTimeline) class.   
* Then set the object in the window object so we can reference later   
* DONOT add this to hooks.py
when you run ```bench build``` it will build the file

#### Now extend and modify the class
* check the custom_footer.js for implementation.

### Workflow reject customization
To ask for a reason if rejected   
* check workflow_confirmation.js   
* you need to add a new field(hidden field is fine) to save the reason  