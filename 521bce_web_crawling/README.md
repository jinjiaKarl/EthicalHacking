# 521bce_web_crawling

The challenge is called web crawling, so we need to nmap all web servers in the network.

```
nmap -p 80 -o scan_result.txt 10.0.0.0/20

10.0.2.197 (Cuiteur)
10.0.3.197 (Hacker Manifesto)
```

Find the hidden pages in the web server.

* the Metasploit module auxiliary/scanner/http/crawler. 
* skipfish
```
skipfish -o cuiteur -C 'PHPSESSID=p6gv5tl2udp0k9lqfvse3vpri3' http://10.0.2.197


cd cuiteur
python3 -m http.server 8000

go to http://127.0.0.1:8000, you will find the recherche_old.php path.
```
* dirb or gobuster
* source code in the developer tool
```
old page <a id="btnCherche" href="recherche_old.php" title="Search for Users to Follow"></a>

go to http://10.0.2.197/php/recherche_old.php, the flag is in the source code.

flag{521bce8718b85c15fad4ee8ac9a6074ceb0df64479c083} 

```