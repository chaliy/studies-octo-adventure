#r "./packages/MSDN.FSharpChart.dll.0.60/lib/MSDN.FSharpChart.dll"
#r "System.Windows.Forms.DataVisualization.dll"

open System.Windows.Forms
open System.Windows.Forms.DataVisualization.Charting
open MSDN.FSharp.Charting


// Calculate X and Y values for the chart
let range = [ 1.0 .. 0.02 .. 100.0 ]
let xs = [ for f in range -> (cos f) * (f / 100.0) ]
let ys = [ for f in range -> (sin (2.0 * f)) * (f / 100.0) ]

let chart = FSharpChart.Line(xs, ys)


//let chart = [for x in 0.0 .. 0.1 .. 6.0 -> sin x + cos (2.0 * x)]
//              |> FSharpChart.Line


let form = new Form(Visible = true, TopMost = true, Width = 700, Height = 500)
let ctl = new ChartControl(chart, Dock = DockStyle.Fill)
form.Controls.Add(ctl)
form.Show()