$(document).ready(function () {
    let idCategoria = -1;
    let idRistorante = -1;
    let vettoreIngredienti1 = [];

    $('#aggiungiIngrediente').click(function() {
        const input = $('input#ingredienti');
        const valore = input.val();
        
        if (valore) {
            vettoreIngredienti1.push(valore);
            $('#listaIngredienti').append(`
            <a class="list-group-item list-group-item-action list-group-item-warning" id="eliminaIngrediente">${valore}</a>`);
            console.log("Sono nel Vettore" + vettoreIngredienti1);
        }
        input.val('');
        input.focus();
    });
    $('#listaIngredienti').on('click', '#eliminaIngrediente', function() { 
        const nome = $(this).parent().attr('nome');
        const ingrediente = {
            "nome": nome
        };
        $(this).parent().remove();
        const indiceIngrediente = vettoreIngredienti1.indexOf(ingrediente);
        vettoreIngredienti1.splice(indiceIngrediente, 1);
    });

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
        let ingredienti = [];
        vettoreIngredienti1.forEach(ingrediente => ingredienti.push(ingrediente));
        let piattoIngre = vettoreIngredienti1;
        idCategoria = piatto.categoria.id;
        idRistorante = piatto.ristorante.id;
     //   addPiatto(piatto);
        if(piatto, piattoIngre) {
            addPiatto(piatto, piattoIngre);
        } 
        
        $('#nomePiatto').val('');
        $('#prezzo').val('');
        $('#selectCategorie').val('');
        $('#ristorante').val('');
    })
 /*   function addPiatto(piatto, piattoIngre){
        $.ajax({
            type: 'POST',
            url: `/user/piattiuser/aggiungi/${idRistorante}/${idCategoria}`,
            data: JSON.stringify(piatto, piattoIngre),
            contentType: 'application/json',
            dataType: 'json',
            error: function(response) {
                console.log("Risposta " + piatto.nome);
                console.log("ID Piatto" + response.id);
                idPiatto = +response.id;
               /* for (let ingrediente of piattoIngre.ingredienti) {
                    $.ajax({
                        type: 'POST',
                        url: `/user/ingredientiuser/aggiungi/${idPiatto}`,
                        data: JSON.stringify(ingrediente),
                        contentType: "application/json",
                        dataType: 'json',
                        success: function(data) {
                            console.log(ingrediente);
                        }
                    });
                }*/ /*
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
                      window.location.href='ristorantiUser.html';
                    }, 1500);
                },
                
                /*    success: function(response){
                    Swal.fire({
                        icon: 'error',
                        title: 'ATTENZIONE!',
                        text: 'Riprova'
                    })
                }*/ /*
        })
        
    }*/

    function addPiatto(piatto, piattoIngre){
        $.ajax({
            type: 'POST',
            url: `/user/piattiuser/aggiungi/${idRistorante}/${idCategoria}`,
            data: JSON.stringify(piatto, piattoIngre),
            contentType: 'application/json',
            dataType: 'json',
            error: function(response) {
                console.log("Risposta " + piatto.nome);
                console.log("ID Piatto" + response.id);
                idPiatto = +response.id;
             /*   for (let ingrediente of piattoIngre.ingredienti) {
                    $.ajax({
                        type: 'POST',
                        url: `/user/ingredientiuser/aggiungi/${idPiatto}`,
                        data: JSON.stringify(ingrediente),
                        contentType: "application/json",
                        dataType: 'json',
                        success: function(data) {
                            console.log(ingrediente);
                        }
                    });
                }*/
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
                      window.location.href='ristorantiUser.html';
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
            $.get('/categorieuser', function (selectCategoria) {
                const categoriaSelect = $('#selectCategorie');
                for (let i = 0; i < selectCategoria.length; i++) {
                    $(`<option id='catSelect' value="${selectCategoria[i].id}">${selectCategoria[i].nome}</option>`)
                    .hide().appendTo(categoriaSelect).fadeIn(i * 100);
                }
              })
        } 
        getCategorieSelect();

        function getRistoratori() {
            $.get('/user/ristorantiuser', function (selectRistoranti) {
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