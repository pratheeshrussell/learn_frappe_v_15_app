// this would be injected in employee list page
// refer hooks.py
console.log("employee list js injected..")

// frappe.listview_settings["Employee"] = frappe.listview_settings["Employee"] || {};
frappe.listview_settings["Employee"] = {
	add_fields: ["status", "branch", "department", "designation", "image"],
	filters: [["status", "=", "Active"]],
    hide_name_column: true,
    hide_name_filter: true,
	get_indicator: function (doc) {
		var indicator = [__(doc.status), frappe.utils.guess_colour(doc.status), "status,=," + doc.status];
		indicator[1] = { Active: "green", Inactive: "red", Left: "gray", Suspended: "orange" }[doc.status];
		return indicator;
	},
    formatters: {
        employee_name(val) {
            return __(val.bold(), null, "Access");
        },
        designation(val){
            return (val) ? val : "no designation added";
        }
    }
};

frappe.listview_settings["Employee"].button= {
    show: function(doc) {
        // what is this even used for
        return '<i class="fa fa-edit"></i> Edit CTC';
    },
    get_label: function() {
        return __('<i class="fa fa-edit"></i> Edit CTC', null, "Access");
    },
    get_description: function(doc) {
        return __("Edit CTC of " + doc.employee_name);
    },
    action(doc) {
        console.log(doc)
        frappe.db.get_value('Employee', {name: doc.name}, ['ctc']
       ).then((employee) =>{
            let empl_ctc = employee["message"]["ctc"];
            console.log(employee["message"], empl_ctc);
            let d = new frappe.ui.Dialog({
                title: `${doc.employee_name}(${doc.name}) : CTC`,
                fields: [{
                    label: 'Employee CTC',
                    fieldname: 'emp_ctc',
                    fieldtype: 'Data',
                    default: empl_ctc
                }],
                size: 'large',// small, large, extra-large 
                primary_action_label: 'Update CTC',
                    primary_action: ()=> {
                        let updated_ctc = d.get_values().emp_ctc;
                        console.log('updated value is ', updated_ctc)
                        frappe.db.set_value('Employee', doc.name, {
                            'ctc': updated_ctc
                        })
                        d.hide();
                    },
                    secondary_action_label: __("Close"),
                    secondary_action: function() {
                        d.hide();
                    },
            });
            d.show();
        });
    }
};
frappe.listview_settings["Employee"].onload = (listview)=> {
    // frappe.msgprint("List load script injected");
}; 

frappe.listview_settings["Employee"].refresh = (listview)=> {
    // console.log($("span.comment-count"))
    $("span.comment-count").remove();
    $("span.modified").remove();
    $("use.like-icon").remove();
    
    // frappe.msgprint("List refresh script injected");
    // listview.page.add_menu_item(__("Menu"));
	// listview.page.add_action_item(__("Actions"));
	// listview.page.set_primary_action('Primary Button');
  	// listview.page.set_secondary_action('Secondary Button');
	// listview.page.add_inner_button("Inner Button");
}