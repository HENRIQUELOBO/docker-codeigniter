<?php
/**
 * Created by PhpStorm.
 * User: henrique
 * Date: 17/03/2018
 * Time: 15:41
 */
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Home extends MY_Controller
{
  public function index()
  { 
    $this->load->helper(array('url', 'form'));
    $this->load->view('home/index');
  }
}