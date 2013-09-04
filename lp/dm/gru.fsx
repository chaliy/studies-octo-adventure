open System
open System.Collections.Generic

let vertices g =
    g
    |> Seq.collect (fun (l,r) -> [l; r])
    |> Seq.distinct

let edges g = List.map id g

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

let isAntisimmetric g =
    (edges g)
    |> Seq.forall(fun (l,r) -> 
        if (eexists (r,l) g) then
            r = l
        else
            true
    )

let isTransitive g =
    (edges g)
    |> Seq.forall(fun (l,r) ->
        let pe = (edges g) |> Seq.tryFind(fun (pl, pr) -> r = pl)
        match pe with
        | Some(pl, pr) -> 
            (edges g) |> Seq.exists(fun (tl, tr) -> tl =l && tr = pr)
        | None -> false
    )