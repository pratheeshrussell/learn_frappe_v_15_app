frappe.router.render = function () {
    console.log('using custom router render', this.current_route)
    if (this.current_route[0]) {
        this.render_page();
    } else {
        // Show our menu page
        frappe.set_route(['app', 'menu']);
        //frappe.set_route('');
    }
}