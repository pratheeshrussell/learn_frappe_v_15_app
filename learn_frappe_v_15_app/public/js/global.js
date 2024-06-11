frappe.provide("frappe.views");
console.log('injecting custom EmployeeImageView globally...')

frappe.views.EmployeeimageView = class EmployeeImageView extends frappe.views.ImageView {
	get view_name() {
		return "Employee Image";
	}
	
	setup_defaults() {
		return super.setup_defaults().then(() => {
			this.page_title = this.page_title + " " + __("Gallery");
		});
	}

	setup_view() {
		this.setup_columns();
		this.setup_check_events();
		this.setup_like();
	}

	set_fields() {
		this.fields = [
			"name",
			...this.get_fields_in_list_view().map((el) => el.fieldname),
			this.meta.title_field,
			this.meta.image_field,
			"_liked_by",
		];
	}

	prepare_data(data) {
		super.prepare_data(data);
		this.items = this.data.map((d) => {
			// absolute url if cordova, else relative
			d._image_url = this.get_image_url(d);
			return d;
		});
	}

	render() {
		this.get_attached_images().then(() => {
			this.render_image_view();

			if (!this.gallery) {
				this.setup_gallery();
			} else {
				this.gallery.prepare_pswp_items(this.items, this.images_map);
			}
		});
	}

	render_image_view() {
		var html = this.items.map(this.item_html.bind(this)).join("");

		this.$page.find(".layout-main-section-wrapper").addClass("image-view");

		this.$result.html(`
			<div class="image-view-container">
				${html}
			</div>
		`);

		this.render_count();
	}

	item_details_html(item) {
		// TODO: Image view field in DocType
		let info_fields = this.get_fields_in_list_view().map((el) => el.fieldname) || [];
		const title_field = this.meta.title_field || "name";
		info_fields = info_fields.filter((field) => field !== title_field);
		let info_html = `<div><ul class="list-unstyled image-view-info">`;
		let set = false;
		info_fields.forEach((field, index) => {
			if (item[field] && !set) {
                
                if (field === 'status') {
                    let statusClass = "active";
                    if (item[field] === 'Inactive') statusClass = "inactive";
                    
                    info_html += `<li><span class="emp-status-${statusClass}">${__(item[field])}</span></li>`;
                }
                    
				
                else info_html += `<li>${__(item[field])}</li>`;
				
				// set = true;
			}
		});
		info_html += `</ul></div>`;
		return info_html;
	}

	item_html(item) {
		item._name = encodeURI(item.name);
		const encoded_name = item._name;
		const title = strip_html(item[this.meta.title_field || "name"]);
		const escaped_title = frappe.utils.escape_html(title);
		const _class = !item._image_url ? "no-image" : "";
		const _html = item._image_url
			? `<img data-name="${encoded_name}" src="${item._image_url}" alt="${title}">`
			: `<span class="placeholder-text">
				${frappe.get_abbr(title)}
			</span>`;

		let details = this.item_details_html(item);

		const expand_button_html = item._image_url
			? `<div class="zoom-view" data-name="${encoded_name}">
				${frappe.utils.icon("expand", "xs")}
			</div>`
			: "";

		return `
			<div class="image-view-item ellipsis">
				<div class="image-view-header">
					<div>
						<input class="level-item list-row-checkbox hidden-xs"
							type="checkbox" data-name="${escape(item.name)}">
						${this.get_like_html(item)}
					</div>
				</span>
				</div>
				<div class="image-view-body ${_class}">
					<a data-name="${encoded_name}"
						title="${encoded_name}"
						href="${this.get_form_link(item)}"
					>
						<div class="image-field"
							data-name="${encoded_name}"
						>
							${_html}        
						</div>
					</a>
					${expand_button_html}
				</div>
				<div class="image-view-footer">
					<div class="image-title">
						<span class="ellipsis" title="${escaped_title}">
							<a class="ellipsis" href="${this.get_form_link(item)}"
								title="${escaped_title}" data-doctype="${this.doctype}" data-name="${item.name}">
								${title}
							</a>
						</span>
					</div>
					<h6>CUSTOMIZED IMAGE VIEW</h6>
					${details}
				</div>
			</div>
		`;
	}

	get_attached_images() {
		return frappe
			.call({
				method: "frappe.core.api.file.get_attached_images",
				args: {
					doctype: this.doctype,
					names: this.items.map((i) => i.name),
				},
			})
			.then((r) => {
				this.images_map = Object.assign(this.images_map || {}, r.message);
			});
	}

	get_header_html() {
		// return this.get_header_html_skeleton(`
		// 	<div class="list-image-header">
		// 		<div class="list-image-header-item">
		// 			<input class="level-item list-check-all hidden-xs" type="checkbox" title="Select All">
		// 			<div>${__(this.doctype)} &nbsp;</div>
		// 			(<span class="text-muted list-count"></span>)
		// 		</div>
		// 		<div class="list-image-header-item">
		// 			<div class="level-item list-liked-by-me">
		// 				${frappe.utils.icon('heart', 'sm', 'like-icon')}
		// 			</div>
		// 			<div>${__('Liked')}</div>
		// 		</div>
		// 	</div>
		// `);
	}

	setup_gallery() {
		var me = this;
		this.gallery = new frappe.views.GalleryView({
			doctype: this.doctype,
			items: this.items,
			wrapper: this.$result,
			images_map: this.images_map,
		});
		this.$result.on("click", ".zoom-view", function (e) {
			e.preventDefault();
			e.stopPropagation();
			var name = $(this).data().name;
			name = decodeURIComponent(name);
			me.gallery.show(name);
			return false;
		});
	}
};


// An ugly workaround to modify image view just for a particular doctype
// Save a backup of original view
// frappe.views.ImageViewOriginal= frappe.views.ImageView;

// frappe.views.ImageView= function getImgView(opts) {
// 	if (opts.doctype === "Employee") {
// 	  return (new frappe.views.EmployeeimageView(opts));
// 	} else {
// 	  return (new frappe.views.ImageViewOriginal(opts));
// 	} 
// }


// Register as a new view
frappe.views.view_modes.push('Employee Image');
frappe.router.list_views.push('employeeimage');
frappe.router.list_views_route['employeeimage']='Employeeimage';
frappe.views.ListViewSelect = class CustomListViewSelect extends frappe.views.ListViewSelect {
	constructor(opts) {
		super(opts);
	}
	setup_views() {
		const views = {
			List: {
				condition: true,
				action: () => this.set_route("list"),
			},
			Report: {
				condition: true,
				action: () => this.set_route("report"),
				current_view_handler: () => {
					const reports = this.get_reports();
					let default_action = {};
					// Only add action if current route is not report builder
					if (frappe.get_route().length > 3) {
						default_action = {
							label: __("Report Builder"),
							action: () => this.set_route("report"),
						};
					}
					this.setup_dropdown_in_sidebar("Report", reports, default_action);
				},
			},
			Dashboard: {
				condition: true,
				action: () => this.set_route("dashboard"),
			},
			Calendar: {
				condition: frappe.views.calendar[this.doctype],
				action: () => this.set_route("calendar", "default"),
				current_view_handler: () => {
					this.get_calendars().then((calendars) => {
						this.setup_dropdown_in_sidebar("Calendar", calendars);
					});
				},
			},
			Gantt: {
				condition: frappe.views.calendar[this.doctype],
				action: () => this.set_route("gantt"),
			},
			Inbox: {
				condition: this.doctype === "Communication" && frappe.boot.email_accounts.length,
				action: () => this.set_route("inbox"),
				current_view_handler: () => {
					const accounts = this.get_email_accounts();
					let default_action;
					if (has_common(frappe.user_roles, ["System Manager", "Administrator"])) {
						default_action = {
							label: __("New Email Account"),
							action: () => frappe.new_doc("Email Account"),
						};
					}
					this.setup_dropdown_in_sidebar("Inbox", accounts, default_action);
				},
			},
			"Employee Image": {
				condition: true,
				action: () => this.set_route("employeeimage"),
			},
			Image: {
				condition: this.list_view.meta.image_field,
				action: () => this.set_route("image"),
			},
			Tree: {
				condition:
					frappe.treeview_settings[this.doctype] ||
					frappe.get_meta(this.doctype).is_tree,
				action: () => this.set_route("tree"),
			},
			Kanban: {
				condition: this.doctype != "File",
				action: () => this.setup_kanban_boards(),
				current_view_handler: () => {
					frappe.views.KanbanView.get_kanbans(this.doctype).then((kanbans) =>
						this.setup_kanban_switcher(kanbans)
					);
				},
			},
			Map: {
				condition:
					this.list_view.settings.get_coords_method ||
					(this.list_view.meta.fields.find((i) => i.fieldname === "latitude") &&
						this.list_view.meta.fields.find((i) => i.fieldname === "longitude")) ||
					this.list_view.meta.fields.find(
						(i) => i.fieldname === "location" && i.fieldtype == "Geolocation"
					),
				action: () => this.set_route("map"),
			},
		};

		frappe.views.view_modes.forEach((view) => {
			if (this.current_view !== view && views[view].condition) {
				this.add_view_to_menu(view, views[view].action);
			}

			if (this.current_view == view) {
				views[view].current_view_handler && views[view].current_view_handler();
			}
		});
	}
}