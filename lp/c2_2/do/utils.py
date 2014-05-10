class IPyTable(object):
	def __init__(self, headers = [], rows = []):
		self.headers = list(headers)
		self.rows = list(rows)		

	def append(self, row):
		self.rows.append(row)

	def replace_headers(self, headers):
		self.headers = headers

	def to_html(self):
		html = []
		html += "<table class='table table-striped'>"
		html += "<tr>"
		for header in self.headers:
			html += "<th>" + str(header) + "</th>" 
		html += "<tr>"

		for row in self.rows:
			html += "<tr>"

			for item in row:
				html += "<td>" + str(item) + "</td>" 

			html += "</tr>"

		html += "</table>"

		return "".join(html)

	def _repr_html_(self):
		return self.to_html();