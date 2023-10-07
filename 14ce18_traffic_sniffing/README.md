# 14ce18_traffic_sniffing

We need to capture the traffic on the 10.0.2.197 machine.

Usually, `tcpdump` is used to capture the traffic.
```
# use wireshark to analyze the capture.pcap file
tcpdump -i ens4 -w capture.pcap

# 
tcpdump -i ens4 -vvv  | grep "flag{14"
10.0.7.225.43660 > en2720-w1-energetic-bear.http: Flags [P.], cksum 0x0cf1 (correct), seq 417:769, ack 70223, win 920, options [nop,nop,TS val 2009335940 ecr 2950540301], length 352: HTTP, length: 352
        GET /images/favicon.ico HTTP/1.1
        Host: cuiteur-s5.ethhak
        User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:26.0) Gecko/20100101 Firefox/26.0
        Accept: image/png,image/*;q=0.8,*/*;q=0.5
        Accept-Language: en-US,en;q=0.5
        Accept-Encoding: gzip, deflate
        X-Ethhak-Flag-Content: flag{14ce185f7bf55678b3bba4126d23710810c0b599add29d}
        Connection: keep-alive

```