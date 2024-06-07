const dynamicExtender = (parentClass) => {
	return class CustomHierarchyChart extends parentClass {
		/* Options:
		- doctype
		- wrapper: wrapper for the hierarchy view
		- method:
			- to get the data for each node
			- this method should return id, name, title, image, and connections for each node
		*/
		constructor(doctype, wrapper, method) {
			super(doctype, wrapper, method);
		}

		setup_hierarchy() {
			// added the hierarchy-desktop class here
			if (this.$hierarchy) this.$hierarchy.remove();

			$(`#connectors`).empty();

			// setup hierarchy
			this.$hierarchy = $(
				`<ul class="hierarchy hierarchy-desktop">
				<li class="root-level level">
					<ul class="node-children"></ul>
				</li>
			</ul>`,
			);

			this.page.main.find("#hierarchy-chart").empty().append(this.$hierarchy);

			this.nodes = {};
		}


		add_connector(parent_id, child_id) {
			// using pure javascript for better performance
			const parent_node = document.getElementById(`${parent_id}`);
			const child_node = document.getElementById(`${child_id}`);

			let path = document.createElementNS("http://www.w3.org/2000/svg", "path");

			// we need to connect right side of the parent to the left side of the child node
			const pos_parent_right = {
				// x: parent_node.offsetLeft + parent_node.offsetWidth,
				// y: parent_node.offsetTop + parent_node.offsetHeight / 2,
				x: parent_node.offsetLeft + (parent_node.offsetWidth / 2),
				y: parent_node.offsetTop + parent_node.offsetHeight + 7,
			};
			const pos_child_left = {
				// x: child_node.offsetLeft - 5,
				// y: child_node.offsetTop + child_node.offsetHeight / 2,
				x: child_node.offsetLeft + (child_node.offsetWidth / 2),
				y: child_node.offsetTop + 2,
			};

			const connector = this.get_connector(pos_parent_right, pos_child_left);

			path.setAttribute("d", connector);
			this.set_path_attributes(path, parent_id, child_id);

			document.getElementById("connectors").appendChild(path);
		}

		get_connector(pos_parent_top, pos_child_bottom) {
			if (pos_parent_top.x === pos_child_bottom.x) {
				return (
					"M" +
					pos_parent_top.x +
					"," +
					pos_parent_top.y +
					" " +
					"L" +
					pos_child_bottom.x +
					"," +
					pos_child_bottom.y
				);
			} else {
				// draw line
				return (
					"M" +
					pos_parent_top.x +
					"," +
					pos_parent_top.y +
					" " +
					"L" +
					pos_parent_top.x +
					"," +
					(pos_parent_top.y+((pos_child_bottom.y-pos_parent_top.y)/2)) +
					" " +
					"L" +
					(pos_child_bottom.x) +
					"," +
					(pos_parent_top.y+((pos_child_bottom.y-pos_parent_top.y)/2)) +
					" " +
					"L" +
					pos_child_bottom.x +
					"," +
					pos_child_bottom.y
				);
			}
		}

	}
}
