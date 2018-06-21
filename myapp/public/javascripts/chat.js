window.onload=function(){
    var mensajes = [];
    var socket= io.connect('http://localhost:3000');
    var txArea1 = document.getElementById('txArea1');
    var txArea2 = document.getElementById('txArea2');
    var boton = document.getElementById('btnEnviar');
    var user = document.getElementById('hid').value;

    socket.on('message',function(data){
        if(data.message){
            imprimir(data.message)
        }
        else{
            console.warn("Hay un problema: ",data);
        }
    });

    socket.on('disconnect',function(){
        socket.emit('send',{message:'Adios'});
    });

    btnEnviar.onclick = function(){
        var d = new Date();
        var hora = d.getHours();
        var min = d.getMinutes();
        var seg = d.getSeconds();

        var text = txArea2.value;
        text=user+"("+(hora+":"+len2(min)+":"+len2(seg))+"): "+text;
        imprimir(text);
        txArea2.value='';
        socket.emit('send',{message:text});
    }


    function len2(elem){
        if(elem<9){
            return "0"+elem;
        }
        return elem;
    }

    function imprimir(mensaje){
        mensajes.push(mensaje);
        var html='';
        for(var i=0; i<mensajes.length; i++) {            
            html += mensajes[i] + '\n';
        }
        txArea1.innerHTML = html;
    }

}



