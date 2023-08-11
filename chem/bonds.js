function Desolver(bond) {
    result = [""]
    Capitals = ["Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Z","X","C","V","B","N","M"]
    for (let index = 0; index < bond.length; index++) {
        for (let i = 0; i < Capitals.length; i++) {
            if (bond[index] == Capitals[i]) {
                result.push("")
            }
            result[result.length-1] += bond[index]
        }
    }
    return result
}
function Textizer(atoms) {
    Result = []
    Numbers = ["Deca","Mono","Di","Tri","Tetra","Penta","Hexa","Hepta","Octa","Nona"] // Deca is 10 and Mono is 1 and Di is 2 and so on!
    for (let index = 0; index < atoms.length; index++) {
        Result[index] = ""
        for (let n = 0; n < 10; n++) {
            if (atoms[atoms.length-1] == n)
                Result[index] += Numbers[n]
        }
    }
    for (let index = 0; index < atoms.length; index++) {
        if (atoms[index].length == 3)
            GetAtomName(atoms[index][0] + atoms[index][1])
        else
            GetAtomName(atoms[index][0])
    }
}
function GetName(bond) {
    Atoms = ""; 
    if (MetalState(Desolver(bond)[0]
        .replaceAll("1","")
        .replaceAll("2","")
        .replaceAll("3","")
        .replaceAll("4","")
        .replaceAll("5","")
        .replaceAll("6","")
        .replaceAll("7","")
        .replaceAll("8","")
        .replaceAll("9","")
        .replaceAll("0","") == 0)
                && 
        MetalState(Desolver(bond)[1]
        .replaceAll("1","")
        .replaceAll("2","")
        .replaceAll("3","")
        .replaceAll("4","")
        .replaceAll("5","")
        .replaceAll("6","")
        .replaceAll("7","")
        .replaceAll("8","")
        .replaceAll("9","")
        .replaceAll("0","")) == 0) {
            
        }
}