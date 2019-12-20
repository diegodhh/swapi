let color = new Map()
color.set('green', "verdes")
color.set('red', "rojos")
color.set('brown', 'marrones')
color.set('blue', 'azules')
color.set('yellow', 'amarillos')
color.set('orange','naranajas')
color.set('grey', 'grises')
color.set('black', 'negros')
color.set('blue-gray', 'grises azulados')
color.set('hazel', 'avellanas')
color.set('pink', 'rosados')
color.set('white', 'blancos')
color.set('green, yellow', 'verdes amarillentos')
color.set('dark', 'oscuros')
color.set('unknown', 'desconocidos')
color.set('golden', 'dorados')
/// traductor provisiorio por si no llego a tiempo  a hacerlo en el backend



export const translateColor = (str) =>{
    str= str.toLowerCase()
    if (str.indexOf(',') !== -1) {
        str = str.trim()
        let colores = str.split(',')
        
        colores = colores.map((colorItem)=>{
            colorItem= colorItem.trim()
            return color.get(colorItem)? color.get(colorItem): colorItem
        })
        return colores.join()
    }
    let translated = color.get(str)? color.get(str):str;
    return translated;
}