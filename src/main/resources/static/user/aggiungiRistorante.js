$(document).ready(function () {
    let idRistorante = -1;
    function addRistorante(ristorante){
        console.log(ristorante);
        $.ajax({
            type: 'POST',
            url: 'ristorantiuser',
            data: JSON.stringify(ristorante),
            contentType: 'application/json',
          /*  dataType: 'json', */
            success: function(success){
                idRistorante = success;
                console.log("Sono in success " + success);
                console.log("ID success "+ idRistorante);
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
                uploadFile(idRistorante);
            },
            error: function () {
                Swal.fire({
                      icon: 'error',
                      title: 'ATTENZIONE!',
                      text: 'Riprova'
                    })                
            } 
        })
    } 
    function uploadFile(idRistorante) {
        
        console.log(idRistorante + " CONFERMA");
        var data = $('#formFile').val();
        console.log(data);
        var fd = new FormData();
        fd.append("ajax_file",$('#formFile')[0].files[0])
        $.ajax({
            type: "POST",
            url: `/user/fileupload/${idRistorante}`,
            data: fd,
            contentType: false,
            processData: false,
            success: function () {
                console.log("Riuscito");
            },
            error: function () {
                console.log("Non riuscito");
            }
        });



    }
    
    $('#aggiungiRistorante').click(function () {
        const ristorante = {
            ragionesociale: $('#nomeRistorante').val(),
            piva: $('#iva').val(),
            citta: $('#cittaRistorante').val(),
            regione: $('#regioneRistorante').val(),
            via: $('#viaRistorante').val(),
            ncivico: $('#ncivico').val()            
        }
        addRistorante(ristorante);
        
        $('#nomeRistorante').val('');
        $('#iva').val('');
        $('#cittaRistorante').val('');
        $('#regioneRistorante').val('');
        $('#viaRistorante').val('');
        $('#ncivico').val('');
        
    })

    // Immagine Visualizzazione
    $('#formFile').change(function () {
        showImage(this);
    })

    function showImage(fileInput) {
        file = fileInput.files[0];
        reader = new FileReader();

        reader.onload = function(e) {
            $('#showThumb').attr('src', e.target.result);
            $('#showThumb').css('display', 'block');
        };
        reader.readAsDataURL(file);
    }
    // Fine Immagine
});