<?php
class DB
{
    private $servername = DB_HOST;
    private $database = DB_DATABASE;
    private $username = DB_USERNAME;
    private $password = DB_PASSWORD;
    private $dbms = DB_DBMS;
    private $dsn;
    private $pdo;

    function __construct()
    {
        $this->dsn = $this->dbms.":host=".$this->servername.";dbname=".$this->database;
    }

    public function pdo(){
        try{
            $this->pdo = new PDO($this->dsn,$this->username,$this->password);
            return $this->pdo;

        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }
}