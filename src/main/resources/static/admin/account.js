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
                                <li><a class="dropdown-item btn-modificaAccount" data-bs-toggle="modal" data-bs-target="#modificaAccount" data-id='${account[i].id}'>Modifica</a></li>
                                <li><a class="dropdown-item btn-eliminaAccount" data-id='${account[i].id}'>Elimina</a></li>
                            </ul>
                    </div>
                </td>
            </tr>`).hide().appendTo(accountLista).fadeIn(i * 20);
            }
          })
    }
    getAccount();

    function deleteRistorante(id) {
        let idPagina = $(`#riga-${id}`);
        $.ajax({
            type: "DELETE",
            url: `ristoranti/${id}`,
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
      $('#listaRistoranti').on('click', '.btn-elimina-risto', function() {
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
                'Il tuo Ristorante è stato Eliminato.',
                'success'
              )
              deleteRistorante(id);
            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Uscita',
                'Il tuo Ristorante è salvo',
                'error'
              )
            }
          })
      });

    let editMode = false;
    let idModifica = -1;
    function modificaRistorante(ristorante) {
        $.ajax({
            type: "PUT",
            url: `/admin/ristoranti`,
            data: JSON.stringify(ristorante),
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
            $('#regioneRistorante').val(modifica.regione);
            $('#viaRistorante').val(modifica.via);
            $('#ncivico').val(modifica.ncivico);
            $('#modificaRistoranteTitle').text('Modifica ' + modifica.ragionesociale);
            $('#modificaRistorante').text('Modifica ' + modifica.ragionesociale);
            $('#title').text('Modifica ' + modifica.ragionesociale);
        });
    });
    $('#modificaRistorante').click(function () {
        const ristorante = {
            ragionesociale: $('#ragionesociale').val(),
            piva: $('#piva').val(),
            citta: $('#cittaRistorante').val(),
            regione: $('#regioneRistorante').val(),
            via: $('#viaRistorante').val(),
            ncivico: $('#ncivico').val()            
        }
        console.log(ristorante);
        if (editMode) {
            Swal.fire({
                icon: 'question',
                title: 'Vuoi salvare la Modifica di ' + ristorante.ragionesociale + '?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: `Salva`,
                denyButtonText: `Non Salvare`,
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  Swal.fire('Salvato!', '', 'success')
                  ristorante.id = idModifica;
                  modificaRistorante(ristorante);
                  setTimeout(function () {
                    window.location.href='ristoranti.html';
                  }, 2000);
                } else if (result.isDenied) {
                  Swal.fire('Modifiche non salvate', '', 'info')
                }
              })     
        }
    })

});