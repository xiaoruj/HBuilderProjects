function Promise(executor) {
    // console.log('这是我们封装的Promise');
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
                    cb.success(self.data);
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
                    cb.error(self.data);
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
Promise.prototype.then = function (onResolved, onRejected) {
    const self = this;
    return new Promise((resolve, reject) => {
        function handle(callback) {
            try {
                let result = callback(self.data);
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
        }
        // if(this.status === 'resolved'){
        //     setTimeout(() => {

                // onResolved(this.data);
            // });
        // }
        if(self.status === 'rejected'){
            setTimeout(() => {
                handle(onResolved);
                // onRejected(this.data);
            });
        }
        if (self.status === 'rejected'){
            setTimeout(() => {
                handle(onRejected);
            });
        }
        if(self.status === 'pending'){
            self.callbacks.push(
                {
                    success:function (data) {
                        handle(onResolved);
                    },
                    error: function () {
                        handle(onRejected);
                    }
                }
            );
            // this.callbacks.push({onResolved, onRejected});
        }
    });

}