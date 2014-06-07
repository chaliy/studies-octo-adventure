from IPython.display import display
from numpy import *
from pylab import *

class Table(object):
    def __init__(self, headers = [], rows = []):
        self.headers = list(headers)
        self.rows = list(rows)        

    def append(self, row):
        self.rows.append(row)

    def replace_headers(self, headers):
        self.headers = headers

    def to_html(self):
        html = ""
        html += "<table class='table table-striped'>"
        html += "<tr>"
        for header in self.headers:
            html += "<th>" + str(header) + "</th>" 
        html += "<tr>"

        for row in self.rows:
            html += "<tr>"

            for item in row:
                html += "<td>"
                if hasattr(item, "_repr_html_"):
                    html += item._repr_html_()
                else:
                    html += str(item)
                html += "</td>";

            html += "</tr>"

        html += "</table>"

        return html

    def _repr_html_(self):
        return self.to_html();

def display_table(headers = [], rows = []):
    display(Table(headers, rows))


def display_code(file_name):
    from pygments import highlight
    from pygments.lexers import PythonLexer
    from pygments.formatters import HtmlFormatter
    import IPython

    with open(file_name, 'rb') as f:
        code = f.read().decode('utf-8')

    formatter = HtmlFormatter(cssclass="well highlight")

    html = ""
    html += "<style type='text/css'>"
    html += formatter.get_style_defs('.highlight')
    html += "</style>"
    html += "<h3>File: " + file_name + "</h3>"    
    html += highlight(code, PythonLexer(), formatter)     

    display(IPython.display.HTML(html))


class BwMatrix(object):
    def __init__(self, matrix):
        self.matrix = matrix

    def to_html(self):
        html = ""
        html += "<table>"
        
        for row in self.matrix:
            html += "<tr>"

            for item in row:
                html += "<td style='" 
                if item:
                    html += "background-color: black;"                 
                html += "width:5px; height:5px'></td>" 

            html += "</tr>"

        html += "</table>"

        return html   

    def _repr_html_(self):
        return self.to_html();


## Mokey Patch Pandas ##

import pandas as pd
pd.DataFrame._repr_html_ = lambda self: self.to_html(classes='table table-striped')

import matplotlib as mpl
mpl.rcParams['font.family'] = 'fantasy'
mpl.rcParams['font.fantasy'] = 'Arial, Ubuntu'

## Errors

def abs_error(actual, exepcted):
    return list(abs(subtract(exepcted, actual)))

def rel_error(actual, exepcted):
    return list(abs(divide(exepcted, actual)))