## USER
```
this.userModel.updateMany({"accept": true}, {"$set":{"level": 'sr'}}, {"multi": true, "upsert": true});
```