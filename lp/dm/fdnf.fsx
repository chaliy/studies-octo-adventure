let generateTable() =
// TODO Need something smarter to generate table
//    seq {
//        
//        for i = 0 to 1 do
//            for j = 0 to 1 do
//                for y = 0 to 1 do
//                    yield (i = true, j = true, y = true)
//    }

    [false; true]
        |> Seq.collect(fun b1 -> [(b1, false); (b1, true)])
        |> Seq.collect(fun (b1, b2) -> [(b1, b2, false); (b1, b2, true)])

let truth3 f  =
    generateTable() 
    |> Seq.map(fun (p, q, r) -> (p, q, r, (f p q r)))    

let printTruth3 varn t =
    printfn "%s %s %s = %s" (varn 0) (varn 1) (varn 2) "R"
    let z v = if v then 1 else 0
    t |> Seq.iter(fun (a, b, c, d) -> printfn "%d %d %d = %d" (z a) (z b) (z c) (z d))

let fdnf3 varn t =
    let f vn v = 
        match v with
        | true -> (varn vn)
        | false -> sprintf "¬%s" (varn vn)

    t
    |> Seq.where(fun (a, b, c, r) -> r)
    |> Seq.map(fun (a, b, c, r) -> sprintf "( %s ^ %s ^ %s )" (f 0 a) (f 1 b) (f 2 c))
    |> String.concat(" ˅ ")

// Example from task :)
let f1 p q r =    

    //((r -> ¬p) OR q) ~ (r XOR q)

    let impl x y =
        if (x = true && y = false) then false
        else true
        
    ((impl r (not p)) || q) = (r <> q)
           
let varn i = ["P"; "Q"; "R"].[i]
let table = truth3 f1
printfn "Truth Table"
printTruth3 varn table

let f1_fdnf = fdnf3 varn table
printfn "FDNF"
printfn "%s" f1_fdnf