$(document).ready(function () {
    let idCategoria = -1;
    let idRistorante = -1;

    $('#aggiungiPiatto').click(function () {
        const piatto = {
            nome: $('#nomePiatto').val(),
            prezzo: $('#prezzo').val(),
            categoria: {
                id: $('#selectCategorie').val(),
            }, 
            ristorante: {
                id: $('#ristorante').val(),
            }    
        }
        idCategoria = piatto.categoria.id;
        idRistorante = piatto.ristorante.id;
        addPiatto(piatto);
        
        $('#nomePiatto').val('');
        $('#prezzo').val('');
        $('#selectCategorie').val('');
        $('#ristorante').val('');
    })
    function addPiatto(piatto){
        console.log(piatto);
        $.ajax({
            type: 'POST',
            url: `/piatti/aggiungi/${idRistorante}/${idCategoria}`,
            data: JSON.stringify(piatto),
            contentType: 'application/json',
            dataType: 'json',
            error: function(response) {
            console.log(response);
            idCategoria = -1;
            idRistorante = -1;
                Swal.fire({
                    icon: 'success',
                    title: 'INSERITO!',
                    text: 'Aggiunta andata a buon fine',
                    showConfirmButton: false,
                    timer: 1500
                })
                  setTimeout(function () {
                      window.location.href='menu.html';
                    }, 1500);
                },
                
                /*    success: function(response){
                    Swal.fire({
                        icon: 'error',
                        title: 'ATTENZIONE!',
                        text: 'Riprova'
                    })
                }*/
        })
    }
        function getCategorieSelect() {
            $.get('/categorie', function (selectCategoria) {
                const categoriaSelect = $('#selectCategorie');
                for (let i = 0; i < selectCategoria.length; i++) {
                    $(`<option id='catSelect' value="${selectCategoria[i].id}">${selectCategoria[i].nome}</option>`)
                    .hide().appendTo(categoriaSelect).fadeIn(i * 100);
                }
              })
        } 
        getCategorieSelect();

        function getRistoratori() {
            $.get('/ristoranti', function (selectRistoranti) {
                const ristoranteSelect = $('#ristorante');
                console.log(selectRistoranti);
                for (let i = 0; i < selectRistoranti.length; i++){
                    $(`<option id='ristoranteSelect' value="${selectRistoranti[i].id}">${selectRistoranti[i].ragionesociale}</option>`)
                    .hide().appendTo(ristoranteSelect).fadeIn(i * 100);
                }
            })
        }
        getRistoratori();
});