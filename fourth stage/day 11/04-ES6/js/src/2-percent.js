import {random as rand} from './1-random';
export function percent(num) {
    let n = rand(1,100);
    if(n <= num){
        return true;
    }else{
        return false;
    }
}