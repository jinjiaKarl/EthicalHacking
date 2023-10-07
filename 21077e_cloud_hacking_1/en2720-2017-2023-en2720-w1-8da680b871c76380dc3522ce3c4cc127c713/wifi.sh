#!/bin/bash

ssh -i wifi-ssh-key cereal_killer@10.0.7.178 -p 21 -o ProxyCommand='ssh -i ../id_rsa_root root@10.0.7.127 -p 52961 -W %h:%p'



