open System
open System.Collections.Generic

let vertices g =
    g
    |> Seq.collect (fun (l,r) -> [l; r])
    |> Seq.distinct

let edges = List.map id    

let neighbors x g =
    g    
    |> List.choose(fun xe ->
        match xe with
        | (xs, xt) when xs = x -> Some(xt)
        | (xs, xt) when xt = x -> Some(xs)
        | _ -> None)


let eexists x g =
    (edges g) 
    |> Seq.exists(fun i -> i = x)

let isReflexive g =
    (vertices g)
    |> Seq.map(fun v -> (v, v))
    |> Seq.forall(fun e -> eexists e g) 

let isSimmetric g =
    (edges g)
    |> Seq.forall(fun (l,r) -> eexists (r,l) g)

let isTransitive g =
    (edges g)
    |> Seq.forall(fun (l,r) ->
        let pe = (edges g) |> Seq.tryFind(fun (pl, pr) -> r = pl)
        match pe with
        | Some(pl, pr) -> 
            (edges g) |> Seq.exists(fun (tl, tr) -> tl =l && tr = pr)
        | None -> false
    )

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

    