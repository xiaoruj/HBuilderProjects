function Promise(executor) {
    const self = this;
    self.status = 'pending';
    self.data = undefined;
    function resolve(value) {
        self.status = 'resolved';
        self.data = value;
    }
    function reject(reason) {
        self.status = 'rejected';
        self.data = reason;
    }
    try{
        executor(resolve,reject);
    }catch(e){
        reject(e);
    }
}
Promise.prototype.then = function (onResolved,onRejected) {
    if(this.status === 'resolved'){
        onResolved(this.data);
    }
    if(this.status === 'rejected'){
        onRejected(this.data);
    }
}