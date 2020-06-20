

/**
 * Faz requição Ajax
 *  sParams {object} - Obejtos
 *  return json
 **/
function montaRequicao(sParams) {
  
  if (sParams.classe != '' && sParams.action)
    var sUrl = '/' +  sParams.action.toLocaleLowerCase() + '/' + sParams.method ;
  
  $.ajax({url        : sUrl,
          data       : sParams.dados,
          dataType   : "json",
          type       : 'POST',
          beforeSend : function() {
            mostraNotificacao('info', 'Carregando Pagina, aguarde...');
            $(':submit').attr('disabled', 'disabled');
          }
  }).done(function (response) {
  }).done(sParams.success).fail(function(response, status, erro) {
    $(':submit').removeAttr('disabled');
    mostraNotificacao('error', 'Erro ao fazer requição,' + status + erro);
  });
}



/**
 * Calendario com rangeDate
 *
 * @param {string}  sID   - Id do input
 * @param {string}  sTipo - Tipo perido(Mensal,diario)
 **/
 var calendario = function(sID, sTipo, sOpen) {
  
  moment.defineLocale('pt-br', {
    months        : 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
    monthsShort   : 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
    weekdays      : 'domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado'.split('_'),
    weekdaysShort : 'Dom_Seg_Ter_Qua_Qui_Sex_Sab'.split('_'),
    weekdaysMin   : 'Dom_Seg_Ter_Qua_Qui_Sex_Sab'.split('_'),
    ordinal       : '%dº'
  });
  
  switch (sTipo) {
    case 'diario':
      var start = moment();
      var end   = moment();
      break;
    case 'mensal':
      var start = moment().startOf('month');
      var end   = moment().endOf('month');
      break;
    default:
      var start = moment().startOf('month');
      var end   = moment().endOf('month');
  }
  
  
  function cb(start, end, label) {
    $('.' + sID).val(start.format('DD/MM/YYYY') + '-' + end.format('DD/MM/YYYY'));
  }
  
  $('#' + sID).daterangepicker({
    locale  : {
      format           : "DD/MM/YYYY",
      applyLabel       : "Aplicar",
      cancelLabel      : "Limpar",
      fromLabel        : "De",
      toLabel          : "Até",
      customRangeLabel : "Personalizado"
    },
    applyClass  : "btn-success",
    cancelClass : "btn-primary",
    opens       : ((typeof sOpen == 'undefined') ? "right" : sOpen),
    ranges : {
      'Hoje'           : [moment(), moment()],
      'Ontem'          : [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Último 7 Dias'  : [moment().subtract(6, 'days'), moment()],
      'Último 30 Dias' : [moment().subtract(29, 'days'), moment()],
      'Este Mês'       : [moment().startOf('month'), moment().endOf('month')],
      'Último Mês'     : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    }
  }, cb);
  
  cb(start, end);
  
  $("input[name=daterangepicker_start], input[name=daterangepicker_end]").addClass('data text-center').css('background', '#ffffff');
  validaData('data', false);
}



/**
 * Monta tabela
 *
 * @param aParams - Object
 */
function montaDTTable(aParams)
{

    if (aParams.classe != '' && aParams.action)
        var sUrl = '/' +  aParams.action.toLocaleLowerCase() + '/' + aParams.method ;

  var nameTable = aParams['id'];
  var nameTable = $('#' + aParams['id']).DataTable({
    columnDefs     : aParams['colunas'],
    order          : [],
    iDisplayLength : 10,
    lengthMenu     : [[10, 20, 30, 100], [10, 20, 30, 100]],
    bFilter        : aParams['filtro'],
    info           : aParams['info'],
    processing     : false,
    ajax           : {
      url     : sUrl,
      data    : aParams.dados,
      type    : "POST",
      dataSrc : function (response) {
        if (response.bRet) {
          fechaNotificacao();
          return response.dados.data;
        }
      }
    },
    deferRender    : true,
    dom            : '<"top">frt<"bottom"lpi><"clear">',
    language : {lengthMenu    : "Exibir _MENU_",
                zeroRecords   : "Nenhum registro localizado",
                info          : "TOTAL DE " + (typeof aParams['menu'] == 'undefined' ? '' : aParams['menu'].toUpperCase()) + ": _MAX_",
                infoEmpty     : "Nenhum registro localizado",
                infoFiltered  : "(" +"Localizados _TOTAL_)",
                sSearch       : "",
                oPaginate     : {sNext : "Próximo", sPrevious : "anterior", sFirst : "Primeiro", sLast : "Último"}
    },
    responsive: true
  });

  $('#' + aParams['id'] + '_length').addClass('col-xs-12 col-sm-12 col-md-12 float-left');

  $('.bottom').addClass('col-xs-12 col-sm-12 col-md-12');

  $("#" + aParams['id'] + "_paginate").removeClass()
                                      .addClass('col-xs-12 col-sm-12 col-md-12');

  $('#' + aParams['id'] + '_info').addClass('col-xs-12 col-sm-12 col-md-12 text-center');

}



/**
 *
 * @param {string} sTipo  - Tipo de notificacao
 * @param {string}  sMsg  - Mensagem da notificacao
 * @param {boolean} sSom  - Com alerta sonoro
 * @param {string} sTitle - Titulo da notificacao
 * @param {boolean} icon  - Icone na notificacao
 */
function mostraNotificacao(sTipo, sMsg, sSom, sTitle, icon) {
  
  fechaNotificacao();
  var myStack = {"dir1":"down", "dir2":"right", "push":"top"};
  var icon    = false;
  
  switch (sTipo) {
    case 'error':
      var titulo = 'Aviso';
      var msg    = sMsg;
      var tipo   = 'error';
      break;
    case 'sucesso':
      var titulo = 'Aviso';
      var msg    = sMsg;
      var tipo   = 'success';
      break;
    case 'info':
      var titulo = 'Aviso';
      var msg    = sMsg;
      var tipo   = 'info';
      break;
    case 'alerta':
      var titulo = 'Aviso';
      var msg    = sMsg;
      break;
    case 'chat':
      var titulo = sTitle;
      var msg    = sMsg;
      var tipo   = 'success';
      var icon   = icon;
      break;
  }
  
  new PNotify({
    title   : titulo,
    text    : msg,
    type    : tipo,
    styling : 'bootstrap3',
    stack   : myStack,
    icon    : icon
  });
}


/**
 * Fecha notificacao
 *
 *
 */
function fechaNotificacao() {
  $('.ui-pnotify, .ui-pnotify-modal-overlay').remove();
}


/**
 * Valida data
 *
 * @param sClass - Classe do input
 *
 */
function validaData(sClass, bVerifica) {
  
  $('.' + sClass).mask("00/00/0000", {placeholder: "__/__/____"});
  $('.' + sClass).on('blur', function() {
    
    if ($(this).val().length == 10) {
      var tmp  = $(this).val().split('/');
      
        dia = tmp[0],
        mes = tmp[1],
        ano = tmp[2];
        
      var data = moment().format('YYYY-MM-DD');
      var data1 = moment().format(ano + '-' + mes + '-' + dia);
      
      if (new Date(data) == new Date(data1)) {
        return false;
      }
      
      if (!(dia >= 1 && dia <= 31)) {
        mostraNotificacao('error', 'Data inválida');
        $(this).focus().val('');
        return false;
      }
  
      if (!(mes >= 1 && mes <= 12)) {
        mostraNotificacao('error', 'Data inválida');
        $(this).focus().val('');
        return false;
      }
  
      if (!(ano >= 1900 && ano <= 2030)) {
        mostraNotificacao('error', 'Data inválida');
        $(this).focus().val('');
        return false;
      }
  
      if (typeof bVerifica != 'undefined' && bVerifica == false) {
        return false;
      }

    } else if (($(this).val().length < 10) && $(this).val() != '') {
      mostraNotificacao('error', 'Data inválida');
      $(this).focus().val('');
    }
  });
}