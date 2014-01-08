#load "gru.fsx"
open System
open System.Collections.Generic
open Gru

let R1 = [
    (1, 1)
    (1, 2)
    (2, 1)
    (3, 3)
    (4, 4)
]

let R2 = [
    (1, 1)
    (2, 2)
    (1, 3)
    (3, 1)
    (3, 4)
    (4, 3)
    (3, 3)
    (4, 4)
]

let R3 = [
    (1, 1)
    (2, 2)
    (1, 3)
    (3, 1)
    (3, 4)
    (1, 4)
    (4, 3)
    (4, 1)
    (3, 3)
    (4, 4)
]


let RR = [
    ("R1", R1)
    ("R2", R2)
    ("R3", R3)
]

RR
|> Seq.iter(fun (n, r) ->
    printfn "%s" n
    printfn "is reflexive %b" (r |> isReflexive)
    printfn "is symmetric %b" (r |> isSimmetric)
    printfn "is transitive %b" (r |> isTransitive)
)

