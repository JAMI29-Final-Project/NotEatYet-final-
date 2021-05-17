$(document).ready(function () {
    function addUser(user){
        $.ajax({
            type: "POST",
            url: "/signup/add",
            data: JSON.stringify(user),
            contentType: 'application/json',
            success: function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'INSERITO!',
                    text: 'Utente inserito Correttamente',
                    showConfirmButton: false,
                    timer: 1500
                })
            },
            error: function () {
                Swal.fire({
                      icon: 'error',
                      title: 'ATTENZIONE!',
                      text: 'Riprova'
                    })           
            }
        });
    }

    $('#signup').click(function (){
        const user = {
            nome: $('#nome').val(),
            cognome: $('#cognome').val(),
            datadinascita: $('#datadinascita').val(),
            email: $('#email').val(),
            username: $('#username').val(),
            password: $('#password').val()
        }
        addUser(user);

        $('#nome').val('');
        $('#cognome').val('');
        $('#datadinascita').val('');
        $('#email').val('');
        $('#username').val('');
        $('#password').val('');
    })
});