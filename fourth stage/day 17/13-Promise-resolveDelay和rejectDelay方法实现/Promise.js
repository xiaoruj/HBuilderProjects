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
    onRejected = onRejected !== undefined ? onRejected : reason => {throw reason;}
    onResolved = onResolved !== undefined ? onResolved : value => {return value;}
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
        if(self.status === 'resolved'){
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
Promise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected);
}
Promise.resolve = function (value) {
    return new Promise((resolve, reject) => {
        if (value instanceof Promise){
            let result = value.then(
                v => {
                    resolve(v)
                },
                r => {
                    reject(r)
                }
            )
        } else {
            resolve(value)
        }
    });
}
Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
        reject(reason);
    })
}
Promise.all = function (promises) {
    return new Promise((resolve, reject) => {
        let resultArr = [];
        let num = 0;
        for (let i = 0; i < promises.length; i++){
            promises[i].then(value => {
                resultArr[i] = value;
                num++;
                if (num === promises.length){
                    resolve(resultArr);
                }
            }, reason => {
                reject(reason);
            })
        }
    });
}
Promise.race = function (promises) {
    return new Promise((resolve, reject) =>{
        promises.forEach(promises => {
            promises.then(
                v =>{
                    resolve(v);
                },
                r => {
                    reject(r);
                }
            )
        });
    });
}
Promise.resolveDelay = function (value, time) {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            if (value instanceof Promise){
                value.then(resolve, reject);
            } else {
                resolve(value);
            }
        }, time);
    })
}
Promise.rejectDelay = function (value, time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(value);
        }, time);
    });
}


