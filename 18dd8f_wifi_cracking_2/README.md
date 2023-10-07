# 18dd8f_wifi_cracking_2

When we know the wifi password, we can join the network.
```
# stop monitor mode
sudo airmon-ng stop sta3-wlan0mon

# enter password: superman
wpa_passphrase new-york > wpa_supplicant.conf

# or we can create the file manually
network={
ssid="new-york"
psk="superman"
proto=WPA2 
pairwise=CCMP
key_mgmt=WPA-PSK
}


# connect
sudo wpa_supplicant -D wext -i sta3-wlan0 -c wpa_supplicant.conf

# get ip address: 172.20.0.24/24
sudo dhclient sta3-wlan0

# scan the network
nohup nmap --top-ports 1000 172.20.0.0/24 > result.txt &
curl 172.20.0.2
flag{18dd8fe36e5fad150da3afc8c3945a233967ba9eec9ee2}.jpg
```