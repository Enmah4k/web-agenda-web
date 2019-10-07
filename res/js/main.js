var data;

var dataToSend = {
    nombre: "",
    apellido: "",
    telefono: ""
}

var url = 'http://www.raydelto.org/agenda.php';

function createContacts(id){
    if(data[id].nombre != "" && data[id].apellido != "" && data[id].telefono != ""){
        var contactCard = document.createElement("div");
        contactCard.classList.add("contact-card");
        contactCard.id = id;

        var span1 = document.createElement("span");
        span1.classList.add("c-name");
        span1.innerHTML= data[id].nombre+" "+data[id].apellido;

        var span2 = document.createElement("span");
        span2.classList.add("c-number");
        span2.innerHTML = data[id].telefono;

        contactCard.appendChild(span1);
        contactCard.appendChild(span2);

        var cont = document.getElementById("contacts");
        cont.appendChild(contactCard);
        changeColorBG(id);
    }
}

function init(){
    fetch(url).then((response) => {
        return response.json();
    }).then((myJson) => {
        data = myJson;
        for(let i = 0; i < myJson.length; i++){
            createContacts(i);
        }
    });
}

function changeColorBG(id){
    let num = Math.floor(Math.random() * 7);
    let color;

    switch(num) {
        case 0:
            //Rojo
            color = "#CC231F";
            break;
        case 1:
            //Verde
            color = "#2F9917";
            break;
        case 2:
            //Azul
            color = "#147ECC";
            break;
        case 3:
            //Naranja
            color = "#FFA140";
            break;
        case 4:
            //Amarillo
            color = "#FFCD01";
            break;
        case 5:
            //Purpura
            color = "#7000CC";
            break;
        default:
            //Rosa
            color = "#CC5AA7";
            break;
      }
    
    document.getElementById(id).style.backgroundColor = color;
}


function guardarEnAgenda(){
    let nombre = document.getElementById("name").value;
    let apellido = document.getElementById("lastname").value;
    let telefono = document.getElementById("phone").value;

    if(nombre != "" || apellido != "" || telefono != ""){
        dataToSend.nombre = nombre;
        dataToSend.apellido = apellido;
        dataToSend.telefono = telefono;

        (async () => {
            const rawResponse = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });
            const content = await rawResponse.json();

        })().then(() => {
            location.reload(true);
        });
    }
}

init();