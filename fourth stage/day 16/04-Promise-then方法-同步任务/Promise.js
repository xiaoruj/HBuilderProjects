function Promise(executor) {
    console.log('这是我们封装的Promise');
    const self = this;
    self.status = 'pending';
    self.data = undefined;
    self.callbacks = [];
    function resolve(value) {
        if(self.status !== 'pending') return;
        self.status = 'resolved';
        self.data = value;
        if(self.callbacks.length > 0){
            setTimeout(() => {
                self.callbacks.forEach(cb => {
                cb.onResolved(self.data);
                });
            })
        }
    }
    function reject(reason) {
        if(self.status !== 'pending') return;
        self.status = 'rejected';
        self.data = reason;
        if(self.callbacks.length > 0){
            setTimeout(() => {
                self.callbacks.forEach(cb => {
                    cb.onRejected(self.data);
                });
            });
        }
    }
    try{
        executor(resolve,reject);
    }catch(e){
        reject(e);
    }
}
Promise.prototype.then = function (onResolved,onRejected) {
    const self = this;
    return new Promise((resolve, reject) => {
        if(this.status === 'resolved'){
            setTimeout(() => {
                try {
                    let result = onResolved(self.data);
                    if(result instanceof Promise){
                        result.then(
                            v => {
                                result(v);
                            },
                            r => {
                                reject(r);
                            }
                        )
                    } else {
                        resolve(result);
                    }
                } catch (e){
                    reject(e);
                }
                // onResolved(this.data);
            });
        }
        if(this.status === 'rejected'){
            setTimeout(() => {
                try {
                    let result = onResolved(self.data);
                    if(result instanceof Promise){
                        result.then(
                            v => {
                                result(v);
                            },
                            r => {
                                reject(r);
                            }
                        )
                    } else {
                        resolve(result);
                    }
                } catch (e){
                    reject(e);
                }
                // onRejected(this.data);
            });
        }
        if(this.status === 'pending'){
            this.callbacks.push({onResolved, onRejected});
        }
    });

}