<?php $this->load->view('template/header')?>
<?php $this->load->view('template/menu')?>
<?php $this->load->view('template/painel-padrao-inicio')?>

<div class="col-xs-12 col-md-2">
  <label>Nome usuário</label>
  <input class="form-control" type="search" placeholder="Digite o nome user" aria-label="Search" id="search" value="<?=set_value('search')?>">
</div>

<div class="col-xs-12 col-md-3">
  <label>Período</label>
  <input class="form-control text-center" type="text" id="filtra-periodo">
</div>


<div class="col-xs-12 col-md-2">
  <label>Por acessos</label>
  <select id="filtro-tipo" class="form-control">
    <option value="0">Todos</option>
    <option value="1">Usuário com mais acessos</option>
    <option value="2">Usários com menos acessos</option>
  </select>
</div>


<div class="col-xs-12 col-md-2">
  <button class="btn btn-primary btn-search" onclick="carregaTBL();"><i class="fa fa-search"></i> Pesquisar</button>
</div>

<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
  <table class="table table-bordered " id="tbl-default" cellspacing="0" width="100%">
    <thead>
      <tr>
        <th class="">Nome</th>
        <th class="text-center">Email</th>
        <th class="text-center">Número de logins</th>
        <th class="text-center">situação</th>
      </tr>
    </thead>
  </table>
</div>


<?php $this->load->view('template/painel-padrao-fim')?>
<?php $this->load->view('template/footer')?>
<script src="/assets/js/home/index.js"></script>
</body>
</html>