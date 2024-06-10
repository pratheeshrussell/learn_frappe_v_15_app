// Watch: https://www.youtube.com/watch?v=gKwQSYMVCGo&t=618s&ab_channel=GhorzAce
frappe.pages['menu'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Menu',
		single_column: true
	});

	frappe.desk_menu.make(page);

}

frappe.desk_menu ={
	make(page){
		// return
		// var me = $(this);
		let all_pages = frappe.workspaces;
		let body = ``;
        console.log('fetched pages', all_pages)
		body +=`<div class="widget-group ">
				<div class="widget-group-head">
					<div class="widget-group-title"></div>
				</div>
				<div class="widget-group-body grid-col-3">
		`;


		Object.values(all_pages)
		.filter((page) => (page.parent_page == ""))
		.forEach((item) => {
			body += `
			<div
			class="widget widget-shadow desk-sidebar-item standard-sidebar-item menu-widget no-click" 
			data-widget-name="${item.title}">
			<div class="widget-head">
				<a class="widget-title" href="/app/${
					item.public
						? frappe.router.slug(item.title)
						: "private/" + frappe.router.slug(item.title)
				}" >
					<span class="widget-title-icon" item-icon=${item.icon || "folder-normal"}>
					${
						item.public
							? frappe.utils.icon(item.icon || "folder-normal", "md")
							: `<span class="indicator ${item.indicator_color}"></span>`
					}
					</span>
					<span class="widget-title-text">${__(item.title)}</span>
				</a>

				
			</div>	
		</div>
		`;
		})
		body +=`</div></div>`
	
		$(frappe.render_template(body,this)).appendTo(page.main);
	}
}