# vi: ft=yaml.jinja2
---

availableMemoryMb: 128
entryPoint: iDareYouToHackMe
httpsTrigger:
  url: https://europe-west1-en2720-2017.cloudfunctions.net/twmn_cloud_hack_en2720-w1
ingressSettings: ALLOW_INTERNAL_ONLY
labels:
  deployment-tool: cli-gcloud
name: projects/en2720-2017/locations/europe-west1/functions/twmn_cloud_hack_en2720-w1
runtime: nodejs10
status: ACTIVE
timeout: 3s
versionId: '2'
