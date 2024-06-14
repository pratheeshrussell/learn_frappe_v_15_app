//Check frappe_imports.bundle first

frappe.require(frappe.assets.bundled_asset("frappe_imports.bundle.js"), () => {
	const CustomFormTimeline = class extends window.frappe_import.FormTimeline{
        prepare_timeline_contents() {
            this.timeline_items.push(...this.get_comment_timeline_contents());
        }
    }

    frappe.ui.form.Footer = class CustomFormFooter extends frappe.ui.form.Footer {
        constructor(opts) {
            super(opts);
        }
    
        make_timeline() {
        	this.frm.timeline = new CustomFormTimeline({
        		parent: this.wrapper.find(".timeline"),
        		frm: this.frm,
        	});
        }
    }
});
