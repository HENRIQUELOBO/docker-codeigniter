<?php
/**
 * Created by PhpStorm.
 * User: henrique
 * Date: 17/03/2018
 * Time: 17:05
 */

class MD_Users extends CI_Model
{
  
  private $_table = 'Users';
  
  
  public function __construct()
  {
    parent::__construct();
    $this->load->database();
  }

  
  public function get($filtro)
  {
    
    $this->db->select('u.*, ua.last_login, COUNT(ua.Users_id) AS acessos');
    $this->db->from('Users AS u');
    $this->db->join('Users_acess AS ua', 'ua.Users_id = u.id');
    $this->db->where('DATE_FORMAT(ua.last_login, "%Y-%m-%d") BETWEEN "'. $filtro['inicio']. '" AND "'. $filtro['fim'].'"');

    if($filtro['search']) {
      $this->db->like('name', $filtro['search'], 'both'); 
    }

    if($filtro['acessos'] > 0) {
      if($filtro['acessos'] == 1) {
        $this->db->order_by('acessos', 'DESC');
        $this->db->limit(10);
      } else if($filtro['acessos'] == 2) {
          $this->db->order_by('acessos', 'ASC');
          $this->db->limit(10);
      }
    }

    $this->db->group_by("u.id");
    $query = $this->db->get();
    
    return $query->result_object();
  }
}