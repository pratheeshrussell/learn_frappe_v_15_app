app_name = "learn_frappe_v_15_app"
app_title = "Learn Frappe App"
app_publisher = "Pratheesh Russell"
app_description = "App to learn about frappe customizations"
app_email = "pratheeshrussell@gmail.com"
app_license = "mit"
# required_apps = []

# Includes in <head>
# ------------------

# include js, css files in header of desk.html

app_include_css = [
    "/assets/learn_frappe_v_15_app/css/theme.css",
    "/assets/learn_frappe_v_15_app/css/organization_chart.css",
    "/assets/learn_frappe_v_15_app/css/menu.css",
    '/assets/learn_frappe_v_15_app/js/air-datepicker/datepicker.min.css'
    ]
app_include_js = [
    "/assets/learn_frappe_v_15_app/js/global.js",
    "/assets/learn_frappe_v_15_app/js/theme.js",
    '/assets/learn_frappe_v_15_app/js/air-datepicker/datepicker.min.js',
    '/assets/learn_frappe_v_15_app/js/air-datepicker/datepicker.en.js',
    "/assets/learn_frappe_v_15_app/js/layout_customization/workspace.js",
    "/assets/learn_frappe_v_15_app/js/layout_customization/page.js",
    "/assets/learn_frappe_v_15_app/js/layout_customization/router.js",
    "/assets/learn_frappe_v_15_app/js/custom_form_class.js",
    "/assets/learn_frappe_v_15_app/js/custom_footer.js"
    ]

# include js, css files in header of web template
# web_include_css = "/assets/learn_frappe_v_15_app/css/theme.css"
# web_include_js = "/assets/learn_frappe_v_15_app/js/global.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "learn_frappe_v_15_app/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}
page_js = {"organizational-chart" : [
    "public/js/org_chart/organizational_chart.js"]
    }
# include js in doctype views
doctype_js = {
    "Employee" : "public/js/employee.js",
    "custom doctype":"public/js/workflow_confirmation.js"
    }
doctype_list_js = {"Employee" : "public/js/employee_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Svg Icons
# ------------------
# include app icons in desk
# app_include_icons = "learn_frappe_v_15_app/public/icons.svg"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
# 	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
# 	"methods": "learn_frappe_v_15_app.utils.jinja_methods",
# 	"filters": "learn_frappe_v_15_app.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "learn_frappe_v_15_app.install.before_install"
# after_install = "learn_frappe_v_15_app.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "learn_frappe_v_15_app.uninstall.before_uninstall"
# after_uninstall = "learn_frappe_v_15_app.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "learn_frappe_v_15_app.utils.before_app_install"
# after_app_install = "learn_frappe_v_15_app.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "learn_frappe_v_15_app.utils.before_app_uninstall"
# after_app_uninstall = "learn_frappe_v_15_app.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "learn_frappe_v_15_app.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
# 	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
# 	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"learn_frappe_v_15_app.tasks.all"
# 	],
# 	"daily": [
# 		"learn_frappe_v_15_app.tasks.daily"
# 	],
# 	"hourly": [
# 		"learn_frappe_v_15_app.tasks.hourly"
# 	],
# 	"weekly": [
# 		"learn_frappe_v_15_app.tasks.weekly"
# 	],
# 	"monthly": [
# 		"learn_frappe_v_15_app.tasks.monthly"
# 	],
# }

# Testing
# -------

# before_tests = "learn_frappe_v_15_app.install.before_tests"

# Overriding Methods
# ------------------------------
#
override_whitelisted_methods = {
    "frappe.core.doctype.user.user.switch_theme": "learn_frappe_v_15_app.overrides.switch_theme.switch_theme"
}
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "learn_frappe_v_15_app.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["learn_frappe_v_15_app.utils.before_request"]
# after_request = ["learn_frappe_v_15_app.utils.after_request"]

# Job Events
# ----------
# before_job = ["learn_frappe_v_15_app.utils.before_job"]
# after_job = ["learn_frappe_v_15_app.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
# 	{
# 		"doctype": "{doctype_1}",
# 		"filter_by": "{filter_by}",
# 		"redact_fields": ["{field_1}", "{field_2}"],
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_2}",
# 		"filter_by": "{filter_by}",
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_3}",
# 		"strict": False,
# 	},
# 	{
# 		"doctype": "{doctype_4}"
# 	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"learn_frappe_v_15_app.auth.validate"
# ]

# Automatically update python controller files with type annotations for this app.
# export_python_type_annotations = True

# default_log_clearing_doctypes = {
# 	"Logging DocType Name": 30  # days to retain logs
# }

