const msgContainer = document.getElementById('msg-container');
const name = document.getElementById('name');
const msg = document.getElementById('msg-val');
const send = document.getElementById('send');
const form = document.getElementById('form');
const online = document.getElementById('online-status');
let username = ''


const socket = io.connect('http://localhost:4000');

send.addEventListener('click',function(e){
    e.preventDefault();

    if(username == ''){
        console.log('called');
        username = name.value
        name.style.display = "none";
    }

    socket.emit('chat',{
        message:msg.value,
        name:username,
    });

    form.reset(); 

});

name.addEventListener('keyup',function(){

    socket.emit('online',{name:name.value});

});


socket.on('online',function(data){

    online.innerHTML = `<em>${data.name}</em> is online`;

});


socket.on('chat',function(data){
    console.log(data);
    msgContainer.innerHTML += `<div id=${data.id} class="row msg">

                    <div class="col-lg-1 col-sm-1 pfp-img">
                        <img src="img/chat.png" height="50px" class="rounded-circle" />
                    </div>

                    <div class="col-lg-6 msg-bd">

                        <div class="name-status">
                            <span> ${data.name}</span>
                        </div>

                        ${data.message}
                        <div class="status">
                            <span class="deliverd"> deliverd</span>
                            <span class="delete "> delete</span>
                        </div>

                    </div>



                </div>`; 

}); 


msgContainer.addEventListener('click',function(e){

    socket.emit('delete', {id:e.target.parentElement.parentElement.parentElement.getAttribute('id')});

    msgContainer.removeChild(e.target.parentElement.parentElement.parentElement);

    

    

});

socket.on('delete',function(data){

    const rem = document.getElementById(data.id);
    rem.remove();

});
