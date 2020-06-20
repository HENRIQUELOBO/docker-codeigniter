<?php
/**
 * Created by PhpStorm.
 * User: henrique
 * Date: 18/03/2018
 * Time: 11:11
 */

if ( ! defined('BASEPATH')) exit('No direct script access allowed');


if (!function_exists('generate_pass'))
{
  function generate_pass($pass = '')
  {
    return hash('sha512', $pass);
  }
}


if (!function_exists('rmTagHtml'))
{
  function rmTagHtml($string = '')
  {
    return strtr(strip_tags($string), array("'" => '', "``" => '', "`" => '', "''" => ''));
  }
}


if (!function_exists('getMes'))
{
  function getMes($sMes, $abrev = null)
  {
    switch (date('m',strtotime($sMes))) {
      case  '1'; $mes = (!is_null($abrev) ? 'Janeiro' : 'Jan');   break;
      case  '2'; $mes = (!is_null($abrev) ? 'Fevereiro' : 'Fev'); break;
      case  '3'; $mes = (!is_null($abrev) ? 'Março' : 'Mar');     break;
      case  '4'; $mes = (!is_null($abrev) ? 'Abril' : 'Abr');     break;
      case  '5'; $mes = (!is_null($abrev) ? 'Maio' : 'Mai');      break;
      case  '6'; $mes = (!is_null($abrev) ? 'Junho' : 'Jun');     break;
      case  '7'; $mes = (!is_null($abrev) ? 'Julho' : 'Jul');     break;
      case  '8'; $mes = (!is_null($abrev) ? 'Agosto' : 'Ago');    break;
      case  '9'; $mes = (!is_null($abrev) ? 'Setembro' : 'Set');  break;
      case '10'; $mes = (!is_null($abrev) ? 'Outubro' : 'Out');   break;
      case '11'; $mes = (!is_null($abrev) ? 'Novembro' : 'Nov');  break;
      case '12'; $mes = (!is_null($abrev) ? 'Dezembro' : 'Dez');  break;
    }
  
    return  $mes;
  }
}


if (!function_exists('montaPeriodo'))
{
  function montaPeriodo($sData, $formato, $tipo = null)
  {
    
    $data   = explode('-', $sData);
    
    switch ($formato) {
      case 'mm-dd':
        
        $dt_ini = explode('/',$data[0]);
        $dt_fim = explode('/',$data[1]);
        
        if ($tipo == 1) {
          $periodo = $dt_ini[1].'-'.$dt_ini[0];
        } else {
          $periodo = $dt_fim[1].'-'.$dt_fim[0];
        }
        break;
      case 'yy-mm-dd':
        if ($tipo == 1) {
          $periodo = dataUsa($data[0]);
        } else {
          $periodo = dataUsa($data[1]);
        }
        break;
    }
    
    return $periodo;
  }
}


if (!function_exists('dateUsa'))
{
  function dateUsa($str)
  {
    $data    = str_replace('/', '-', $str);
    $retorno = new DateTime($data);
    return ((empty($str) ? 'null' : $retorno->format('Y-m-d')));
  }
}


if (!function_exists('dateTimeNowUsa'))
{
  function dateTimeNowUsa()
  {
    return date("Y-m-d H:i:s");
  }
}


if (!function_exists('dateNowUsa'))
{
  function dateNowUsa()
  {
    return date("Y-m-d");
  }
}


if (!function_exists('dateNowBra'))
{
  function dateNowBra()
  {
    return date("d/m/Y");
  }
}


if (!function_exists('strDateBra'))
{
  function strDateBra($str)
  {
    $retorno = new DateTime(str_replace('-', '/', $str));
    return ($retorno->format('d/m/Y'));
  }
}


if (!function_exists('sumAge'))
{
  function sumAge($d1, $d2)
  {
    $date1 = new DateTime($d1);
    $date2 = new DateTime($d2);
    $interval = $date2->diff($date1);
    return $interval->format( '%Y Anos, %m Meses e %d Dias' );
  }
}


if (!function_exists('dataUsa'))
{
  function dataUsa($str)
  {
    date_default_timezone_set('America/Sao_Paulo');
    $data    = str_replace('/', '-', $str);
    $retorno = new DateTime($data);

    return ((empty($str) ? 'null' : $retorno->format('Y-m-d')));
  }
}
