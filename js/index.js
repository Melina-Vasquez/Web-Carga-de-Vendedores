class Persona {

    constructor(){
    this.Cuil,
    this.Apellido,
    this.Nombre,
    this.FechadeNacimiento
    }

    getPersona(){

        return `${this.FechadeNacimiento}, ${this.Apellido}, ${this.Nombre} (${this.Cuil}) `;
    }

}  

class Vendedor extends Persona{

    constructor(){
        super(),
        this.NroVendedor,
        this.Venta,
        this.CantProductos,
        this.Fecha

    }

    getPromVentasVendedor(){
        return parseInt(this.Venta) / parseInt(this.CantProductos); 
    }

    getVendedor() {
        return `${this.FechadeNacimiento}, ${this.Apellido}, ${this.Nombre}, (${this.Cuil}), ${this.Venta}, ${this.Fecha} `;
    }


}

let listaVendedores= JSON.parse( localStorage.getItem("lsVendedores")) || [];


function Agregar(){

        
        const nrovendedor= document.getElementById("txtNroVendedor")
        const venta= document.getElementById("txtVenta")
        const cantproductovendido= document.getElementById("txtCantdeProductosVendidos")
        const fecha= document.getElementById("txtFecha")
        const cuil = document.getElementById("txtCuil")
        const apellido= document.getElementById("txtApellido")
        const nombre= document.getElementById("txtNombre")
        const fechanacimiento= document.getElementById("txtFechadeNacimiento")

        let oVendedor = new Vendedor();
       
        oVendedor.NroVendedor = nrovendedor.value;
        oVendedor.Venta = venta.value;
        oVendedor.CantProductos = cantproductovendido.value;
        oVendedor.Fecha = fecha.value;
        oVendedor.Cuil = cuil.value;
        oVendedor.Apellido = apellido.value;
        oVendedor.Nombre = nombre.value;
        oVendedor.FechadeNacimiento = fechanacimiento.value;

        listaVendedores.push(oVendedor);

        localStorage.removeItem("lsVendedores");
        localStorage.setItem("lsVendedores", JSON.stringify(listaVendedores))

        VerListaVendedores();

        nrovendedor.value= "";
        venta.value= "";
        cantproductovendido.value= "";
        fecha.value= "";
        cuil.value= "";
        apellido.value= "";
        nombre.value= "";
        fechanacimiento.value= "";

}

function Estadisticas(){

    let acum = 0;
    let may = 0;

    let men = parseInt(listaVendedores[0].Venta) / parseInt(listaVendedores[0].CantProductos);

    let mayorVenta = 0;

    var vendMayorProm = "";
    var vendMenorProm = ""; 
    var vendMayorVenta = "";
    for( let obj of listaVendedores){

        let o = new Vendedor();
        Object.assign(o,obj);
        if(o.Venta != "" || o.Venta != null){ 
            acum += parseInt(o.Venta);
        }
        
        let prom_aux = o.getPromVentasVendedor();
        if(prom_aux > may){
            may = prom_aux;
            vendMayorProm = o.getVendedor();
        }
        if(men >= prom_aux){ 
            men = prom_aux;
            vendMenorProm = o.getVendedor(); 
        }
        if(mayorVenta < parseInt(o.Venta)){
            mayorVenta = parseInt(o.Venta);
            vendMayorVenta = o.Apellido +", " + o.Nombre;
        }     
    }

    document.getElementById("lblVentaTotal").innerHTML = acum;
    document.getElementById("lblMayorPromedioVentas").innerHTML = vendMayorProm;
    document.getElementById("lblMenorPromedioVentas").innerHTML = vendMenorProm; 
    document.getElementById("lblVendedorMasVentas").innerHTML = vendMayorVenta; 

    VerListaVendedores();

}


function VerListaVendedores(){

    const tbody = document.querySelector("tbody");   
    tbody.innerHTML = "";

    for( let obj of listaVendedores){

        let Vend = new Vendedor();
        Object.assign(Vend,obj);

        var td0 = document.createElement("td");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var td4 = document.createElement("td");
        var td5 = document.createElement("td");
        var td6 = document.createElement("td");
        var td7 = document.createElement("td");

        td0.innerHTML = Vend.NroVendedor;
        td1.innerHTML = Vend.Venta;
        td2.innerHTML = Vend.CantProductos;
        td3.innerHTML = Vend.Fecha;
        td4.innerHTML = Vend.Cuil;
        td5.innerHTML = Vend.Apellido.toUpperCase();
        td6.innerHTML = Vend.Nombre.toUpperCase();
        td7.innerHTML = Vend.FechadeNacimiento; 

        const tr = document.createElement("tr");
        tr.appendChild(td0);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);

        tbody.appendChild(tr);
    }     
}


function Eliminar()
{
    localStorage.removeItem("lsVendedores");

    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";

    document.getElementById("lblVentaTotal").innerHTML = 0;
    document.getElementById("lblMayorPromedioVentas").innerHTML = 0;
    document.getElementById("lblMenorPromedioVentas").innerHTML = 0; 
    document.getElementById("lblVendedorMasVentas").innerHTML = 0;

}
