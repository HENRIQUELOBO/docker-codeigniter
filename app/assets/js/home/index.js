$(document).ready(function() {
    calendario('filtra-periodo', 'diario', '');
    carregaTBL();
})


$('#search').keypress(function (e) {
    var code = null;
    code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) {
      carregaTBL();
    }
});


function carregaTBL() {
    $('#tbl-default').DataTable().destroy();
   
    mostraNotificacao('info', 'Carregando dados de pacientes');
    montaDTTable({
        action   : 'Users',
        method   : 'get',
        dados: {
            search  : $('#search').val(),
            periodo : $('#filtra-periodo').val(),
            acessos : $('#filtro-tipo').val()
        },
        id: 'tbl-default',
        buttons: false,
        filtro: false,
        info: true,
        colunas: [
            {width: "14%", targets: 0},
            {width: "2%", targets: 1, class: "text-center"},
            {width: "10%", targets: 2, class: "text-center"},
            {width: "10%", targets: 3, class: "text-center"},
        ],
        menu: 'Users'
    });
}