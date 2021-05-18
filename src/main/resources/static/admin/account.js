$(document).ready(function () {
    function getAccount() {
        $.get('/admin/utenti', function (account) {
            const accountLista = $('#listaAccount');
            for (let i = account.length -1; i >= 0; i--) {
                $(`<tr id='riga-${account[i].id}'>
                <td>${account[i].nome}</td>
                <td>${account[i].cognome}</td>
                <td>${account[i].datadinascita}</td>
                <td>${account[i].email}</td>
                <td>${account[i].username}</td>
                <td>
                    <div class="btn-group" role="group">
                        <button id="btnGroupDrop1" type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Opzioni</button>
                            <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                <li><a class="dropdown-item btn-modificaAccount" data-bs-toggle="modal" data-bs-target="#account" data-id='${account[i].id}'>Modifica</a></li>
                                <li><a class="dropdown-item btn-eliminaAccount" data-id='${account[i].id}'>Elimina</a></li>
                            </ul>
                    </div>
                </td>
            </tr>`).hide().appendTo(accountLista).fadeIn(i * 20);
            }
          })
    }
    getAccount();

    function deleteAccount(id) {
        let idPagina = $(`#riga-${id}`);
        $.ajax({
            type: "DELETE",
            url: `/admin/utenti/${id}`,
            success: function (response) {
                idPagina.slideUp(300, function () {
                    idPagina.remove(); 
                })
            },
            error: function(error) {
                alert("Errore durante la cancellazione. Riprovare."); 
            }
        });
      }
      $('#listaAccount').on('click', '.btn-eliminaAccount', function() {
        const id = $(this).attr('data-id');
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-danger',
                cancelButton: 'btn btn-primary mx-2'
            },
            buttonsStyling: false
          })
          swalWithBootstrapButtons.fire({
            title: 'Sei Sicuro?',
            text: "Operazione Irreversibile!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Elimina',
            cancelButtonText: 'Esci',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              swalWithBootstrapButtons.fire(
                'Cancellato!',
                'Account è stato Eliminato.',
                'success'
              )
              deleteAccount(id);
            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Uscita',
                'Account è salvo',
                'error'
              )
            }
          })
      });

    let editMode = false;
    let idModifica = -1;
    function modificaAccount(account) {
        $.ajax({
            type: "PUT",
            url: `/admin/utenti/modifica`,
            data: JSON.stringify(account),
            contentType: 'application/json',
            dataType: 'json',
            success: function (response) {
                    editMode = false;
                    idModifica = -1;
            },
           /* error: function (error) {
                alert("Problema nella modifica");                
            }*/
        });
    }
    $('#listaAccount').on('click', '.btn-modificaAccount', function () {
        editMode = true;
        const id = +$(this).attr('data-id');
        idModifica = id;
        $.get(`/admin/utenti/${id}`, function(modificaAccount) {
            $('#nome').val(modificaAccount.nome);
            $('#cognome').val(modificaAccount.cognome);
            $('#datadinascita').val(modificaAccount.datadinascita);
            $('#email').val(modificaAccount.email);
            $('#username').val(modificaAccount.username);
            $('#modificaAccountTitle').text('Modifica ' + modificaAccount.nome);
            $('#modificaAccount').text('Modifica ' + modificaAccount.nome);
        });
    });
    $('#modificaAccount').click(function () {
        const account = {
            nome: $('#nome').val(),
            cognome: $('#cognome').val(),
            datadinascita: $('#datadinascita').val(),
            email: $('#email').val(),
            username: $('#username').val()         
        }
        console.log(account);
        if (editMode) {
            Swal.fire({
                icon: 'question',
                title: 'Vuoi salvare la Modifica di ' + account.nome + '?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: `Salva`,
                denyButtonText: `Non Salvare`,
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  Swal.fire('Salvato!', '', 'success')
                  account.id = idModifica;
                  modificaAccount(account);
                  setTimeout(function () {
                    window.location.href='gestione_account.html';
                  }, 2000);
                } else if (result.isDenied) {
                  Swal.fire('Modifiche non salvate', '', 'info')
                }
              })     
        }
    })

});