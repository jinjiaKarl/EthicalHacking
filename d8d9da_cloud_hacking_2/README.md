# d8d9da_cloud_hacking_2

In the last 21077e_cloud_hacking_1 challege, we got the source repo, called `twmn_sourcerepo_en2720-w1`.
```
gcloud source repos describe twmn_sourcerepo_en2720-w1
gcloud source repos clone twmn_sourcerepo_en2720-w1 clone_repo 
```

This is git repo, we can search the flag in the git history.
```
git grep flag $(git rev-list --all)


c4183ffc6165c9f186f0eeeca48c1000b0e4e548:flag:flag{d8d9da11a8ec4b7077449f097ecfda8e789849a734d8b5}

# or
git diff HEAD~13 HEAD~28
```