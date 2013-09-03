// lexicographical permutation

// NOTE: this is play ground, not real implementation!

let next (ss : int array) =

    let mutable d = false 
    let mutable i = ss.Length - 1
    while (d = false) do
        let l = ss.[i - 1]
        let r =  ss.[i]
        printfn "l %A r %A" l r
        if (l < r) then
            ss.[i] <- l
            ss.[i - 1] <- r
            d <- true
        i = i - 1

    
let s = [|4;3;2;5;6;1|]
printfn "%A" s
next s
//printfn "%A" s
next s
//printfn "%A" s
