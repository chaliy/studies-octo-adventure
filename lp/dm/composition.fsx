#load "gru.fsx"
open System
open System.Collections.Generic
open Gru

let compose g1 g2 =
    (edges g1)
    |> Seq.collect(fun (el, er) ->
                    (edges g2)                    
                    |> Seq.where(fun (cl, cr) -> er = cl)
                    |> Seq.map(fun (pl, pr) -> (el, pr))
    )
    |> Seq.distinct
    |> List.ofSeq

// Self test

// Testing
let F1 = [
    (1, 1)
    (2, 1)
    (3, 2)
    (4, 3)
]

match (compose F1 F1) with
| [(1, 1); (2, 1); (3, 1); (4, 2)] -> ()
| _ -> failwith "Compose is invalid" 


// Actual task
let R = [
    (1, 1)
    (1, 2)
    (1, 3)
    (3, 1)
    (3, 2)
]
let R2 = (compose R R)
printfn "R2 %A" R2
let R3 = (compose R2 R)
printfn "R3 %A" R3
let R4 = (compose R3 R)
printfn "R4 %A" R4

