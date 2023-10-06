# EthicalHacking
EN2720 HT23 Ethical Hacking

## Flag dependencies

When connected to the Google Cloud virtual environment via VPN, you are allowed to attack hosts within the network zone 10.0.0.0-10.0.15.254. If seen from a host on that network, addresses in the ranges 172.16.0.1-172.31.255.254 are also permitted targets

After you have successfully connected to the cyber-range via VPN you should be able to capture the 10c26e pre-flag (which is not graded). Free hint: try pinging the IP: 10.0.2.88.

Flag 155d78 is a brief tutorial section (which is optional and not graded as well) hosted within the cyber range to help kickstart those new to Linux and ethical hacking. Access instructions are provided together with the 10c26e pre-flag.

Initially, you will only be able to capture flags 10c26e, 155d78, adcb1f, 90b353 or 521bce, because the remaining flags are located in places that require you to perform the exploits that lead to the first flags.

We recommend solving 14ce18 and 9f1f16 before attempting flag 5d402e.

Flag de3b1c can also be reached without having first captured 521bce but with a considerable more difficult way.

Finally, flag 831865 expects both 21077e and d8d9da.

And one hint: The hacker manifesto machine has Flags adcb1f (FTP) and 90b353, whereas Cuiteur has Flag 521bce.

```bash
     10c26e ——— 155d78
      /    |    \
adcb1f  90b353   521bce
           |        |
        cd699a   de3b1c
           |        |
        f9038f   3b2000
           |        |
        9c550d   9f1f16
             \      |
              \  14ce18
               \    |
                 5d402e — 2362e5        
                    |
                 93b00a
                 /    \
             21077e   d8d9da
               |    \   |
            d582aa    831865
               |
            18dd8f
```

## Flag Topics, Values & Learning Outcomes
|  Flag  |                Topic               | Value |                                                                                                                                                                                                                  Learning Outcome                                                                                                                                                                                                                 |
|:------:|:----------------------------------:|:-----:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| 10c26e | Successful VPN connection pre-flag |   0   | - Establish resources to support offensive security operations, - perform reconnaissance and discovery to plan operations.                                                                                                                                                                                                                                                                                                                        |
| 155d78 |      Optional tutorial section     |   0   | - Perform reconnaissance and discovery to plan operations, - access credentials, such as account names, passwords and access tokens, - elevate privileges on systems to gain higher-level permissions, - collect and exfiltrate data from computing environments.                                                                                                                                                                                 |
| adcb1f |          Password cracking         |   4   | - Perform reconnaissance and discovery to plan operations, - access credentials, such as account names, passwords and access tokens.                                                                                                                                                                                                                                                                                                              |
| 90b353 |    Web hacking/Password cracking   |   8   | - Perform reconnaissance and discovery to plan operations, - access credentials, such as account names, passwords and access tokens, - achieve initial access to networks and systems.                                                                                                                                                                                                                                                            |
| cd699a |         Remote exploitation        |   8   | - Perform reconnaissance and discovery to plan operations, - achieve initial access to networks and systems, - execute malicious code on remote devices, - establish command and control capabilities to communicate with compromised systems.                                                                                                                                                                                                    |
| 521bce |            Web crawling            |   6   | - Perform reconnaissance and discovery to plan operations.                                                                                                                                                                                                                                                                                                                                                                                        |
| de3b1c |          Database hacking          |   8   | - Execute malicious code on remote devices, - collect and exfiltrate data from computing environments.                                                                                                                                                                                                                                                                                                                                            |
| 3b2000 |             Web hacking            |   8   | - Execute malicious code on remote devices, - achieve initial access to networks and systems, - establish command and control capabilities to communicate with compromised systems.                                                                                                                                                                                                                                                               |
| 9f1f16 |        Privilege escalation        |   10  | - Collect and exfiltrate data from computing environments, - execute malicious code on remote devices, - elevate privileges on systems to gain higher-level permissions, - avoid detection by network defenders.                                                                                                                                                                                                                                  |
| f9038f |   Hash cracking/lateral movement   |   10  | - Perform reconnaissance and discovery to plan operations, - access credentials, such as account names, passwords and access tokens, - achieve initial access to networks and systems, - execute malicious code on remote devices, - establish command and control capabilities to communicate with compromised systems, - move laterally, pivoting through the computing environment, - collect and exfiltrate data from computing environments. |
| 9c550d |        Privilege escalation        |   10  | - Execute malicious code on remote devices, - establish command and control capabilities to communicate with compromised systems, - elevate privileges on systems to gain higher-level permissions, - collect and exfiltrate data from computing environments.                                                                                                                                                                                    |
| 14ce18 |          Traffic sniffing          |   8   | - Perform reconnaissance and discovery to plan operations, - collect and exfiltrate data from computing environments.                                                                                                                                                                                                                                                                                                                             |
| 5d402e |         Client-side attacks        |   14  | - Establish resources to support offensive security operations, - achieve initial access to networks and systems, - execute malicious code on remote devices, - establish command and control capabilities to communicate with compromised systems, - persist on networks by maintaining access across interruptions, - move laterally, pivoting through the computing environment.                                                               |
| 2362e5 |         Binary exploitation        |   14  | - Execute malicious code on remote devices, - elevate privileges on systems to gain higher-level permissions, - avoid detection by network defenders, - collect and exfiltrate data from computing environments.                                                                                                                                                                                                                                  |
| 93b00a |         Remote exploitation        |   14  | - Perform reconnaissance and discovery to plan operations, - achieve initial access to networks and systems, - execute malicious code on remote devices, - establish command and control capabilities to communicate with compromised systems, - persist on networks by maintaining access across interruptions, - move laterally, pivoting through the computing environment.                                                                    |
| 21077e |            Cloud hacking           |   12  | - Perform reconnaissance and discovery to plan operations, - access credentials, such as account names, passwords and access tokens, - collect and exfiltrate data from computing environments.                                                                                                                                                                                                                                                   |
| d8d9da |            Cloud hacking           |   12  | - Perform reconnaissance and discovery to plan operations, - access credentials, such as account names, passwords and access tokens, - avoid detection by network defenders, - collect and exfiltrate data from computing environments.                                                                                                                                                                                                           |
| 831865 |            Cloud hacking           |   12  | - Execute malicious code on remote devices, - collect and exfiltrate data from computing environments.                                                                                                                                                                                                                                                                                                                                            |
| d582aa |   Wifi cracking/Traffic sniffing   |   12  | - Perform reconnaissance and discovery to plan operations, - access credentials, such as account names, passwords and access tokens, - move laterally, pivoting through the computing environment, - avoid detection by network defenders, - collect and exfiltrate data from computing environments.                                                                                                                                             |
| 18dd8f |            Wifi cracking           |   10  | - Perform reconnaissance and discovery to plan operations, - achieve initial access to networks and systems.                                                                                                                                                                                                                                                                                                                                      |