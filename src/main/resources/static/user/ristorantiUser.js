$(document).ready(function () {
    // RistorantiUser.html Lista Ristoranti con dettagli utente
    function getRistorantiUser() {
        $.get(`/user/usersession`, function (dettaglioUser) {
            console.log(dettaglioUser);
            const dettaglioUserRis = $('#dettaglioUser');
            $('#titleAccount').text('Ristoranti di ' + dettaglioUser.nome);
            let row = `
            <h2 class='fw-light text-dark'><strong class="fw-bolder">Dettagli utente</strong></h2> 
            <h4 class='fw-light text-dark'><strong class="fw-bolder">Nome: </strong>${dettaglioUser.nome}</h4> 
            <h4 class='fw-light text-dark'><strong>Cognome: </strong>${dettaglioUser.cognome}</h4>   
            <h4 class='fw-light text-dark'><strong>Data di Nascita: </strong>${dettaglioUser.datadinascita}</h4> 
            <h4 class='fw-light text-dark'><strong>E-Mail: </strong>${dettaglioUser.email}</h4>
            <h4 class='fw-light text-dark'><strong>Username: </strong>${dettaglioUser.username}</h4>
			`;
            $(row).hide().appendTo(dettaglioUserRis).fadeIn(500);
        })
        $.get('/user/ristorantiuser', function (resume) {
            console.log(resume);
            const listaRistorantiUser = $('#listaRistorantiUser');
            for (let i = resume.length - 1; i >= 0; i--) {
                let img = '';
                if (resume[i].immagini === null) {
                    img = '../logos/logo.png';
                } else {
                    img = './../upload/' + resume[i].immagini;
                }
                $(`<tr id='riga-${resume[i].id}'>
                <td><img src='${img}' alt='logo' style='width: 50px; border-radius: 50%;'></td>
                <td class='ragionesociale'>${resume[i].ragionesociale}</td>
                <td class='piva'>${resume[i].piva}</td>
                <td class='via'>${resume[i].via}</td>
                <td class='citta'>${resume[i].citta}</td>
                <td class='regione'>${resume[i].regione}</td>
                <td>
                    <div class="btn-group" role="group">
                        <button id="btnGroupDrop1" type="button" class="btn bg-yellow text-btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Opzioni</button>
                            <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                <li><a class="dropdown-item btn-dettaglio" data-bs-toggle="modal" data-bs-target="#dettaglio" data-id='${resume[i].id}'>Dettaglio</a></li>
                                <li><a class="dropdown-item btn-modifica-risto" data-bs-toggle="modal" data-bs-target="#modifica" data-id='${resume[i].id}'>Modifica</a></li>
                                <li><a class="dropdown-item btn-elimina-risto" data-id='${resume[i].id}'>Elimina</a></li>
                            </ul>
                    </div>
                </td>
            </tr>`).hide().appendTo(listaRistorantiUser).fadeIn(i * 20);
            }
        })
    }

    getRistorantiUser();

    // Svuota i 2 modali al click del pulsante close
    $('#ristoranteDettaglioClose').click(function () {
        $('#dettaglioRis').html('');
        $('#listaMenuDettaglio').html('');
    });
    $('#listaDettaglioClose').click(function () {
        $('#dettaglioPiatto').html('');
        $('#listaingre').html('');
    });
    $('#ristoranteModificaClose').click(function () {
        $('#listaModificaIngrediente').html('');
        $('#listaIngredientiModifica').html('');
    });

    // Dettaglio Del Ristorante nella lista principale con la lista dei piatti
    $('#listaRistorantiUser').on('click', '.btn-dettaglio', function () {
        const idristorante = $(this).attr('data-id');
        getRisto(idristorante);
    });

    function getRisto(idristorante) {
        $.get(`/user/ristorantiuser/${idristorante}`, function (dettaglio) {
            console.log(dettaglio);
            const dettaglioRis = $('#dettaglioRis');
            $('#title').text(dettaglio.ragionesociale + ' Nel Dettaglio');
            $('#menuDettaglio').text("Menu di " + dettaglio.ragionesociale);
            let img = '';
                if (dettaglio.immagini === null) {
                    img = '../logos/logo.png';
                } else {
                    img = '../upload/' + dettaglio.immagini;
                }
            let row = `
            <img src='${img}' alt='logo' style='width: 150px; border-radius: 50%;'>
            <hr>
            <h4 class='fw-light text-dark'><strong class="fw-bolder">Nome: </strong>${dettaglio.ragionesociale}</h4> 
            <h4 class='fw-light text-dark'><strong>Partita IVA: </strong>${dettaglio.piva}</h4>   
            <h4 class='fw-light text-dark'><strong>Indirizzo: </strong>${dettaglio.via} ${dettaglio.ncivico}</h4> 
            <h4 class='fw-light text-dark'><strong>Citta: </strong>${dettaglio.citta}</h4>
            <h4 class='fw-light text-dark'><strong>Regione: </strong>${dettaglio.regione}</h4>
			`;
            $(row).hide().appendTo(dettaglioRis).fadeIn(500);
        })
        $.get(`/user/piattiuser/ristoranteid/${idristorante}`, function (listaPiatti) {
            const ristoranteListaPiatti = $('#listaMenuDettaglio');
            for (let i = listaPiatti.length - 1; i >= 0; i--) {
                $(`<tr id='riga-${listaPiatti[i].id}'>
                <td><img src='../categorie/${listaPiatti[i].categoria.immagine}' alt='logo' style='width: 50px; border-radius: 50%;'></td>
                <td>${listaPiatti[i].nome}</td>
                <td>${listaPiatti[i].prezzo} €</td>
                <td>${listaPiatti[i].categoria.nome}</td>
                <td>
                <div class="btn-group" role="group">
                        <button id="btnGroupDrop1" type="button" class="btn bg-yellow text-btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Opzioni</button>
                            <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                <li><a class="dropdown-item btn-dettaglioPiatto" data-bs-toggle="modal" data-bs-target="#dettaglioPiat" data-idLista='${listaPiatti[i].id}'>Dettaglio</a></li>
                                <li><a class="dropdown-item btn-modificaPiatto" data-bs-toggle="modal" data-bs-target="#modificaPiat" data-idLista='${listaPiatti[i].id}'>Modifica</a></li>
                                <li><a class="dropdown-item btn-eliminaPiatto" data-idLista='${listaPiatti[i].id}'>Elimina</a></li>
                            </ul>
                    </div>
                </td>
            </tr>`).hide().appendTo(ristoranteListaPiatti).fadeIn(i * 20); //Gestisci i pulsanti
            }
        })
    }

    // Cancella un ristorante dalla lista principale
    function deleteRistorante(id) {
        let idPagina = $(`#riga-${id}`);
        $.ajax({
            type: "DELETE",
            url: `/user/ristorantiuser/${id}`,
            success: function (response) {
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
                        idPagina.slideUp(300, function () {
                            idPagina.remove();
                        })
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
                
            },
            error: function (error) {
                alert("Errore durante la cancellazione. Riprovare.");
            }
        });
    }

    $('#listaRistorantiUser').on('click', '.btn-elimina-risto', function () {
        const id = $(this).attr('data-id');
        deleteRistorante(id);
    });

    //Modifica un ristorante dalla lista principale
    let editMode = false;
    let idModifica = -1;

    function modificaRistorante(ristorante) {
        $.ajax({
            type: "PUT",
            url: `/user/ristorantiuser`,
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

    $('#listaRistorantiUser').on('click', '.btn-modifica-risto', function () {
        editMode = true;
        const id = +$(this).attr('data-id');
        idModifica = id;
        $.get(`/user/ristorantiuser/${id}`, function (modifica) {
            let img = '';
            if (modifica.immagini === null) {
                img = '../logos/logo.png';
            } else {
                img = '../upload/' + modifica.immagini;
            }
        $('#modificaRistoranteLogo').attr('src', img);
            $('#ragionesociale').val(modifica.ragionesociale);
            $('#piva').val(modifica.piva);
            $('#cittaRistorante').val(modifica.citta);
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
                        window.location.href = 'ristorantiUser.html';
                    }, 2000);
                } else if (result.isDenied) {
                    Swal.fire('Modifiche non salvate', '', 'info')
                }
            })
        }
    })

    // Barra di Ricerca
    $("#ricercaRistoranti").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#listaRistorantiUser tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });


    // DETTAGLIO ELIMINA PIATTO
    function detetePiatto(idPiatto) {
        let idPagina = $(`#riga-${idPiatto}`);
        $.ajax({
            type: "DELETE",
            url: `/user/piattiuser/elimina/${idPiatto}`,
            success: function (response) {
                idPagina.slideUp(300, function () {
                    idPagina.remove();
                })
            },
            error: function (error) {
                alert("Errore durante la cancellazione. Riprovare.");
            }
        });
    }

    $('#listaMenuDettaglio').on('click', '.btn-eliminaPiatto', function () {
        const idPiatto = $(this).attr('data-idLista');
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
                    'Il tuo Piatto è stato Eliminato.',
                    'success'
                )
                detetePiatto(idPiatto);
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Uscita',
                    'Il tuo Piatto è salvo',
                    'error'
                )
            }
        })
    });

    //Lista delle categorie per la modifica del piatto
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

    // RECUPERO DATI PER MODIFICA PIATTO MODALE
    let editModePiatto = false;
    let idModificaPiatto = -1;
    let idcategoriaPiatto = -1;
    $('#listaMenuDettaglio').on('click', '.btn-modificaPiatto', function () {
        editModePiatto = true;
        const idModPiatto = +$(this).attr('data-idLista');

        idModificaPiatto = idModPiatto;
        console.log(idModificaPiatto);

        $.get(`/user/piattiuser/piattoid/${idModificaPiatto}`, function (modifica) {
            $('#modificaPiattoLogo').attr('src', '../categorie/' + modifica.categoria.immagine);
            $('#nome').val(modifica.nome);
            $('#categoria').val(modifica.categoria.nome);
            $('#prezzo').val(modifica.prezzo);
            $('#modificaPiattoTitle').text('Modifica ' + modifica.nome);
            $('#modificaPiatto').text('Modifica ' + modifica.nome);
            $('#title').text('Modifica ' + modifica.nome);
        });
        $.get(`/user/ingredientiuser/${idModificaPiatto}`, function (resume) {
            console.log(resume);
            const listaIngredientiUser = $('#listaIngredientiModifica');
            for (let i = 0; i < resume.length; i++) {
                $(`<div class='input-group mb-3' id='riga-${resume[i].id}'>
                <input type='text' id='ingredienti` + i + `' data-idLet='${resume[i].id}' class='form-control' placeholder="Inserire Ingredienti da modificare..." required readonly>
                    <button class='btn btn-outline-danger' type="button" id="eliminaIngrediente" data-idLet='${resume[i].id}'>Elimina</button>
                    </div>
                    `).appendTo(listaIngredientiUser);
                $('#ingredienti' + i).val(resume[i].nome);
            }
        })
    });

    //MODIFICA PIATTO
    $('#modificaPiatto').click(function (ingredienti) {
        
       // console.log("Ingre " + ingredienti)
      //  const ingre = null;
        //Prendo valore ingredienti
      /*  for (let i = 0; i < ingredienti.length; i++) {
            const idModIng = +$(this).attr('data-idLet');
            console.log("ID Ingr" + idModIng);
            ingre = {
                ingrediente: {
                    id: idModIng,
                    nome: $('#ingredienti' + i).val()
                }
            }
            console.log("Lista" + ingre);
        }*/
        const piatto = {
            id: idModificaPiatto,
            nome: $('#nome').val(),
            prezzo: $('#prezzo').val(),
            categoria: {
                id: $('#selectCategorie').val(),
            },
        }
        const idcatPiat = $('#selectCategorie').val();
        idcategoriaPiatto = idcatPiat;
        if (editModePiatto) {
            Swal.fire({
                icon: 'question',
                title: 'Vuoi salvare la Modifica di ' + piatto.nome + '?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: `Salva`,
                denyButtonText: `Non Salvare`,
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire('Salvato!', '', 'success')
                    piatto.id = idModificaPiatto;
                    modificaPiatto(piatto);
                   // modificaIngrediente(ingre);
                    setTimeout(function () {
                        window.location.href = 'ristorantiUser.html';
                    }, 2000);
                } else if (result.isDenied) {
                    Swal.fire('Modifiche non salvate', '', 'info')
                }
            })
        }
    })

    function modificaPiatto(piatto) {
        $.ajax({
            type: "PUT",
            url: `/user/piattiuser/edit/${idcategoriaPiatto}`,
            data: JSON.stringify(piatto),
            contentType: 'application/json',
            dataType: 'json',
            success: function (response) {
                editModePiatto = false;
                idModificaPiatto = -1;
                idcategoriaPiatto = -1;
            },
            /* error: function (error) {
                 alert("Problema nella modifica");
                 console.log(error);
             }*/
        });
    }
    // NON FUNZIONA
   /* function modificaIngrediente(ingre) {
        $.ajax({
            type: "PUT",
            url: `/user/ingredientiuser/modifica/`,
            data: JSON.stringify(ingre),
            contentType: 'application/json',
            success: function (response) {

                console.log("Fatto Ingre")
            },
            error: function (error) {
                alert("Problema nella modifica Ingrediente");
                console.log(error);
            }
        });
    }*/

    // ELIMINA INGREDIENTE
    $('#listaIngredientiModifica').on('click', '#eliminaIngrediente', function () {
        const idIngred = $(this).attr('data-idLet');
        deteteIngrediente(idIngred);
    });

    function deteteIngrediente(idIngred) {
        let idPagina = $(`#riga-${idIngred}`);
        $.ajax({
            type: "DELETE",
            url: `/user/ingredientiuser/elimina/${idIngred}`,
            success: function (response) {
                console.log("ELIMINA");
                idPagina.slideUp(300, function () {
                    idPagina.remove();
                })
            },
            error: function (error) {
                alert("Errore durante la cancellazione. Riprovare.");
            }
        });
    }

    //AGGIUNGI INGREDIENTE NEL MODALE MODIFICA PIATTO
    let vettoreIngredienti1 = [];
    $('#aggiungiIngredienteModale').click(function () {
        $('#inputAggiungiIngrediente').append(`
        <div class='input-group mb-3'>
        <input type='text' id='ingredientiModifica' class='form-control' placeholder="Inserire Ingredienti..." required>
        <button class='btn btn-outline-warning text-btn float-end' id="aggiungiIngredientebtn">Aggiungi Ingrediente</button>
        </div>
        <ol class="list-group" id="listaModificaIngredienti"></ol>`);
        $('#aggiungiIngredienteModale').remove();

        $('#aggiungiIngredientebtn').click(function () {
            const input = $('#ingredientiModifica');
            const valore = input.val();

            if (valore) {
                vettoreIngredienti1.push(valore);
                $('#listaModificaIngredienti').append(`
                <a class="list-group-item list-group-item-action list-group-item-warning" id="eliminaIngrediente">${valore}</a>`);

            }
            input.val('');
            input.focus();
        });
        $('#listaModificaIngredienti').on('click', '#eliminaIngrediente', function () {
            const nome = $(this).parent().attr('nome');
            const ingrediente = {
                "nome": nome
            };
            $('#eliminaIngrediente').remove();
            const indiceIngrediente = vettoreIngredienti1.indexOf(ingrediente);
            vettoreIngredienti1.splice(indiceIngrediente, 1);
        });
    });

// AGGIUNGI INGREDIENTE NEL MODALE ODIFICA PIATTO
    $('#modificaPiatto').click(function () {
        let ingredienti = [];
        vettoreIngredienti1.forEach(ingrediente => ingredienti.push(ingrediente));
        let piattoIngre = vettoreIngredienti1;
        //   addPiatto(piatto);
        if (piattoIngre) {
            addIngrediente(piattoIngre);
        }
    })

    function addIngrediente(piattoIngre) {
        console.log(piattoIngre);
        for (let ingredienti of piattoIngre) {
            $.ajax({
                type: "POST",
                url: `/user/ingredientiuser/aggiungi/${idModificaPiatto}`,
                data: {ingredienti: ingredienti},
                success: function (res) {
                    idCategoria = -1;
                    idRistorante = -1;
                }
            })
        }
    }

    // DETTAGLIO PIATTO MODALE CON INGREDIENTI
    $('#listaMenuDettaglio').on('click', '.btn-dettaglioPiatto', function () {
        const idDetPiatto = $(this).attr('data-idLista');
        getPiatto(idDetPiatto);
    });

    function getPiatto(idDetPiatto) {
        $.get(`piattiuser/piattoid/${idDetPiatto}`, function (dettaglio) {
            const dettaglioPiatto = $('#dettaglioPiatto');
            $('#titlePiatto').text(dettaglio.nome + ' Nel Dettaglio');
            $('#dettaglioPiattoLogo').attr('src', '../categorie/' + dettaglio.categoria.immagine);
            let row = `
            <h4 class='fw-light text-dark'><strong class="fw-bolder">Nome: </strong>${dettaglio.nome}</h4> 
            <h4 class='fw-light text-dark'><strong>Prezzo: </strong>${dettaglio.prezzo} €</h4>   
            <h4 class='fw-light text-dark'><strong>Categoria: </strong>${dettaglio.categoria.nome}</h4> 
            <h4 class='fw-light text-dark'><strong>Ingredienti: </strong></h4>
			`;
            $(row).hide().appendTo(dettaglioPiatto).fadeIn(500);
        })

        $.get(`/user/ingredientiuser/${idDetPiatto}`, function (ingredienti) {
            const listaingredienti = $('#listaingre');
            console.log(ingredienti);
            if (ingredienti.length == 0) {
                console.log("Sono Dentro");
                let error = `<h4 class='fw-light text-dark'>Non sono presenti Ingredienti</h4>`;
                $(listaingredienti).append(error);
            } else {
                for (let i = 0; i < ingredienti.length; i++) {
                    let lista = `<h5 class='fw-light text-dark'>`+ (i+1) + "." + ` ${ingredienti[i].nome}</h5>`;
                    $(listaingredienti).append(lista);
                }
            }
        })
    }
});