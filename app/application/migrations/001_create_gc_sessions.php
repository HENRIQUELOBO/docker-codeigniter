<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Create_GC_Sessions extends CI_Migration
{
    public function up()
    {
        $this->dbforge->add_field([
            'id' => [
                'type' => 'INT',
                'null' => false
            ],
            'ip_address' => [
                'type' => 'varchar',
                'constraint' => '45',
                'null' => false
            ],
            'timestamp' => [
                'type' => 'int',
                'constraint' => '10',
                'null' => false
            ],
            'data' => [
                'type' => 'blob',
                'null' => false
            ],
        ]);
        $this->dbforge->add_key('timestamp', true);
        $this->dbforge->create_table('gc_sessions', true);
    }

    public function down()
    {
        $this->dbforge->drop_table('gc_sessions', true);
    }
}