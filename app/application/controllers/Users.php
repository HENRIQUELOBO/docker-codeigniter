<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Users extends MY_Controller
{
  public function index()
  {
    $this->load->helper(array('url', 'form', 'padrao'));
    $this->load->view('paciente/index');
  }
  
  
  public function get()
  {
    $this->load->helper(array('url', 'form', 'padrao'));
    $this->load->model('MD_Users');
    
    $this->session->tela = 'Listagem de usuários';
    
    $filtros = array(
      'search'  => $this->input->post('search'),
      'acessos' => $this->input->post('acessos'),
      'inicio'  => montaPeriodo($this->input->post('periodo'), 'yy-mm-dd', 1),
      'fim'     => montaPeriodo($this->input->post('periodo'), 'yy-mm-dd', 2),
    );
    
    $paciente = $this->MD_Users->get($filtros);

    if (!empty($paciente)) {
      foreach ($paciente as $k => $v) {
        $dados['data'][] = array(
          $v->name,
          $v->email,
          $v->acessos,
          (($v->active == 1) ? 'Ativo' : 'Inativo'));
      }
      
      echo json_encode(array('bRet' => true, 'dados' => $dados));
    } else {
      echo json_encode(array('bRet' => true, 'dados' => array()));
    }
  }
}