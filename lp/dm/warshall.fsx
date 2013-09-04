#r ".\\packages\\FSPowerPack.Core.Community.3.0.0.0\\Lib\\Net40\\FSharp.PowerPack.dll"

let ensure v =
    if v = false then
        failwith "Boom!"

let anymatrix = Matrix.Generic.ofList

let warshall (M : Matrix<int>) =
    seq {
        let M2 = M.Copy()
        let (n,_) = M2.Dimensions        

        let t x y = M2.[x, y] = 1

        for k = 1 to n do
            for i = 0 to n - 1 do
                for j = 0 to n - 1 do 
                    M2.[i, j] <- if ((t i j) || ( (t i (k-1)) && (t (k-1) j))) then 1 else 0

            yield M2
    }



// Selfschecks
let test M ME =
    let MR = warshall M |> Seq.last
    ensure (MR = ME)

test ( anymatrix [
            [0; 0; 0; 1]
            [1; 0; 1; 0]    
            [1; 0; 0; 1]
            [0; 0; 1; 0]
     ] )
     ( anymatrix [
            [1; 0; 1; 1]
            [1; 0; 1; 1]
            [1; 0; 1; 1]
            [1; 0; 1; 1]
     ] )

test ( anymatrix [
            [0; 1; 0; 0]
            [0; 0; 0; 1]    
            [0; 0; 0; 0]
            [1; 0; 1; 0]
     ] )
     ( anymatrix [
            [1; 1; 1; 1]
            [1; 1; 1; 1]
            [0; 0; 0; 0]
            [1; 1; 1; 1]
     ] )

 // Task

let A = anymatrix [
                    [1; 0; 1; 0]
                    [0; 1; 0; 0]    
                    [1; 0; 1; 1]
                    [0; 0; 1; 1]
                ]

let AR = warshall A

AR
|> Seq.iteri(fun i R -> printfn "Step #%d\n%A" i R)