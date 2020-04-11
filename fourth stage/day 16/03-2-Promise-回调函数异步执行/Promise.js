function Promise(executor) {
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
    if(this.status === 'resolved'){
        setTimeout(() => {
            onResolved(this.data);
        });
    }
    if(this.status === 'rejected'){
        setTimeout(() => {
            onRejected(this.data);
        });
    }
    if(this.status === 'pending'){
        this.callbacks.push({onResolved, onRejected});
    }
}