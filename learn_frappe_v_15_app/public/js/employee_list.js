// this would be injected in employee list page
// refer hooks.py
console.log("employee list js injected..")

frappe.listview_settings["Employee"].onload = (listview)=> {
    // frappe.msgprint("List load script injected");
}; 

frappe.listview_settings["Employee"].refresh = (listview)=> {
    // frappe.msgprint("List refresh script injected");
}